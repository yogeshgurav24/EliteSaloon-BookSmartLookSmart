import React, { useState } from "react";
import axios from "axios";

const CustomerProfile = ({ customer, setCustomer }) => {
  // ================= STATE =================
  const [formData, setFormData] = useState({
    name: customer.name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    avatar: customer.avatar || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= IMAGE CLICK =================
  const handleImageClick = () => {
    document.getElementById("imageUpload").click();
  };

  // ================= IMAGE UPLOAD =================
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("avatar", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/customer/upload-avatar",
        formDataImg,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        const imageUrl = res.data.avatar;

        // update UI instantly
        setFormData((prev) => ({ ...prev, avatar: imageUrl }));
        setCustomer((prev) => ({ ...prev, avatar: imageUrl }));
      }
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    }
  };

  // ================= PROFILE UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return alert("Name required");
    if (!formData.email.trim()) return alert("Email required");

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:5000/customer/update-profile",
        formData
      );

      if (res.status === 200) {
        alert("Profile updated successfully");

        // dashboard update
        setCustomer(res.data);
      }
    } catch (error) {
      console.log(error);
      alert("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= PASSWORD UPDATE =================
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/customer/change-password",
        passwordData
      );

      if (res.status === 200) {
        alert("Password updated successfully");

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Profile Settings</h2>
      </div>

      <div className="profile-section">
        {/* PROFILE CARD */}
        <div className="profile-card">
          <div className="profile-header">
            <img
              src={
                formData.avatar
                  ? `http://localhost:5000/uploads/${formData.avatar}`
                  : "/images/defaultProfile.png"
              }
              alt="profile"
              className="profile-avatar"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />

            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Member Since</label>
                <input type="text" value={customer.memberSince} disabled />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                className="btn-outline"
                onClick={() => setFormData(customer)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* PASSWORD CARD */}
        <div className="profile-card">
          <h3>Change Password</h3>

          <form className="password-form" onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <button type="submit" className="btn-primary">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;