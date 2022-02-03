import React, { useState } from "react";
import Gantt from "./components/Gantt";
import Toolbar from "./components/Toolbar";
import { getAllItems, updateItem, deleteItem } from "../fetch/wsapi";
import { useQuery, useMutation, useQueryClient } from "react-query";

const timelineItemToFeature = (task) => {
  const date1 = new Date(task.start_date);
  return {
    ObjectID: task.id,
    Name: task.text,
    PlannedStartDate: task.start_date.split(" ")[0],
    PlannedEndDate: new Date(
      date1.setTime(date1.getTime() + task.duration * 24 * 60 * 60 * 1000)
    )
      .toISOString()
      .split("T")[0],
  };
};

const featureToTimelineItem = (feature) => {
  const caclulateDuration = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = diffInTime / (24 * 60 * 60 * 1000);
    return diffInDays;
  };
  return {
    id: feature.ObjectID,
    text: feature.Name,
    start_date: feature.PlannedStartDate.split("T")[0],
    duration: caclulateDuration(
      feature.PlannedStartDate.split("T")[0],
      feature.PlannedEndDate.split("T")[0]
    ),
    progress: Math.random().toPrecision(1),
  };
};

const Timeline = () => {
  const [currentZoom, setCurrentZoom] = useState("Days");

  const queryClient = useQueryClient();
  const { mutateAsync: mutateAsyncUpdate } = useMutation(updateItem);
  const { mutateAsync: mutateAsyncDelete } = useMutation(deleteItem);

  const { data, error, isLoading } = useQuery("features", getAllItems);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <span>OH NOES! {error.message}</span>;
  }

  const features = {
    data: data["QueryResult"]["Results"].map((feature) =>
      featureToTimelineItem(feature)
    ),
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };

  const handleUpdate = async (type, action, item, id) => {
    if (action === "update") {
      const feature = timelineItemToFeature(item);
      const objectid = feature.ObjectID;
      console.log("feature", feature);
      await mutateAsyncUpdate({ ...feature, objectid });
      queryClient.invalidateQueries("feature");
    } else if (action === "delete") {
      await mutateAsyncDelete(id);
      queryClient.invalidateQueries("features");
    }
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
          onDataUpdated={handleUpdate}
        />
      </div>
    </div>
  );
};

export default Timeline;
