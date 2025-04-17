import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import * as courseClient from "./courses/client";
import { setCourses } from "./courses/reducer";
import { fetchEnrollments } from "./courses/enrollment/client";
import { setEnrollments } from "./courses/enrollment/reducer";

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
  courses: { _id: string; name: string; description: string }[];
  course: { _id: string; name: string; description: string };
  setCourse: (course: { _id: string; name: string; description: string }) => void;
  addCourse: (course: { _id: string; name: string; description: string }) => void;
  deleteCourse: (courseId: string) => void;
  editCourse: (courseId: string) => void;
  updateCourse: (course: { _id: string; name: string; description: string }) => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  const getAllCourses = async () => {
    const courses = await courseClient.fetchAllCourses();
    dispatch(setCourses(courses));
  };

  const getEnrollments = async () => {
    if (!currentUser?._id) return;
    try {
      const enrollments = await fetchEnrollments(currentUser._id);
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  useEffect(() => {
    getAllCourses();
    getEnrollments();
  }, [currentUser]);

  const enrolledCourses = currentUser
    ? courses.filter((course) =>
      enrollments.some(
        (enrollment: { user: string; course: string }) =>
          enrollment.user === currentUser._id && enrollment.course === course._id
      )
    )
    : [];

  const handleEnrollment = (courseId: string, isEnrolled: boolean) => {
    updateEnrollment(courseId, !isEnrolled);
    navigate(`/Kambaz/Courses/${courseId}/Home`);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <div className="float-end">
          <button
            onClick={() => setEnrolling(true)}
            className={`btn btn-outline-primary me-2 ${enrolling ? "active" : ""}`}
          >
            All Courses
          </button>
          <button
            onClick={() => setEnrolling(false)}
            className={`btn btn-outline-primary ${!enrolling ? "active" : ""}`}
          >
            My Courses
          </button>
        </div>
      </h1>
      <hr />

      {currentUser && currentUser.role === "ADMIN" && (
        <>
          <h2>Course Editor</h2>
          <Button variant="success" onClick={() => updateCourse(course)} className="float-end">
            Update Course
          </Button>
          <Button onClick={() => addCourse(course)} className="float-end me-2">
            Add New Course
          </Button>
          <FormControl
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            value={course.name}
          />
          <FormControl
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            value={course.description}
          />
          <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
          <hr />
        </>
      )}

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {/* Show all courses when enrolling is true, else show enrolled courses */}
          {(enrolling ? courses : enrolledCourses).map((course) => {
            const isEnrolled = enrollments.some(
              (enrollment: { user: string; course: string }) =>
                enrollment.user === currentUser._id && enrollment.course === course._id
            );

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

                      {/* Show Enroll/Unenroll button based on user's enrollment status */}
                      {enrolling && !isEnrolled && (
                        <button
                          className="btn btn-success float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            handleEnrollment(course._id, false); // Enroll
                          }}
                        >
                          Enroll
                        </button>
                      )}

                      {!enrolling && isEnrolled && (
                        <button
                          className="btn btn-danger float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            handleEnrollment(course._id, true); // Unenroll
                          }}
                        >
                          Unenroll
                        </button>
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
            );
          })}
        </Row>
      </div>
    </div>
  );
}
