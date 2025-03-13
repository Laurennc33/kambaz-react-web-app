import { Routes, Route, Navigate } from "react-router";
import Account from "./account";
import Dashboard from "./dashboard";
import KambazNavigation from "./navigation";
import Courses from "./courses";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./account/protectroute";
import { addCourse, updateCourse, deleteCourse, editCourse } from "./courses/reducer"; // Action imports
import { useState } from "react";

export default function Kambaz() {
  const dispatch = useDispatch();
  const {courses} = useSelector((state: any) => state.courseReducer);
  const [course, setCourse] = useState({_id:"", name:"", description:""})

  return (
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
                  updateCourse={(course: any) => dispatch(updateCourse(course))}
                  addCourse={(course: any) => dispatch(addCourse(course))}
                  deleteCourse={(courseId: string) => dispatch(deleteCourse(courseId))}
                  editCourse={(courseId: string) => dispatch(editCourse(courseId))}
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
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
  );
}
