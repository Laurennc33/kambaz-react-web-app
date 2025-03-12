import { Routes, Route, Navigate } from "react-router";
import Account from "./account";
import Dashboard from "./dashboard";
import KambazNavigation from "./navigation";
import Courses from "./courses";
import "./styles.css";
import * as db from "./database";
import { useState } from "react";
import ProtectedRoute from "./account/protectroute";

export default function Kambaz() {
  const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "RS107",
    name: "New Course",
    number: "New Course Number",
    startDate: "2025-01-6",
    endDate: "2025-04-17",
    department: "Languages",
    credits: 3,
    description: "New Course Description",
  });
  const addCourse = () => {
    console.log("Add new course:", course);
    const newCourse = {...course, _id: "RS" + Math.random().toString()};
    const newCourses = [...courses, newCourse];
    setCourses(newCourses);
  };
  const deleteCourse = (courseId: string) => {
    console.log("Delete course with id: ",courseId);
    const newCourses = courses.filter((course) => course._id !== courseId);  
    setCourses(newCourses);
  };
  const updateCourse = () => {
    const newCourses = courses.map((c) => {
      if (c._id === course._id) {
        return course;
      }
      return c;
    });
    setCourses(newCourses);
  };
  return (
    <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
            <Routes>
                <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route path="/Dashboard" element={<ProtectedRoute><Dashboard updateCourse={updateCourse} addCourse={addCourse} deleteCourse={deleteCourse} courses={courses} course={course} setCourse={setCourse}/></ProtectedRoute>} />
                <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses}/></ProtectedRoute>} />
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
                <Route path="/History" element={<h1>History</h1>} />
                <Route path="/Help" element={<h1>Help</h1>} />
            </Routes> 
        </div>                           
    </div>
  );
}
