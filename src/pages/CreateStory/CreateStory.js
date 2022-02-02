import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { StoryForm } from "../../shared";
import { createItem } from "../../fetch/wsapi";

export const CreateStory = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutateAsync, error, isError, isLoading } = useMutation(createItem);

  const onFormSubmit = (payload) => {
    mutateAsync(payload);
    queryClient.invalidateQueries("features");
    //queryClient.removeQueries("stories");
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
      <h2>Create story</h2>
      <StoryForm onFormSubmit={onFormSubmit} />
    </div>
  );
};
