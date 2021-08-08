import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteStory } from "../../fetch/wsapi";

export const Story = ({ objectid, name, planEstimate }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(deleteStory);

  const remove = async () => {
    await mutateAsync(objectid);
    queryClient.invalidateQueries("stories");
  };
  return (
    <div>
      <Link to={`/update-story/${objectid}`}>{name}</Link>
      ObjectID: {objectid}, Name: {name}, Plan Estimate: {planEstimate}
      <button onClick={remove}>Remove</button>
    </div>
  );
};
