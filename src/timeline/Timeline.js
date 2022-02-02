import React, { useState } from "react";
import Gantt from "./components/Gantt";
import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";
import { getAllItems } from "../fetch/wsapi";
import { useQuery } from "react-query";

/* const features = {
  data: [
    {
      id: 1,
      text: "Task #1",
      start_date: "2020-02-12",
      duration: 3,
      progress: 0.6,
    },
    {
      id: 2,
      text: "Task #2",
      start_date: "2020-02-16",
      duration: 3,
      progress: 0.4,
    },
  ],
  links: [{ id: 1, source: 1, target: 2, type: "0" }],
}; */

const Timeline = () => {
  const [currentZoom, setCurrentZoom] = useState("Days");
  const [messages, setMessages] = useState();

  const { data, error, isLoading } = useQuery("features", getAllItems);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <span>OH NOES! {error.message}</span>;
  }

  const caclulateDuration = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays;
  };

  const features = {
    data: data["QueryResult"]["Results"].map((feature, idx) => {
      return {
        id: idx + 1,
        text: feature.Name,
        start_date: feature.PlannedStartDate.split("T")[0],
        duration: caclulateDuration(
          feature.PlannedStartDate.split("T")[0],
          feature.PlannedEndDate.split("T")[0]
        ),
        progress: Math.random().toPrecision(1),
      };
    }),
    links: [],
  };

  const addMessage = (message) => {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = setMessages([newMessage, ...this.state.messages]);

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
  };

  const logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : "";
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === "link" && action !== "delete") {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    addMessage(message);
  };

  const handleZoomChange = (zoom) => {
    setCurrentZoom(zoom);
  };

  return (
    <div>
      <div className="zoom-bar">
        <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
      </div>

      <div className="gantt-container">
        <Gantt
          tasks={features}
          zoom={currentZoom}
          onDataUpdated={logDataUpdate}
        />
      </div>
      <MessageArea messages={messages} />
    </div>
  );
};

export default Timeline;
