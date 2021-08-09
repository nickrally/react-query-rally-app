import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { StoryForm } from "../../shared";
import { getStory, updateStory } from "../../fetch/wsapi";

export const UpdateStory = () => {
  const { objectid } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(updateStory);

  const { data, error, isLoading, isError } = useQuery(
    ["story", { objectid }],
    getStory
  );
  const onFormSubmit = async (payload) => {
    await mutateAsync({ ...payload, objectid });
    queryClient.invalidateQueries("story");
    history.push("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <h2>Update story</h2>
      <StoryForm onFormSubmit={onFormSubmit} defaultData={data} />
    </div>
  );
};
