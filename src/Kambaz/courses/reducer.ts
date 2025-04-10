import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      const newCourse: any = {
        _id: new Date().getTime().toString(),
        name: course.name,
        number: course.number,
        startDate: course.startDate, 
        endDate: course.endDate,
        department: course.department,
        credits: course.credits,
        description: course.description,
      };

      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c: any) => c._id !== courseId);
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c:any) =>
        c._id === course._id ? {...c,...course } : c
      ) as any;
    },
    editCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : c
      ) as any;
    },
    setCourses: (state, {payload: courses}) => {
      state.courses = courses;
    }
  },
});

export const { addCourse, deleteCourse, updateCourse, editCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
