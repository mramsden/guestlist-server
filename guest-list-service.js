const R = require('ramda');

/**
 * Manages a guest list for an event
 * 
 * @param {Object} param0 options for this service
 */
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

/**
 * Returns the currently managed list of guests
 * 
 * @returns {Object[]} current list of guests
 */
GuestListService.prototype.getGuestList = function () {
    return this.guests || [];
}

/**
 * Creates a list of guests
 * 
 * @param {number} size number of guests on the list
 */
GuestListService.prototype.createGuestList = function (size = 40) {
    this.guests = R.times(this.createGuest, size);
}

module.exports = { GuestListService };
