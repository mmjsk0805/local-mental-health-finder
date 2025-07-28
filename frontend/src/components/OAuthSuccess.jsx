import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract query params from URL after Google OAuth redirect
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const userEmail = params.get("email");

    // If tokens are present, store them in localStorage and redirect
    if (accessToken && refreshToken) {
      try {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        if (userEmail) {
          localStorage.setItem("user_email", userEmail);
        }

        console.log("✅ Tokens stored. Redirecting to /create-event...");
        navigate("/create-event"); // Automatically go to event creation page
      } catch (error) {
        console.error("❌ Failed to store tokens", error);
      }
    } else {
      // If tokens are missing, return to homepage
      console.warn("⚠️ Missing tokens in query params");
      navigate("/");
    }
  }, [location, navigate]);

  return null;
}

export default OAuthSuccess;
