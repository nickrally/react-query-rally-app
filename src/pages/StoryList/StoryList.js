import { useQuery } from "react-query";
import { getAllItems } from "../../fetch/wsapi";
import { Story } from "./Story";
import "./StoryList.scss";

export const StoryList = () => {
  const { data, error, isLoading } = useQuery("features", getAllItems);
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
          {data["QueryResult"]["Results"].map((item) => (
            <li key={item.ObjectID}>
              {
                <Story
                  className="story"
                  objectid={item.ObjectID}
                  name={item.Name}
                  plannedStartDate={item.PlannedStartDate}
                  plannedEndDate={item.PlannedEndDate}
                />
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
