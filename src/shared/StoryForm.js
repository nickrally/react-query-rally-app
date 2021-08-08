import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        defaultValue={defaultName}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Plan Estimate</label>
      <input
        type="text"
        defaultValue={defaultPlanEstimate}
        onChange={(e) => setPlanEstimate(e.target.value)}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};
