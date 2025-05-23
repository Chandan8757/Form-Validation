import React from "react";
import { useLocation, Link } from "react-router-dom";

const SuccessPage = () => {
  const { state } = useLocation();

  return (
    <div>
      <h2>Form Submitted Successfully!</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {String(value)}
          </li>
        ))}
      </ul>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default SuccessPage;
