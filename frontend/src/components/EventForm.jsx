import { useState } from "react";
import axios from "axios";

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
      const tokens = {
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
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

      console.log("🎯 Event creation response:", response.data);
      alert("Event created: " + response.data.htmlLink);
    } catch (error) {
      console.error(error);
      alert("Error creating event.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Create Google Calendar Event</h2>

        <input
          type="text"
          name="summary"
          placeholder="Event Title"
          value={event.summary}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />

        <input
          type="datetime-local"
          name="start"
          value={event.start}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />

        <input
          type="datetime-local"
          name="end"
          value={event.end}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 rounded bg-gray-700"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default EventForm;
