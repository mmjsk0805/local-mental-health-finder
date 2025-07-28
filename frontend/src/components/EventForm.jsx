import { useState } from "react";
import axios from "axios";

import "./EventForm.css";

function EventForm() {
  // State to hold form data for the event
  const [event, setEvent] = useState({
    summary: "",
    description: "",
    start: "",
    end: "",
  });

  // Update state as user types into form inputs
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // Submit event to backend and Google Calendar
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure required fields are filled
    if (!event.start || !event.end) {
      alert("Please fill out both start and end times.");
      return;
    }

    try {
      // Get stored Google tokens from localStorage
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      // Make sure user is logged in
      if (!accessToken || !refreshToken) {
        alert("🔒 Please log in with Google before creating an event.");
        return;
      }

      const tokens = {
        access_token: accessToken,
        refresh_token: refreshToken,
      };

      // Send event + tokens to backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/calendar/create-event`,
        {
          tokens,
          event: {
            summary: event.summary,
            description: event.description,
            start: new Date(event.start).toISOString(),
            end: new Date(event.end).toISOString(),
          },
        }
      );

      // Confirm to user that event was created
      alert(
        `✅ Event confirmed!\nStart: ${new Date(
          event.start
        ).toLocaleString()}\nEnd: ${new Date(event.end).toLocaleString()}`
      );
    } catch (error) {
      console.error(error);
      alert("Error creating event.");
    }
  };

  return (
    <div className="event-page-container">
      <form onSubmit={handleSubmit} className="event-form">
        <h2>Create Google Calendar Event</h2>

        <input
          type="text"
          name="summary"
          placeholder="Event Title"
          value={event.summary}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="start"
          value={event.start}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="end"
          value={event.end}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;
