import { useQuery } from "react-query";
import { getAllStories } from "../../fetch/wsapi";
import { Container } from "../../shared/Container";
import { Story } from "./Story";

export const StoryList = () => {
  const { data, error, isLoading } = useQuery("stories", getAllStories);
  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (error) {
    return <span>OH NOES! {error.message}</span>;
  }
  return (
    <Container>
      <div>
        {/*<pre>{JSON.stringify(data)}</pre>*/}
        <ul>
          {data["QueryResult"]["Results"].map((story) => (
            <li key={story.ObjectID}>
              {
                <Story
                  objectid={story.ObjectID}
                  name={story.Name}
                  planEstimate={story.PlanEstimate}
                />
              }
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};
