const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const getKeystore = async (filepath) => Promise.all([
    new Promise((resolve, reject) => {
        if (process.env.TOKEN_PRIVATE_KEY) {
            resolve(process.env.TOKEN_PRIVATE_KEY);
        } else {
            fs.readFile(filepath, 'utf8', (err, data) => {
                if (err) { return reject(err); }
                resolve(data);
            });
        }
    }),
    new Promise((resolve, reject) => {
        if (process.env.TOKEN_PUBLIC_KEY) {
            resolve(process.env.TOKEN_PUBLIC_KEY);
        } else {
            fs.readFile(`${filepath}.pub`, 'utf8', (err, data) => {
                if (err) { return reject(err); }
                resolve(data);
            });
        }
    })
]).then(([privateKey, publicKey]) => ({
    privateKey, publicKey
}));

module.exports.createToken = async (username) => {
    const store = await getKeystore(path.join(__dirname, '..', 'id_rsa'));
    const expiresIn = 43200;
    const token = jwt.sign({}, store.privateKey, {
        issuer: 'Guest List',
        subject: username,
        audience: 'http://localhost:3000',
        expiresIn: 43200,
        algorithm: 'RS256'
    });
    return { token, expiresIn };
};

module.exports.verifyToken = async (token) => {
    const store = await getKeystore(path.join(__dirname, '..', 'id_rsa'));
    return jwt.verify(token, store.publicKey, {
        issuer: 'Guest List',
        audience: 'http://localhost:3000',
        algorithms: ['RS256']
    });
};
