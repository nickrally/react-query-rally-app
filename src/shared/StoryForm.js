import { useState } from "react";
import "./StoryForm.scss";

export const StoryForm = ({ onFormSubmit, defaultData = null }) => {
  let defaultName = defaultData && defaultData.Name ? defaultData.Name : null;
  let defaultPlannedStartDate =
    defaultData && defaultData.PlannedStartDate
      ? defaultData.PlannedStartDate
      : "";
  let defaultPlannedEndDate =
    defaultData && defaultData.PlannedEndDate
      ? defaultData.PlannedEndDate
      : null;

  const [name, setName] = useState(defaultName);
  const [plannedStartDate, setPlannedStartDate] = useState(
    defaultPlannedStartDate
  );
  const [plannedEndDate, setPlannedEndDate] = useState(defaultPlannedEndDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ name, plannedStartDate, plannedEndDate });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">Name</label>
      <input
        className="field"
        type="text"
        defaultValue={defaultName}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label className="label">Planned Start Date:</label>
      <input
        name="PlannedStartDate"
        className="field"
        type="text"
        defaultValue={defaultPlannedStartDate}
        onChange={(e) => setPlannedStartDate(e.target.value)}
      />
      <label className="label">Planned End Date:</label>
      <input
        name="PlannedEndDate"
        className="field"
        type="text"
        defaultValue={defaultPlannedEndDate}
        onChange={(e) => setPlannedEndDate(e.target.value)}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};
