import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const userEmail = params.get("email");

    if (accessToken && refreshToken) {
      try {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        if (userEmail) {
          localStorage.setItem("user_email", userEmail);
        }

        console.log("✅ Tokens stored. Redirecting to /create-event...");
        navigate("/create-event"); // ⬅️ Immediate navigation
      } catch (error) {
        console.error("❌ Failed to store tokens", error);
      }
    } else {
      console.warn("⚠️ Missing tokens in query params");
      navigate("/"); // fallback if tokens missing
    }
  }, [location, navigate]);

  return null; // ⬅️ No need to render anything
}

export default OAuthSuccess;
