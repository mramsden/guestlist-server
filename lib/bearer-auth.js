const CREDENTIALS_REGEXP = /^ *(?:[Bb][Ee][Aa][Rr][Ee][Rr]) +([A-Za-z0-9._~+/-]+=*) *$/;

function auth(req) {
    if (!req) {
        throw new TypeError('argument req is required');
    }

    if (typeof req !== 'object') {
        throw new TypeError('argument req is required to be an object');
    }

    const header = getAuthorization(req);

    return parse(header);
}

function getAuthorization(req) {
    if (!req.headers || typeof req.headers !== 'object') {
        throw new TypeError('argument req is required to have headers property');
    }

    return req.headers.authorization;
}

function parse(string) {
    if (typeof string !== 'string') {
        return undefined;
    }

    const match = CREDENTIALS_REGEXP.exec(string);

    if (!match) {
        return undefined;
    }

    return match[1];
}

module.exports = auth;
