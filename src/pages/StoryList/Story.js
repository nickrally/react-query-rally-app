import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteStory } from "../../fetch/wsapi";
import "./Story.scss";

export const Story = ({ objectid, name, planEstimate }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteStory);

  const remove = async () => {
    await mutateAsync(objectid);
    queryClient.invalidateQueries("stories");
  };
  return (
    <div>
      <Link to={`/update-story/${objectid}`}>{objectid}</Link>
      <p>
        Name: {name}, Plan Estimate: {planEstimate}
      </p>
      <button onClick={remove} className="remove-button">
        Remove
      </button>
    </div>
  );
};
