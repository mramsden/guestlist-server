const express = require('express');
const { GuestListService } = require('./lib/guest-list-service');
const { GuestListHandlers } = require('./lib/handlers/guest-list');

const port = process.env.PORT || 3000;
const service = new GuestListService();
const guestListHandlers = new GuestListHandlers({ service });

const app = express();

app.get('/guestList', guestListHandlers.getGuestList());
app.post('/guestList', guestListHandlers.createGuestList());

app.listen(port, () => console.log(`Server listening on :${port}`));
