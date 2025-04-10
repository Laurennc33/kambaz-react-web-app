import { Link } from "react-router-dom";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addEnrollment, deleteEnrollment, setEnrollments } from "./courses/enrollment/reducer";
import React, { useEffect } from "react";
import * as courseClient from "./courses/client";
import * as enrollmentClient from "./courses/enrollment/client";
import { setCourses } from "./courses/reducer";


export default function Dashboard(
  {
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

  const getAllCourses = async () => {
    const courses = await courseClient.fetchAllCourses();
    dispatch(setCourses(courses));
  }
  useEffect(() => {
    getAllCourses();
  }, []);


  const getUserEnrollments = async () => {
    if (currentUser) {
      try {
        const userEnrollments = await enrollmentClient.getUserEnrollments(currentUser._id);
        dispatch(setEnrollments(userEnrollments));
      } catch (error) {
        console.error("Error fetching user enrollments:", error);
      }
    }
  };

  useEffect(() => {
    getAllCourses();
    getUserEnrollments();
  }, [currentUser]);


  // Handle user enrollment
  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
      dispatch(addEnrollment({ user: currentUser._id, course: courseId }));
      getUserEnrollments(); // Refresh enrollments after action
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  // Handle user unenrollment
  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
      dispatch(deleteEnrollment({ user: currentUser._id, course: courseId }));
      getUserEnrollments(); // Refresh enrollments after action
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };


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

                      {enrollments.some(
                        (enrollment: { user: string; course: string; _id: string }) =>
                          enrollment.user === currentUser._id &&
                          enrollment.course === course._id
                      ) ? (
                        <Button
                          variant="danger"
                          onClick={() =>
                          handleUnenroll(course._id)}
                          className="float-end"
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() =>
                            handleEnroll(
                              course._id)}
                          className="float-end"
                        >
                          Enroll
                        </Button>
                      )}

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
