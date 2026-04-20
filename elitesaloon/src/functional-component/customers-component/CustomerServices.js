import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaClock, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";

const CustomerServices = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
const [locationFilter, setLocationFilter] = useState("");
const [priceFilter, setPriceFilter] = useState("");

  // ✅ Dummy fallback
  const dummyServices = [
    {
      _id: "1",
      serviceName: "Hair Cut",
      serviceDescription: "Professional stylish haircut",
      servicePrice: 300,
      serviceDuration: 30,
      serviceImages: ["default.jpg"],
      ownerId: {
        _id: "o1",
        ownerEmail: "rahul@gmail.com",
        ownerShopName: "Elite Salon",
        ownerShopStreet: "Navrangpura",
        ownerShopState: "Gujarat",
      },
    },
  ];

const filteredServices = services.filter((service) => {
  const matchSearch =
    service.serviceName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    service.ownerId?.ownerShopName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchLocation =
    locationFilter === "" ||
    service.ownerId?.ownerShopState
      ?.toLowerCase()
      .includes(locationFilter.toLowerCase()) ||
    service.ownerId?.ownerShopStreet
      ?.toLowerCase()
      .includes(locationFilter.toLowerCase());

  const matchPrice =
    priceFilter === "" ||
    (priceFilter === "low" && service.servicePrice <= 300) ||
    (priceFilter === "mid" &&
      service.servicePrice > 300 &&
      service.servicePrice <= 800) ||
    (priceFilter === "high" && service.servicePrice > 800);

  return matchSearch && matchLocation && matchPrice;
});

  // 🔥 Fetch API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");

        if (res.data.services?.length) {
          setServices(res.data.services);
        } else {
          setServices(dummyServices);
        }
      } catch (err) {
        console.log("API failed → using dummy data");
        setServices(dummyServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // 🔥 Book Now
  const handleBookNow = (service) => {
    navigate("/bookappointment", {
      state: {
        serviceId: service._id,
        serviceName: service.serviceName,
        servicePrice: service.servicePrice,
        serviceDuration: service.serviceDuration,

        ownerId: service.ownerId?._id,
        shopName: service.ownerId?.ownerShopName,
        ownerEmail: service.ownerId?.ownerEmail,
        address: `${service.ownerId?.ownerShopStreet}, ${service.ownerId?.ownerShopState}`,
      },
    });
  };

  if (loading) {
    return <p className="no-data">Loading services...</p>;
  }

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Explore Services</h2>
      </div>

<div className="filter-bar">

  {/* SEARCH */}
  <input
    type="text"
    placeholder="Search service or salon..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  {/* LOCATION */}
  <input
    type="text"
    placeholder="Filter by location..."
    value={locationFilter}
    onChange={(e) => setLocationFilter(e.target.value)}
  />

  {/* PRICE */}
  <select
    value={priceFilter}
    onChange={(e) => setPriceFilter(e.target.value)}
  >
    <option value="">All Prices</option>
    <option value="low">₹0 - ₹300</option>
    <option value="mid">₹300 - ₹800</option>
    <option value="high">₹800+</option>
  </select>

</div>
      <div className="customer-service-grid">
       {filteredServices.map((service) => ( 
          <div key={service._id} className="customer-service-card">
            {/* IMAGE */}
            <img
              src={
                service.serviceImages?.length > 0
                  ? `http://localhost:5000/uploads/services/${service.serviceImages[0]}`
                  : "http://localhost:5000/uploads/default/defaultService.jpg"
              }
              onError={(e) => {
                e.target.src =
                  "http://localhost:5000/uploads/default/defaultService.jpg";
              }}
              alt={service.serviceName}
            />

            {/* BODY */}
            <div className="service-body">
              {/* SHOP NAME */}
              <span className="shop-name">
                {service.ownerId?.ownerShopName}
              </span>

              {/* EMAIL */}
              <span className="owner-email">{service.ownerId?.ownerEmail}</span>

              {/* ADDRESS */}
              <span className="service-address">
                <FaMapMarkerAlt /> {service.ownerId?.ownerShopStreet},{" "}
                {service.ownerId?.ownerShopState}
              </span>

              <h3>{service.serviceName}</h3>

              <p className="desc">{service.serviceDescription}</p>

              {/* META */}
              <div className="service-meta">
                <span>
                  <FaClock /> {service.serviceDuration} min
                </span>
                <span>
                  <FaRupeeSign /> {service.servicePrice}
                </span>
              </div>

              {/* ONLY BOOK BUTTON */}
              <div className="service-actions">
                <button
                  className="book-btn"
                  onClick={() => handleBookNow(service)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerServices;
