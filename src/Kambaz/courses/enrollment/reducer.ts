import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../database"; 

const initialState = {
  enrollments: db.enrollments, 
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },

    editEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.map((e) =>
        e._id === enrollmentId ? { ...e, editing: true } : e
      );
    },

    updateEnrollment: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.map((e) =>
        e._id === enrollment._id ? enrollment : e
      );
    },

    deleteEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (e) => e._id !== enrollmentId
      );
    },
  },
});

export const {
  addEnrollment,
  editEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
