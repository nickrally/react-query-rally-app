import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { StoryForm, Container } from "../../shared";
import { createStory } from "../../fetch/wsapi";

export const CreateStory = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutateAsync, error, isError, isLoading } = useMutation(createStory);

  const onFormSubmit = (payload) => {
    mutateAsync(payload);
    queryClient.invalidateQueries("stories");
    history.push("/");
  };
  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError) {
    return <Container>{error.message}</Container>;
  }
  return (
    <Container>
      <h2>Create story</h2>
      <StoryForm onFormSubmit={onFormSubmit} />
    </Container>
  );
};
