import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function AccountNavigation() {
  return (
    <ListGroup className="rounded-0 wd-secondary-nav-list">
      <ListGroup.Item className="active border-0" action as={Link} to="/Kambaz/Account/Signin">Sign In</ListGroup.Item>
      <ListGroup.Item className="text-danger bg-white border-0" action as={Link} to="/Kambaz/Account/Signup">Sign Up</ListGroup.Item>
      <ListGroup.Item className="text-danger bg-white border-0" action as={Link} to="/Kambaz/Account/Profile">Profile</ListGroup.Item>
    </ListGroup>
  );
}

