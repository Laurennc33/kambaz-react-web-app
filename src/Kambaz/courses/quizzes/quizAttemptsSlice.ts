import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attempts: [],
};

const quizAttemptsSlice = createSlice({
  name: "quizAttempts",
  initialState,
  reducers: {
    saveAttempt: (state, { payload: newAttempt }) => {
      // Remove previous attempt from same student for same quiz
      state.attempts = state.attempts.filter(
        (a: any) => !(a.quizId === newAttempt.quizId && a.studentId === newAttempt.studentId)
      );
      state.attempts.push(newAttempt);
    },
  },
});

export const { saveAttempt } = quizAttemptsSlice.actions;
export default quizAttemptsSlice.reducer;
