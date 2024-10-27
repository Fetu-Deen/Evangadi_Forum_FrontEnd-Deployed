// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ isAuthenticated, children }) => {
//   // If authentication state is known and the user is not authenticated, redirect to login
//   if (isAuthenticated === false) {
//     return <Navigate to="/login" replace />; // Using `replace` to prevent storing the login redirect in history
//   }

//   // While authentication is being determined, you can return null, a spinner, or loading component if needed
//   return children; // Render the children (protected content) if authenticated
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an async check for authentication
    const checkAuth = async () => {
      // Simulate an API call or some async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false); // Set loading to false after checking
    };

    checkAuth();
  }, []);

  // If still loading, return null or a spinner
  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  // If user is not authenticated, redirect to login
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  // Render the children (protected content) if authenticated
  return children;
};

export default ProtectedRoute;
