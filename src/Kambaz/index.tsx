import { Routes, Route, Navigate } from "react-router";
import Account from "./account";
import Dashboard from "./dashboard";
import KambazNavigation from "./navigation";
import Courses from "./courses";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./account/protectroute";
import { editCourse } from "./courses/reducer"; // Action imports
import { useEffect, useState } from "react";
import Session from "./account/session";
import * as courseClient from "./courses/client";
import * as userClient from "./account/client";

export default function Kambaz() {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<any[]>([]);  // State for courses
  const [course, setCourse] = useState({ _id: "", name: "", description: "" });  // State for a single course
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };
 
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  //const fetchCourses = async () => {
    //try {
      //const courses = await courseClient.fetchAllCourses();
      //setCourses(courses);
    //} catch (error) {
      //console.error(error);
    //}
  //};
  

  const addCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  };

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
                  <Courses
                    courses={courses} 
                  />
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
