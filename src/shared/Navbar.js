import { Link } from "react-router-dom";
import { Container } from "./Container";

export const Navbar = () => {
  return (
    <div>
      <Container>
        <Link to="/">Home</Link>
        <Link to="/create-story">Add new story</Link>
      </Container>
    </div>
  );
};
