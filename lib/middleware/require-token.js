const { verifyToken } = require('../token');
const auth = require('../bearer-auth');

function requireToken() {
    return function(req, res, next) {
        const token = auth(req);
        if (!token) {
            return res.status(403).end();
        }
        verifyToken(token).then(token => {
            if (!token) {
                res.status(403).end();
            } else {
                next();
            }
        }).catch(e => {
            if (e.message === 'invalid signature') {
                res.status(400).end();
            } else {
                console.error(`Unexpected error: ${e.message}`);
                res.status(500).end();
            }
        });
    };
}

module.exports = requireToken;
