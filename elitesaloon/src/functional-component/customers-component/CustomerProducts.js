import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";

const CustomerProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Dummy fallback
  const dummyProducts = [
    {
      _id: "p1",
      productName: "Hair Gel",
      productDescription: "Strong hold hair styling gel",
      productPrice: 250,
      productImages: ["default.jpg"],
      ownerId: {
        _id: "o1",
        ownerEmail: "rahul@gmail.com",
        ownerShopName: "Elite Salon",
        ownerShopStreet: "Navrangpura",
        ownerShopState: "Gujarat",
      },
    },
  ];

  // 🔥 Fetch API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");

        if (res.data.products?.length) {
          setProducts(res.data.products);
        } else {
          setProducts(dummyProducts);
        }
      } catch (err) {
        console.log("API failed → using dummy products");
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 Buy Now
  const handleBuyNow = (product) => {
    navigate("/productcheckout", {
      state: {
        productId: product._id,
        productName: product.productName,
        productPrice: product.productPrice,

        ownerId: product.ownerId?._id,
        shopName: product.ownerId?.ownerShopName,
        ownerEmail: product.ownerId?.ownerEmail,
        address: `${product.ownerId?.ownerShopStreet}, ${product.ownerId?.ownerShopState}`,
      },
    });
  };

  if (loading) {
    return <p className="no-data">Loading products...</p>;
  }

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Explore Products</h2>
      </div>

      <div className="customer-product-grid">
        {products.map((product) => (
          <div key={product._id} className="customer-product-card">

            {/* IMAGE */}
            <img
              src={
                product.productImages?.[0] !== "default.jpg"
                  ? `http://localhost:5000/uploads/products/${product.productImages[0]}`
                  : "https://via.placeholder.com/300"
              }
              alt={product.productName}
            />

            {/* BODY */}
            <div className="product-body">

              {/* SHOP NAME */}
              <span className="shop-name">
                {product.ownerId?.ownerShopName}
              </span>

              {/* EMAIL */}
              <span className="owner-email">
                {product.ownerId?.ownerEmail}
              </span>

              {/* ADDRESS */}
              <span className="service-address">
                <FaMapMarkerAlt />{" "}
                {product.ownerId?.ownerShopStreet},{" "}
                {product.ownerId?.ownerShopState}
              </span>

              <h3>{product.productName}</h3>

              <p className="desc">{product.productDescription}</p>

              {/* PRICE */}
              <div className="product-meta">
                <span>
                  <FaRupeeSign /> {product.productPrice}
                </span>
              </div>

              {/* BUTTON */}
              <div className="service-actions">
                <button
                  className="book-btn"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProducts;