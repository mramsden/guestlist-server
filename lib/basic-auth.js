const CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;

const USER_PASS_REGEXP = /^([^:]*):(.*)$/;

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

const decodeBase64 = (string) =>
    Buffer.from(string, 'base64').toString();

function parse(string) {
    if (typeof string !== 'string') {
        return undefined;
    }

    const match = CREDENTIALS_REGEXP.exec(string);

    if (!match) {
        return undefined;
    }

    const userPass = USER_PASS_REGEXP.exec(decodeBase64(match[1]));

    if (!userPass) {
        return undefined;
    }

    return new Credentials(userPass[1], userPass[2]);
}

function Credentials(user, password) {
    this.user = user;
    this.password = password;
}

module.exports = auth;
