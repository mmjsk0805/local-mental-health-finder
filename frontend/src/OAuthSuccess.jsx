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
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      console.log("Tokens stored!");

      // Automatically redirect after 1 second delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [location, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-xl font-bold">Google Calendar Connected ✅</h1>
    </div>
  );
}

export default OAuthSuccess;
