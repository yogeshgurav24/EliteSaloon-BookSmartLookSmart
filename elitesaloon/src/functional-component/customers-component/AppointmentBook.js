import React, { useState, useEffect } from "react";
import useLoader from "../../hooks/useLoader";
import CommonLoader from "../../components/CommonLoader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaConciergeBell } from "react-icons/fa";

const AppointmentBook = () => {
  const navigate = useNavigate();
  const { loading, startLoading, stopLoading } = useLoader();

  const [form, setForm] = useState({
    serviceId: "",
    appointmentDate: "",
    startTime: "",
  });

  const [errors, setErrors] = useState({});
  const [services, setServices] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]); // 🔥 booked slots

  // ✅ Fetch Services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchServices();
  }, []);

  // ✅ Fetch booked slots when date changes
  useEffect(() => {
    if (!form.appointmentDate) return;

 const fetchSlots = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/appointment/slots?date=${form.appointmentDate}`
    );
    const data = await res.json();
    setBookedSlots(data);
  } catch (err) {
    console.log(err);
  }
};

    fetchSlots();
  }, [form.appointmentDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let err = {};
    if (!form.serviceId) err.serviceId = "Please select a service";
    if (!form.appointmentDate) err.appointmentDate = "Date is required";
    if (!form.startTime) err.startTime = "Time is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      startLoading();
      const response = await fetch("http://localhost:5000/appointment/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        Swal.fire("Success", "Appointment Booked!", "success")
          .then(() => navigate("/customer-dashboard"));
      } else {
        Swal.fire("Error", "Booking failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server error", "error");
    } finally {
      stopLoading();
    }
  };

  // 🔥 Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 20; i++) {
      const time = `${i < 10 ? "0" + i : i}:00`;
      slots.push(time);
    }
    return slots;
  };

  // ✅ Today's date (for past disable)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="dashboard-content">
      <CommonLoader loading={loading} />

      <div className="content-header">
        <h2>Book New Appointment</h2>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h3>
            <FaConciergeBell style={{ marginRight: "10px" }} />
            Appointment Details
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-row">

            {/* SERVICE */}
            <div className="form-group">
              <label>Select Service</label>
              <select name="serviceId" value={form.serviceId} onChange={handleChange}>
                <option value="">-- Choose Service --</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.serviceName}
                  </option>
                ))}
              </select>
              {errors.serviceId && <small style={{ color: "red" }}>{errors.serviceId}</small>}
            </div>

            {/* DATE (Past Disable) */}
            <div className="form-group">
              <label>Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                value={form.appointmentDate}
                onChange={handleChange}
                min={today}  // 🔥 PAST DATE DISABLE
              />
              {errors.appointmentDate && <small style={{ color: "red" }}>{errors.appointmentDate}</small>}
            </div>

            {/* TIME SLOT */}
            <div className="form-group">
              <label>Select Time Slot</label>
              <select name="startTime" value={form.startTime} onChange={handleChange}>
                <option value="">-- Select Time --</option>

                {generateTimeSlots().map((time) => (
                  <option
                    key={time}
                    value={time}
                    disabled={bookedSlots.includes(time)} // 🔥 DISABLE BOOKED
                  >
                    {time} {bookedSlots.includes(time) ? "(Booked)" : ""}
                  </option>
                ))}
              </select>

              {errors.startTime && <small style={{ color: "red" }}>{errors.startTime}</small>}
            </div>

          </div>

          <button type="submit" className="btn-primary">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBook;