import { Link } from "react-router-dom";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import React from "react";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addCourse,
  deleteCourse,
  updateCourse,
  editCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: { _id: string; name: string; description: string; enrolled?: boolean }[];
  course: { _id: string; name: string; description: string };
  setCourse: (course: { _id: string; name: string; description: string }) => void;
  addCourse: () => void;
  deleteCourse: (courseId: string) => void;
  editCourse: (courseId: string) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showAllCourses, setShowAllCourses] = React.useState(false);

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c) => c.enrolled);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary">
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>
      <hr />

      {currentUser?.role === "ADMIN" && (
        <>
          <h2>Course Editor</h2>
          <Button variant="success" onClick={updateCourse} className="float-end ms-2">
            Update Course
          </Button>
          <Button onClick={addCourse} className="float-end">
            Add New Course
          </Button>
          <FormControl
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            value={course.name}
            className="mb-2"
          />
          <FormControl
            placeholder="Course Description"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            value={course.description}
            className="mb-4"
          />
          <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
          <hr />
        </>
      )}

      <Button
        variant="info"
        onClick={() => setShowAllCourses(!showAllCourses)}
        className="float-end mb-3"
      >
        {showAllCourses ? "Show My Enrollments" : "Show All Courses"}
      </Button>

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course) => {
            const isEnrolled = course.enrolled;

            return (
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

                      {enrolling && (
                        <button
                          className={`btn ${isEnrolled ? "btn-danger" : "btn-success"} float-end`}
                          onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !isEnrolled);
                          }}
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}

                      {currentUser?.role === "ADMIN" && (
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
            );
          })}
        </Row>
      </div>
    </div>
  );
}
