const fs = require('fs');
const path = require('path');
const R = require('ramda');

const MIGRATIONS_PATH = path.join(__dirname, '..', '..', '..', 'migrations');

const findMigrations = (direction, files) => R.sortBy(R.prop('timestamp'), R.compose(R.map(file => {
    const [ timestamp, name, direction ] = file.split(/[\_\.]/);
    if (!timestamp || !name || !direction) {
        throw new TypeError(`bad migration filename ${file}`);
    }
    return {
        name, timestamp, direction, path: path.join(MIGRATIONS_PATH, file)
    };
}), R.filter(R.test(new RegExp(`\\.${direction}\\.sql`))))(files));

const loadMigrations = async (migrations, direction) => new Promise((resolve) => {
    fs.readdir(migrations, function (_err, files) {
        resolve(findMigrations(direction, files))
    });
});

const readMigration = async (migration) => new Promise((resolve, reject) => {
    fs.readFile(migration.path, 'utf8', (err, data) => {
        if (err) { 
            return reject(err);
        }
        resolve(data);
    });
});

function MigrationManager(opts = {}) {
    this.migrations = R.propOr(MIGRATIONS_PATH, 'migrations')(opts);
    this.driver = R.prop('driver')(opts);
    if (!this.driver) {
        throw new TypeError('expected driver option to be specified');
    }

    this.executeMigration = async (migration) => {
        const contents = await readMigration(migration);
        await this.driver.query(contents);
        // return this.recordMigration(migration);
    };

    this.recordMigration = async (migration) => {
        await this.driver.query('CREATE TABLE IF NOT EXISTS migrations (version VARCHAR(32) NOT NULL);');
        await this.driver.query('INSERT INTO migrations(version) VALUES($1)', [migration.timestamp]);
    };
}

MigrationManager.prototype.up = async function () {
    const { migrations } = this;
    const potentialMigrations = await loadMigrations(migrations, 'up');
    for (const migration of potentialMigrations) {
        console.log(`Running ${migration.timestamp}_${migration.name}`);
        await this.executeMigration(migration);
    }
}

MigrationManager.prototype.down = async function () {
    const { migrations } = this;
    const potentialMigrations = await loadMigrations(migrations, 'down');
    await this.executeMigration(R.last(potentialMigrations));
}

module.exports = MigrationManager;
