const auth = require('../basic-auth');
const { createToken } = require('../token');

function UserHandlers() {
    this.username = 'admin';
    this.password = 'secret';
}

UserHandlers.prototype.createSession = function () {
    const { username, password } = this;
    return function (req, res) {
        const credentials = auth(req);
        if (credentials.user === username && credentials.password === password) {
            createToken(credentials.user)
                .then(({ token, expiresIn }) => {
                    res.status(204)
                        .header('Authorization', `Bearer ${token}`)
                        .header('Authorization-Expires-In', expiresIn)
                        .send();
                });
        } else {
            res.statusMessage = 'Incorrect credentials';
            res.status(401).send();
        }
    };
}

module.exports = { UserHandlers };
