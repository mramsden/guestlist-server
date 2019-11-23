const R = require('ramda');

function GuestListService({ faker } = { faker: require('faker') }) {
    this.createGuest = () => {
        const [firstName, lastName] = faker.name.findName().split(' ');
        return {
            id: faker.random.uuid(),
            firstName, lastName,
            avatar: faker.image.avatar()
        };
    };
}

GuestListService.prototype.getGuestList = function () {
    return this.guests || [];
}

GuestListService.prototype.createGuestList = function (size = 40) {
    this.guests = R.times(this.createGuest, size);
}

module.exports = { GuestListService };
