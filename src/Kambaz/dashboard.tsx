import { Link } from "react-router-dom";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as db from "./database";


export default function Dashboard( {
  courses, 
  course, 
  setCourse, 
  addCourse,
  deleteCourse, 
  updateCourse }: 
  {
  courses: any[]; 
  course: any; 
  setCourse: (course: any) => void;
  addCourse: () => void; 
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void; })
 {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = db;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser && currentUser.role === "ADMIN" && (
        <>
          <h2> Course Editor</h2>
          <Button variant="success" onClick={updateCourse} className="float-end"> Update Course </Button>
          <Button onClick={addCourse} className="float-end"> Add New Course </Button>
          <FormControl onChange={(e) => {setCourse({...course, name: e.target.value})}} value={course.name} />
          <FormControl onChange={(e) => {setCourse({...course, description: e.target.value})}} value={course.description} />
          <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        </>
      )}
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course) =>
              enrollments.some(
                (enrollment) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
                ))
          .map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button variant="primary"> Go </Button>
                    {currentUser && currentUser.role === "ADMIN" && (<>
                    <Button variant="danger" onClick={(e) => {
                      e.preventDefault(); 
                      deleteCourse(course._id);}} 
                      className="float-end"> Delete </Button>
                    <Button variant="warning" onClick={(e) => {
                      e.preventDefault(); 
                      setCourse(course);}}className="float-end me-2"> Edit </Button>  
                    </>)}  
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);}

