const { GuestListService } = require('./guest-list-service');

describe('GuestListService', () => {
    it('returns a list of guests', () => {
        const guestListService = new GuestListService();
        const guests = guestListService.getGuestList();
        expect(guests).toEqual([]);
    });

    it('can create a list of guests', () => {
        const guestListService = new GuestListService();
        guestListService.createGuestList();
        guestListService.getGuestList().forEach(guest => {
            expect(guest).toHaveProperty('id');
            expect(guest).toHaveProperty('firstName');
            expect(guest).toHaveProperty('lastName');
            expect(guest).toHaveProperty('avatar');
        });
    });

    it('can create different sizes of guest lists', () => {
        const guestListService = new GuestListService();
        guestListService.createGuestList(1);
        expect(guestListService.getGuestList()).toHaveLength(1);
    })
})