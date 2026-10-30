import { db } from '../../repository/dbClient.js';

export const customersService = {
  async listCustomers() {
    return await db.getCustomers();
  },

  async getCustomerDetails(phone) {
    const cleanPhone = phone.trim();
    const allEnquiries = await db.getEnquiries();
    const allBookings = await db.getBookings();

    const customerEnquiries = allEnquiries.filter(e => e.customerPhone && e.customerPhone.trim() === cleanPhone);
    const customerBookings = allBookings.filter(b => b.customerPhone && b.customerPhone.trim() === cleanPhone);

    if (customerEnquiries.length === 0 && customerBookings.length === 0) {
      return null;
    }

    const primary = customerEnquiries[0] || customerBookings[0];

    return {
      phone: cleanPhone,
      name: primary.customerName,
      city: primary.city,
      address: primary.address || primary.venueAddress || '',
      gotra: primary.gotra || 'Not Specified',
      isDevelopmentFixture: Boolean(primary.isDevelopmentFixture),
      enquiries: customerEnquiries,
      bookings: customerBookings
    };
  }
};

