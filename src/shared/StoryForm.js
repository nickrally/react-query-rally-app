import { useState } from "react";
import "./StoryForm.scss";

export const StoryForm = ({ onFormSubmit, defaultData = null }) => {
  let defaultName = defaultData && defaultData.Name ? defaultData.Name : "";
  let defaultPlanEstimate =
    defaultData && defaultData.PlanEstimate ? defaultData.PlanEstimate : "";

  const [name, setName] = useState(defaultName);
  const [planEstimate, setPlanEstimate] = useState(defaultPlanEstimate);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit({ name, planEstimate });
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
      <label className="label">Plan Estimate</label>
      <input
        className="field"
        type="text"
        defaultValue={defaultPlanEstimate}
        onChange={(e) => setPlanEstimate(e.target.value)}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};
