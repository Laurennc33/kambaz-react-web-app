import { Link } from "react-router-dom";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addEnrollment, deleteEnrollment } from "./courses/enrollment/reducer";
import React from "react";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addCourse,
  deleteCourse,
  updateCourse,
  editCourse,
}: {
  courses: { _id: string; name: string; description: string }[];
  course: { _id: string; name: string; description: string };
  setCourse: (course: { _id: string; name: string; description: string }) => void;
  addCourse: (course: { _id: string; name: string; description: string }) => void;
  deleteCourse: (courseId: string) => void;
  editCourse: (courseId: string) => void;
  updateCourse: (course: { _id: string; name: string; description: string }) => void;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const [showAllCourses, setShowAllCourses] = React.useState(false);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {currentUser && currentUser.role === "ADMIN" && (
        <>
          <h2> Course Editor</h2>
          <Button
            variant="success"
            onClick={() => updateCourse(course)} 
            className="float-end"
          >
            Update Course
          </Button>
          <Button
            onClick={() => addCourse(course)} 
            className="float-end"
          >
            Add New Course
          </Button>
          <FormControl
            onChange={(e) => {
              setCourse({ ...course, name: e.target.value });
            }}
            value={course.name}
          />
          <FormControl
            onChange={(e) => {
              setCourse({ ...course, description: e.target.value });
            }}
            value={course.description}
          />
          <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
          <hr />
        </>
      )}

      {/* Enrollments Toggle Button */}
      <Button
        variant="info"
        onClick={() => setShowAllCourses(!showAllCourses)}
        className="float-end"
      >
        {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
      </Button>

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course) => {
              if (showAllCourses) {
                return true; // Show all courses
              }
              // Show only courses user is enrolled in
              return enrollments.some(
                (enrollment: { user: string; course: string }) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
              );
            })
            .map((course) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </Card.Text>
                      <Button variant="primary">Go</Button>

                      {/* Enroll/Unenroll Button */}
                      {enrollments.some(
                        (enrollment: { user: string; course: string; _id: string }) =>
                          enrollment.user === currentUser._id &&
                          enrollment.course === course._id
                      ) ? (
                        <Button
                          variant="danger"
                          onClick={() =>
                            dispatch(
                              deleteEnrollment(
                                enrollments.find(
                                  (enrollment: { user: string; course: string; _id: string }) =>
                                    enrollment.user === currentUser._id &&
                                    enrollment.course === course._id
                                )._id
                              )
                            )
                          }
                          className="float-end"
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() =>
                            dispatch(
                              addEnrollment({
                                user: currentUser._id,
                                course: course._id,
                              })
                            )
                          }
                          className="float-end"
                        >
                          Enroll
                        </Button>
                      )}

                      {/* Admin Actions */}
                      {currentUser && currentUser.role === "ADMIN" && (
                        <>
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="float-end"
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(course);
                              editCourse(course._id);
                            }}
                            className="float-end me-2"
                          >
                            Edit
                          </Button>
                        </>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
