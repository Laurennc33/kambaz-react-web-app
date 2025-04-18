import { Routes, Route, Navigate } from "react-router";
import Account from "./account";
import Dashboard from "./dashboard";
import KambazNavigation from "./navigation";
import Courses from "./courses";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./account/protectroute";
import { setCourses, editCourse } from "./courses/reducer";
import { useEffect, useState } from "react";
import Session from "./account/session";
import * as courseClient from "./courses/client";
import * as userClient from "./account/client";
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


export default function Kambaz() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: any) => state.courseReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [course, setCourse] = useState({ _id: "", name: "", description: "" });
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
      const mergedCourses = allCourses.map((course: any) => ({
        ...course,
        enrolled: enrolledCourses.some((enrolled: any) => enrolled._id === course._id),
      }));
      dispatch(setCourses(mergedCourses));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
      fetchCourses();
    } catch (error: any) {
      const message = error?.response?.data || error?.message || "Unknown error";
      alert(`Failed to update enrollment: ${message}`);
    }
  };

  const addCourse = async () => {
    try {
      const newCourse = await courseClient.createCourse(course);
      fetchCourses(); // Refresh courses after adding
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      fetchCourses(); // Refresh courses after deletion
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      fetchCourses(); // Refresh courses after update
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchCourses();
    }
  }, [currentUser, enrolling]);

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addCourse={addCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                    editCourse={(courseId: string) => dispatch(editCourse(courseId))}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
            <Route path="/History" element={<h1>History</h1>} />
            <Route path="/Help" element={<h1>Help</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
