const express = require('express');
const { GuestListService } = require('./guest-list-service');

const port = process.env.PORT || 3000;
const service = new GuestListService();
const app = express();

app.use((_req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,POST');
    res.append('Access-Control-Allow-Headers', ['Content-Type']);
    next();
});

app.get('/guestList', (_req, res) => {
    const guests = service.getGuestList();
    res.send(guests);
});

app.post('/guestList', (req, res) => {
    service.createGuestList();
    res.status(201)
        .header('Location', req.url)
        .send();
});

app.listen(port, () => console.log(`Server listening on :${port}`));
