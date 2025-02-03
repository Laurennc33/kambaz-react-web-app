import ListGroup from "react-bootstrap/esm/ListGroup";
import { Link } from "react-router-dom";


export default function CourseNavigation() {
  return (
    <ListGroup className="rounded-0 wd-secondary-nav-list">
      <ListGroup.Item className="active border-0" as={Link} to="/Kambaz/Courses/1234/Home" id="wd-course-home-link">Home</ListGroup.Item>
      <ListGroup.Item className="text-danger bg-white border-0" as={Link} to="/Kambaz/Courses/1234/Modules" id="wd-course-modules-link">Modules</ListGroup.Item>
      <ListGroup.Item className="text-danger bg-white border-0" as={Link} to="/Kambaz/Courses/1234/Assignments" id="wd-course-quizzes-link">Assignments</ListGroup.Item>
      <ListGroup.Item className="text-danger bg-white border-0" as={Link} to="/Kambaz/Courses/1234/Quizzes" id="wd-course-assignments-link">Quizzes</ListGroup.Item>
      <ListGroup.Item className="text-danger bg-white border-0" as={Link} to="/Kambaz/Courses/1234/Grades" id="wd-course-grades-link">Grades</ListGroup.Item>
      <ListGroup.Item className="text-danger bg-white border-0" as={Link} to="/Kambaz/Courses/1234/Zoom" id="wd-course-zoom-link">Zoom</ListGroup.Item>
      <ListGroup.Item className="text-danger bg-white border-0" as={Link} to="/Kambaz/Courses/1234/Piazza" id="wd-course-piazza-link">Piazza</ListGroup.Item>
      <ListGroup.Item className="text-danger bg-white border-0" as={Link} to="/Kambaz/Courses/1234/People" id="wd-course-people-link">People</ListGroup.Item>
    </ListGroup>
  );
}
