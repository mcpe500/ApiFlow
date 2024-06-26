// In src/pages/error/DetermineError.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Error from "./Error";
import { HTTP_STATUS } from "../../config/httpStatus";

const DetermineError = () => {
  const location = useLocation();
  const errorType = determineErrorType(location); // Implement this function based on your needs

  return <Error errorType={errorType} />;
};

const determineErrorType = (location) => {
  console.log(location);
  // Updated logic to use HTTP_STATUS for comparison and return
  if (location.state?.status === HTTP_STATUS.NOT_FOUND) {
    return HTTP_STATUS.NOT_FOUND;
  } else if (location.state?.status === HTTP_STATUS.FORBIDDEN) {
    return HTTP_STATUS.FORBIDDEN;
  } else if (location.state?.status === HTTP_STATUS.UNAUTHORIZED) {
    return HTTP_STATUS.UNAUTHORIZED;
  } else {
    return HTTP_STATUS.NOT_FOUND;
  }
};

export default DetermineError;
