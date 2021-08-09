import { useQuery } from "react-query";
import { getAllStories } from "../../fetch/wsapi";
import { Story } from "./Story";
import "./StoryList.scss";

export const StoryList = () => {
  const { data, error, isLoading } = useQuery("stories", getAllStories);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <span>OH NOES! {error.message}</span>;
  }
  return (
    <div>
      <div>
        {/*<pre>{JSON.stringify(data)}</pre>*/}
        <ul>
          {data["QueryResult"]["Results"].map((story) => (
            <li key={story.ObjectID}>
              {
                <Story
                  className="story"
                  objectid={story.ObjectID}
                  name={story.Name}
                  planEstimate={story.PlanEstimate}
                />
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
