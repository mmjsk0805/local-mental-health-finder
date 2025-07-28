import { useState } from "react";
import axios from "axios";

import "./EventForm.css";

function EventForm() {
  const [event, setEvent] = useState({
    summary: "",
    description: "",
    start: "",
    end: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event.start || !event.end) {
      alert("Please fill out both start and end times.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) {
        alert("🔒 Please log in with Google before creating an event.");
        return;
      }

      const tokens = {
        access_token: accessToken,
        refresh_token: refreshToken,
      };

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
