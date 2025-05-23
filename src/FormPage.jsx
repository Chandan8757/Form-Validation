import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "San Francisco", "Chicago"],
};

const FormPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";
    if (!formData.username.trim()) newErrors.username = "Username required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email required";
    if (!formData.password) newErrors.password = "Password required";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "10-digit phone number required";
    if (!formData.country) newErrors.country = "Country required";
    if (!formData.city) newErrors.city = "City required";
    if (!formData.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/))
      newErrors.pan = "Invalid PAN format";
    if (!formData.aadhar.match(/^\d{12}$/))
      newErrors.aadhar = "12-digit Aadhar required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "country" && { city: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsSubmitted(true);

    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formData });
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>

      {[
        "firstName",
        "lastName",
        "username",
        "email",
        "phoneNumber",
        "pan",
        "aadhar",
      ].map((field) => (
        <div key={field}>
          <label>{field.replace(/([A-Z])/g, " $1")}: </label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
          {isSubmitted && errors[field] && (
            <p style={{ color: "red" }}>{errors[field]}</p>
          )}
        </div>
      ))}

      <div>
        <label>Password: </label>
        <input
          type={formData.showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="showPassword"
            checked={formData.showPassword}
            onChange={handleChange}
          />{" "}
          Show Password
        </label>
        {isSubmitted && errors.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}
      </div>

      <div>
        <label>Phone: </label>
        <select
          name="phoneCode"
          value={formData.phoneCode}
          onChange={handleChange}
        >
          <option value="+91">+91</option>
          <option value="+1">+1</option>
        </select>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {isSubmitted && errors.phoneNumber && (
          <p style={{ color: "red" }}>{errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <label>Country: </label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countries).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {isSubmitted && errors.country && (
          <p style={{ color: "red" }}>{errors.country}</p>
        )}
      </div>

      <div>
        <label>City: </label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!formData.country}
        >
          <option value="">Select City</option>
          {formData.country &&
            countries[formData.country].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>
        {isSubmitted && errors.city && (
          <p style={{ color: "red" }}>{errors.city}</p>
        )}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default FormPage;
