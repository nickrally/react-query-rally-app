import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteItem } from "../../fetch/wsapi";
import "./Story.scss";

export const Story = ({ objectid, name, plannedStartDate, plannedEndDate }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteItem);

  const remove = async () => {
    await mutateAsync(objectid);
    queryClient.invalidateQueries("features");
  };
  return (
    <div>
      <Link to={`/update-story/${objectid}`}>{objectid}</Link>
      <p>
        Name: {name}, PlannedStartDate: {plannedStartDate}, PlannedEndDate:{" "}
        {plannedEndDate}
      </p>
      <button onClick={remove} className="remove-button">
        Remove
      </button>
    </div>
  );
};
