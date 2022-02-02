import { Switch, Route } from "react-router-dom";
import { Navbar } from "./shared/Navbar";
import { StoryList } from "./pages/StoryList";
import { CreateStory } from "./pages/CreateStory";
import { UpdateStory } from "./pages/UpdateStory";
import Timeline from "./timeline/Timeline";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.scss";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/timeline">
          <Timeline />
        </Route>
        <Route path="/create-story">
          <CreateStory />
        </Route>
        <Route path="/update-story/:objectid">
          <UpdateStory />
        </Route>
        <Route path="/">
          <StoryList />
        </Route>
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
