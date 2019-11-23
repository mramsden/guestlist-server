const requireToken = require('../middleware/require-token');

function GuestListHandlers({ service }) {
    this.service = service;
}

GuestListHandlers.prototype.getGuestList = function () {
    const service = this.service;
    return [requireToken(), function (_req, res) {
        const guests = service.getGuestList();
        res.send(guests);
    }];
}

GuestListHandlers.prototype.createGuestList = function () {
    const service = this.service;
    return [requireToken(), function (req, res) {
        service.createGuestList();
        res.status(201)
            .header('Location', req.url)
            .send();
    }];
}

module.exports = { GuestListHandlers };
