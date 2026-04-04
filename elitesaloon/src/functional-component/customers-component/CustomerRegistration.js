// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CustomerProfile = ({ customer, setCustomer }) => {

//   // ================= STATE =================
//   const [formData, setFormData] = useState({
//     name: customer.customerName || "",
//     email: customer.customerEmail || "",
//     phone: customer.customerMobile || "",
//     avatar: customer.customerProfileImage || "",

//     street: customer.customerStreet || "",
//     pincode: customer.customerPincode || "",
//     block: customer.customerBlock || "",
//     city: customer.customerCity || "",
//     district: customer.customerDistrict || "",
//     state: customer.customerState || "",
//   });

//   const [postOffices, setPostOffices] = useState([]);

//   useEffect(() => {
//     if (customer) {
//       setFormData({
//         name: customer.customerName || "",
//         email: customer.customerEmail || "",
//         phone: customer.customerMobile || "",
//         avatar: customer.customerProfileImage || "",

//         street: customer.customerStreet || "",
//         pincode: customer.customerPincode || "",
//         block: customer.customerBlock || "",
//         city: customer.customerCity || "",
//         district: customer.customerDistrict || "",
//         state: customer.customerState || "",
//       });
//     }
//   }, [customer]);

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // ================= HANDLE INPUT =================
//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     if (name === "pincode" && !/^\d*$/.test(value)) return;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // ✅ PINCODE API
//     if (name === "pincode") {
//       if (value.length === 6) {
//         try {
//           const res = await fetch(
//             `https://api.postalpincode.in/pincode/${value}`
//           );
//           const data = await res.json();

//           if (data[0].Status === "Success") {
//             const offices = data[0].PostOffice;

//             setPostOffices(offices);

//             const first = offices[0];

//             setFormData((prev) => ({
//               ...prev,
//               district: first?.District || "",
//               state: first?.State || "",
//               city: "",
//               block: "",
//             }));
//           } else {
//             setPostOffices([]);

//             setFormData((prev) => ({
//               ...prev,
//               district: "",
//               state: "",
//               city: "",
//               block: "",
//             }));

//             alert("Invalid Pincode");
//           }
//         } catch {
//           alert("Pincode API failed");
//         }
//       } else {
//         setPostOffices([]);

//         setFormData((prev) => ({
//           ...prev,
//           district: "",
//           state: "",
//           city: "",
//           block: "",
//         }));
//       }
//     }
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ================= IMAGE CLICK =================
//   const handleImageClick = () => {
//     document.getElementById("imageUpload").click();
//   };

//   // ================= IMAGE UPLOAD =================
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formDataImg = new FormData();
//     formDataImg.append("customerProfileImage", file);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/customer/uploadprofile",
//         formDataImg,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (res.status === 200) {
//         const imageUrl = res.data.avatar;

//         setFormData((prev) => ({ ...prev, avatar: imageUrl }));
//         setCustomer((prev) => ({ ...prev, avatar: imageUrl }));
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Image upload failed");
//     }
//   };

//   // ================= PROFILE UPDATE =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name.trim()) return alert("Name required");
//     if (!formData.email.trim()) return alert("Email required");

//     try {
//       setLoading(true);

//       const res = await axios.put(
//         "http://localhost:5000/customer/update-profile",
//         {
//           customerName: formData.name,
//           customerEmail: formData.email,
//           customerMobile: formData.phone,
//           customerStreet: formData.street,
//           customerPincode: formData.pincode,
//           customerBlock: formData.block,
//           customerCity: formData.city,
//           customerDistrict: formData.district,
//           customerState: formData.state,
//           customerProfileImage: formData.avatar,
//         }
//       );

//       if (res.status === 200) {
//         alert("Profile updated successfully");
//         setCustomer(res.data);
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Profile update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= PASSWORD UPDATE =================
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/customer/change-password",
//         passwordData
//       );

//       if (res.status === 200) {
//         alert("Password updated successfully");

//         setPasswordData({
//           currentPassword: "",
//           newPassword: "",
//           confirmPassword: "",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Password update failed");
//     }
//   };

//   return (
//     <div className="dashboard-content">
//       <div className="content-header">
//         <h2>Profile Settings</h2>
//       </div>

//       <div className="profile-section">

//         {/* PROFILE CARD */}
//         <div className="profile-card">
//           <div className="profile-header">
//             <img
//               src={
//                 formData.avatar
//                   ? `http://localhost:5000/uploads/customerProfile/${formData.avatar}?t=${Date.now()}`
//                   : "http://localhost:5000/uploads/default/defaultProfile.png"
//               }
//               alt="profile"
//               className="profile-avatar"
//               onClick={handleImageClick}
//               style={{ cursor: "pointer" }}
//             />

//             <input
//               type="file"
//               id="imageUpload"
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={handleImageChange}
//             />
//           </div>

//           <form className="profile-form" onSubmit={handleSubmit}>

//             {/* PERSONAL */}
//             <h3 className="section-title">Personal Details</h3>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Full Name</label>
//                 <input name="name" value={formData.name} onChange={handleChange}/>
//               </div>

//               <div className="form-group">
//                 <label>Email</label>
//                 <input name="email" value={formData.email} onChange={handleChange}/>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Phone</label>
//                 <input name="phone" value={formData.phone} onChange={handleChange}/>
//               </div>
//             </div>

//             {/* ADDRESS */}
//             <h3 className="section-title">Address</h3>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Street</label>
//                 <input name="street" value={formData.street} onChange={handleChange}/>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Pincode</label>
//                 <input name="pincode" maxLength="6" value={formData.pincode} onChange={handleChange}/>
//               </div>

//               <div className="form-group">
//                 <label>Village / Block</label>
//                 <select
//                   value={formData.block}
//                   onChange={(e) => {
//                     const selectedPO = postOffices.find(
//                       (po) => po.Name === e.target.value
//                     );

//                     if (!selectedPO) return;

//                     setFormData((prev) => ({
//                       ...prev,
//                       block: selectedPO.Name,
//                       city: selectedPO.Block,
//                       district: selectedPO.District,
//                       state: selectedPO.State,
//                     }));
//                   }}
//                 >
//                   <option value="">Select Block</option>
//                   {postOffices.map((po, i) => (
//                     <option key={i} value={po.Name}>
//                       {po.Name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>City</label>
//                 <input value={formData.city} readOnly />
//               </div>

//               <div className="form-group">
//                 <label>District</label>
//                 <input value={formData.district} readOnly />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>State</label>
//                 <input value={formData.state} readOnly />
//               </div>
//             </div>

//             {/* BUTTONS */}
//             <div className="form-actions">
//               <button type="submit" className="btn-primary" disabled={loading}>
//                 {loading ? "Saving..." : "Save Changes"}
//               </button>
//             </div>

//           </form>
//         </div>

//         {/* PASSWORD */}
//         <div className="profile-card">
//           <h3>Change Password</h3>

//           <form onSubmit={handlePasswordSubmit}>
//             <input type="password" name="currentPassword" placeholder="Current Password" onChange={handlePasswordChange}/>
//             <input type="password" name="newPassword" placeholder="New Password" onChange={handlePasswordChange}/>
//             <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handlePasswordChange}/>
//             <button type="submit" className="btn-primary">Update Password</button>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CustomerProfile;

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import "../../components/Form.css";
import { useNavigate } from "react-router-dom";
import useLoader from "../../hooks/useLoader";
import CommonLoader from "../../components/CommonLoader";



const CustomerRegistration = () => {
 
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerMobile: "",
    customerGender: "",
    customerDob: "",
    customerStreet: "",
    customerPincode: "",
    customerCity: "",
    customerblock: "",
    customerDistrict: "",
    customerState: "",
    customerUsername: "",
    customerPassword: "",
    customerConfirmPassword: "",
  });

 const { loading, startLoading, stopLoading } = useLoader();

  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showCpwd, setShowCpwd] = useState(false);
  const [postOffices, setPostOffices] = useState([]);
 

  const navigate = useNavigate();

  

  /* ================= VALIDATION ================= */

  const validate = () => {
    let err = {};

    if (!form.customerName.trim()) {
      err.customerName = "Customer name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.customerName)) {
      err.customerName = "Name should contain only letters";
    }

    if (!form.customerEmail) {
      err.customerEmail = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.customerEmail)) {
      err.customerEmail = "Enter valid email";
    }

    if (!form.customerMobile || form.customerMobile.length < 10) {
      err.customerMobileNo = "Valid mobile number required";
    }

    if (!form.customerGender) {
      err.customerGender = "Gender is required";
    }

    if (!form.customerDob) {
      err.customerDob = "Date of birth is required";
    }

   
    if (!form.customerStreet) {
      err.customerStreet = "Street is required";
    }

    if (!form.customerPincode || form.customerPincode.length !== 6) {
      err.customerPincode = "Valid pincode required";
    }

    if (!form.customerblock) {
      err.customerblock = "Village/Block required";
    }

    if (!form.customerUsername) {
      err.customerUsername = "Username is required";
    }

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

    if (!form.customerPassword) {
      err.customerPassword = "Password is required";
    } else if (!strongPassword.test(form.customerPassword)) {
      err.customerPassword =
        "Password must contain uppercase, lowercase, number & special character";
    }

    if (!form.customerConfirmPassword) {
      err.confirmPassword = "Confirm password required";
    } else if (form.customerPassword !== form.customerConfirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }

    setErrors(err);

    // console.log("Validation Errors:", err);

    return Object.keys(err).length === 0;
  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "customerName" && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "customerPincode" && !/^\d*$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    /* PINCODE API */

    if (name === "customerPincode") {
      if (value.length === 6) {
        try {
          const res = await fetch(
            `https://api.postalpincode.in/pincode/${value}`
          );

          const data = await res.json();

          if (data[0].Status === "Success") {
            const offices = data[0].PostOffice;

            setPostOffices(offices);

            const first = offices[0];

            setForm((prev) => ({
              ...prev,
              customerDistrict: first?.District || "",
              customerState: first?.State || "",
              customerCity: "",
              customerblock: "",
            }));
          } else {
            setPostOffices([]);

            setForm((prev) => ({
              ...prev,
              customerDistrict: "",
              customerState: "",
              customerCity: "",
              customerblock: "",
            }));

            Swal.fire("Invalid Pincode", "No data found", "error");
          }
        } catch {
          Swal.fire("Error", "Pincode API failed", "error");
        }
      } else {
        setPostOffices([]);

        setForm((prev) => ({
          ...prev,
          customerDistrict: "",
          customerState: "",
          customerCity: "",
          customerblock: "",
        }));
      }
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire("Validation Error", "Please fix all fields", "error");
      return;
    }



    try {
      // FIELD MAPPING FOR BACKEND
      const customer = {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerMobile: form.customerMobile,
        customerGender: form.customerGender,
        customerDOB: form.customerDob,
        customerStreet: form.customerStreet,
        customerPincode: form.customerPincode,
        customerCity: form.customerCity,
        customerBlock: form.customerblock,
        customerDistrict: form.customerDistrict,
        customerState: form.customerState,
        customerUsername: form.customerUsername,
        customerPassword: form.customerPassword,
        customerProfileImage: "default.jpg",
      };

      console.log("customer:", customer);

      if (loading) return; //  prevent double click
         startLoading(); 


      const response = await fetch(
        "http://localhost:5000/customer/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        }
      );

      const data = await response.json();
      
      const customerEmailReceived = data.customerEmail ;
    
      console.log("Response Email Handle For OTP Confirmaion : " + customerEmailReceived);

     if (response.ok) {
  Swal.fire({
    title: "Registration Successful",
    text: "OTP Sent Successfully",
    icon: "success",
  }).then(() => {

    sessionStorage.removeItem("otpFlow");

    navigate("/customerotpverify", {
      replace: true,
      state: { customerEmail: customerEmailReceived }
    });

  });
} else {
        Swal.fire("Registration Failed", data.message || "Try again", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Server Error", "Backend not responding", "error");
    }finally{
          stopLoading();; // ⏹ stop spinner
    }
  };

  /* ================= UI ================= */

  return (
     <>
      <CommonLoader loading={loading} />
    <div className="form-wrapper">
      <h2>EliteSalon Customer Registration</h2>

      <form onSubmit={handleSubmit}>
        {/* PERSONAL DETAILS */}

        <div className="form-section">
          <h3>Personal Details</h3>

          <div className="form-grid">

            <div className="form-group">
              <input
                name="customerName"
                placeholder="Customer Name"
                value={form.customerName}
                onChange={handleChange}
              />
              <small className="error-text">{errors.customerName}</small>
            </div>

            <div className="form-group">
              <input
                name="customerEmail"
                placeholder="Email"
                value={form.customerEmail}
                onChange={handleChange}
              />
              <small className="error-text">{errors.customerEmail}</small>
            </div>

            <div className="form-group">
              <PhoneInput
                country="in"
                value={form.customerMobile}
                onChange={(phone) =>
                  setForm((prev) => ({
                    ...prev,
                    customerMobile: phone,
                  }))
                }
              />
              <small className="error-text">{errors.customerMobileNo}</small>
            </div>

            <div className="form-group">
              <select
                name="customerGender"
                value={form.customerGender}
                onChange={handleChange}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <small className="error-text">{errors.customerGender}</small>
            </div>

            <div className="form-group">
              <input
                type="date"
                name="customerDob"
                value={form.customerDob}
                onChange={handleChange}
              />
              <small className="error-text">{errors.customerDob}</small>
            </div>

          </div>
        </div>

        {/* ADDRESS */}

        <div className="form-section">
          <h3>Address</h3>

          <div className="form-grid">

            <input
              name="customerStreet"
              placeholder="Street"
              value={form.customerStreet}
              onChange={handleChange}
              
            />
             <small className="error-text">{errors.customerStreet}</small>

            <input
              name="customerPincode"
              placeholder="Pincode"
              maxLength="6"
              value={form.customerPincode}
              onChange={handleChange}
            />

            <select
              name="customerblock"
              value={form.customerblock}
              onChange={(e) => {
                const selectedPO = postOffices.find(
                  (po) => po.Name === e.target.value
                );

                if (!selectedPO) return;

                setForm((prev) => ({
                  ...prev,
                  customerblock: selectedPO.Name,
                  customerCity: selectedPO.Block,
                  customerDistrict: selectedPO.District,
                  customerState: selectedPO.State,
                }));
              }}
            >
              <option value="">Select Village / Block</option>
              {postOffices.map((po, index) => (
                <option key={index} value={po.Name}>
                  {po.Name}
                </option>
              ))}
            </select>

            <input value={form.customerCity} readOnly />
            <input value={form.customerDistrict} readOnly />
            <input value={form.customerState} readOnly />

          </div>
        </div>

        {/* CREDENTIALS */}

      

<div className="form-section">
  <h3>Credentials</h3>

  <div className="form-grid">
    <div className="form-group">
      <input
        name="customerUsername"
        placeholder="Username"
        value={form.customerUsername}
        onChange={handleChange}
      />

      <small className="error-text">{errors.customerUsername}</small>
    </div>

    <div className="password-group">
      <input
        type={showPwd ? "text" : "password"}
        name="customerPassword"
        placeholder="Password"
        value={form.customerPassword}
        onChange={handleChange}
      />

      <span onClick={() => setShowPwd(!showPwd)}>
        {showPwd ? <FaEyeSlash /> : <FaEye />}
      </span>

      <small className="error-text">{errors.customerPassword}</small>
    </div>

    <div className="password-group">
      <input
        type={showCpwd ? "text" : "password"}
        name="customerConfirmPassword"
        placeholder="Confirm Password"
        value={form.customerConfirmPassword}
        onChange={handleChange}
      />

      <span onClick={() => setShowCpwd(!showCpwd)}>
        {showCpwd ? <FaEyeSlash /> : <FaEye />}
      </span>

      <small className="error-text">{errors.confirmPassword}</small>
    </div>
  </div>
</div>

        <button className="submit-btn">
          {loading ? (
            <>
              <span className="spinner"></span>
              Please wait...
            </>
          ) : (
            "Register"
          )}
        </button>

      </form>
    </div>
    </>
  );
};

export default CustomerRegistration;