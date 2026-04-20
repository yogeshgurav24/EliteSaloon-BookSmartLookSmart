import React from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaStar,
  FaPlus,
  FaShoppingBag,
  FaClock,
} from "react-icons/fa";

const CustomerOverview = ({
  customer,
  appointments,
  navigate,
  setActiveSection,
}) => {

  const upcoming = appointments.filter(
    (a) => a.appointmentStatus === "CONFIRMED"
  );

  const completed = appointments.filter(
    (a) => a.appointmentStatus === "COMPLETED"
  );

  return (
    <div className="dashboard-content">

      {/* Header */}
      <div className="content-header">
        <h2>Welcome back, {customer?.customerName || "User"}!</h2>
      </div>

      {/* ✅ Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon upcoming">
            <FaCalendarAlt />
          </div>
          <div className="stat-info">
            <span className="stat-value">{upcoming.length}</span>
            <span className="stat-label">Upcoming</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <FaCheck />
          </div>
          <div className="stat-info">
            <span className="stat-value">{completed.length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon points">
            <FaStar />
          </div>
          <div className="stat-info">
            <span className="stat-value">
              {customer?.loyaltyPoints || 0}
            </span>
            <span className="stat-label">Points</span>
          </div>
        </div>
      </div>

      {/* ✅ Upcoming Appointments */}
      <div className="section-card">
        <div className="section-header">
          <h3>Upcoming Appointments</h3>
          <button
            className="view-all-btn"
            onClick={() => setActiveSection("bookappointments")}
          >
            View All
          </button>
        </div>

        <div className="appointments-list">
          {upcoming.length > 0 ? (
            upcoming.slice(0, 2).map((apt) => (
              <div key={apt._id} className="appointment-item">
                <div className="appointment-info">
                  <h4>
                    {apt.services?.map((s) => s.serviceName).join(", ")}
                  </h4>

                  <div className="appointment-details">
                    <span>
                      <FaCalendarAlt /> {apt.appointmentDate}
                    </span>
                    <span>
                      <FaClock /> {apt.startTime} - {apt.endTime}
                    </span>
                  </div>
                </div>

                <div className="appointment-actions">
                  <span className="appointment-price">
                    ₹{apt.totalPrice}
                  </span>
                  <span className="status-badge upcoming">
                    Upcoming
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">
              No appointments yet 😔 <br />
              Book your first appointment!
            </p>
          )}
        </div>
      </div>

      {/* ✅ Quick Actions */}
      <div className="section-card">
        <div className="section-header">
          <h3>Quick Actions</h3>
        </div>

        <div className="quick-actions">
          <button
            className="action-btn-primary"
            onClick={() =>
              navigate("/bookappointment", {
                state: {
                  customerPincode: customer?.customerPincode || "",
                },
              })
            }
          >
            <FaPlus /> Book Appointment
          </button>

          <button
            className="action-btn-secondary"
            onClick={() => navigate("/shop")}
          >
            <FaShoppingBag /> Browse Products
          </button>
        </div>
      </div>

    </div>
  );
};

export default CustomerOverview;