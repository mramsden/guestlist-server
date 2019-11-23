const command = process.argv[2] || 'serve';

if (command.startsWith('migrate')) {
    const Driver = require('./lib/database');
    const MigrationManager = require('./lib/database/migrations/manager');
    const manager = new MigrationManager({
        driver: new Driver()
    });

    if (command.endsWith('rollback')) {
        console.log('Rolling back...');
        manager.down().then(() => console.log('Done'));
    } else {
        console.log('Updating...');
        manager.up().then(() => console.log('Done'));
    }
}

if (command === 'serve') {
    const express = require('express');
    const { GuestListService } = require('./lib/guest-list-service');
    const { GuestListHandlers } = require('./lib/handlers/guest-list');
    const { UserHandlers } = require('./lib/handlers/user');

    const port = process.env.PORT || 3000;
    const service = new GuestListService();
    const guestListHandlers = new GuestListHandlers({ service });
    const userHandlers = new UserHandlers();

    const app = express();

    app.get('/guestList', guestListHandlers.getGuestList());
    app.post('/guestList', guestListHandlers.createGuestList());
    app.post('/sessions', userHandlers.createSession());

    app.listen(port, () => console.log(`Server listening on :${port}`));
} 

