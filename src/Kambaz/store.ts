import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./courses/modules/reducer";
import accountReducer from "./account/reducer";
import assignmentReducer from "./courses/assignments/reducer";
import courseReducer from "./courses/reducer";
import enrollmentReducer from "./courses/enrollment/reducer";
import quizzesReducer from "./courses/quizzes/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    courseReducer,
    enrollmentReducer,
    quizzesReducer,
  },
});
export default store;

