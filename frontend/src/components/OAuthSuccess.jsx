import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      try {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        if (userEmail) {
          localStorage.setItem("user_email", userEmail);
        }
        console.log("✅ Tokens stored in localStorage");

        setTimeout(() => navigate("/create-event"), 1000);
      } catch (error) {
        console.error("❌ Failed to store tokens", error);
      }
    } else {
      console.warn("⚠️ Missing tokens in query params");
    }
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-xl font-bold">Google Calendar Connected ✅</h1>
    </div>
  );
}

export default OAuthSuccess;
