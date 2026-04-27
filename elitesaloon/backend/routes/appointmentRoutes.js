const express = require("express");
const routes = express.Router();

const {
  getAvailableSlots,
  bookAppointment,
  appointmentResult,
  getSalons,
  getOwnersAppointments,
  getCustomersAppointments
} = require("../controllers/AppointmentController/appointmentController");

routes.post("/slots", getAvailableSlots);
routes.post("/book", bookAppointment);
routes.put("/appointment-result", appointmentResult);
routes.get("/get-salon/:pincode", getSalons);
routes.get("/get-appointment/:ownerId", getOwnersAppointments );
routes.get("/customer-appointments/:customerId", getCustomersAppointments );
module.exports = routes;
