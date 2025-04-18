import CourseNavigation from "./navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./modules";
import Home from "./home";
import Assignments from "./assignments";
import Quizzes from "./quizzes";
import QuizDetails from "./quizzes/details"; 
import QuizEditor from "./quizzes/editor"; 
import QuizQuestionsEditor from "./quizzes/quizquestioneditor"; 
import { GiHamburgerMenu } from "react-icons/gi";
import PeopleTable from "./people/table";
import QuizPreview from "./quizzes/previewscreen";

// 🧠 Import the context provider
import { QuizProvider } from "./contexts/QuizContext";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <GiHamburgerMenu className="me-3" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <div className="d-flex">
        <div>
          <CourseNavigation />
        </div>
        <div className="flex-grow-1">
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<Navigate to="Home" />} />

            {/* Pages */}
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<Assignments />} />

            {/* 🧠 Wrap quiz-related routes in QuizProvider */}
            <Route
              path="Quizzes/*"
              element={
                <QuizProvider>
                  <Routes>
                    <Route path="" element={<Quizzes />} />
                    <Route path=":qid" element={<QuizDetails />} />
                    <Route path=":qid/Edit" element={<QuizEditor />} />
                    <Route path=":qid/Questions" element={<QuizQuestionsEditor />} />
                    <Route path=":qid/Preview" element={<QuizPreview />} />
                  </Routes>
                </QuizProvider>
              }
            />

            {/* Other Pages */}
            <Route path="Grades" element={<h3>Grades</h3>} />
            <Route path="Zoom" element={<h3>Zoom</h3>} />
            <Route path="Piazza" element={<h3>Piazza</h3>} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
