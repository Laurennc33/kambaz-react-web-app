import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
    _id: string;
    type: string;
    question: string;
    points: number;
    options: string[];
    correctAnswer: string;
    fillInTheBlankAnswers: { text: string; isCorrect: boolean }[];
}

export interface Quiz {
    _id: string;
    course: string;
    title: string;
    description: string;
    type: "Graded Quiz" | "Practice Quiz" | "Exam";
    assignmentGroup: "Assignments" | "Quizzes" | "Exams";
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: string | null;
    availableDate: string | null;
    untilDate: string | null;
    questions: Question[];
    points: number;
    editing?: boolean;
}

const initialState = {
    quizzes: [] as Quiz[],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, { payload }: PayloadAction<Quiz[]>) => {
            state.quizzes = payload;
        },
        addQuiz: (state, { payload }: PayloadAction<Quiz>) => {
            state.quizzes.push(payload);
        },
        deleteQuiz: (state, { payload }: PayloadAction<string>) => {
            state.quizzes = state.quizzes.filter((q) => q._id !== payload);
        },
        updateQuiz: (state, { payload }: PayloadAction<Quiz>) => {
            state.quizzes = state.quizzes.map((q) =>
                q._id === payload._id ? payload : q
            );
        },
        addQuestionToQuiz: (
            state,
            { payload }: PayloadAction<{ quizId: string; question: Question }>
        ) => {
            console.log('Adding question:', payload); // Log to verify payload
            state.quizzes = state.quizzes.map((quiz) =>
                quiz._id === payload.quizId
                    ? { ...quiz, questions: [...quiz.questions, payload.question] }
                    : quiz
            );
        },

        updateQuestionInQuiz: (
            state,
            {
                payload,
            }: PayloadAction<{
                quizId: string;
                questionId: string;
                updatedQuestion: Question;
            }>
        ) => {
            state.quizzes = state.quizzes.map((quiz) =>
                quiz._id === payload.quizId
                    ? {
                        ...quiz,
                        questions: quiz.questions.map((q) =>
                            q._id === payload.questionId ? payload.updatedQuestion : q
                        ),
                    }
                    : quiz
            );
        },
        deleteQuestionFromQuiz: (
            state,
            {
                payload,
            }: PayloadAction<{ quizId: string; questionId: string }>
        ) => {
            state.quizzes = state.quizzes.map((quiz) =>
                quiz._id === payload.quizId
                    ? {
                        ...quiz,
                        questions: quiz.questions.filter(
                            (q) => q._id !== payload.questionId
                        ),
                    }
                    : quiz
            );
        },
        editQuiz: (state, { payload }: PayloadAction<string>) => {
            state.quizzes = state.quizzes.map((quiz) =>
                quiz._id === payload ? { ...quiz, editing: true } : quiz
            );
        },
    },
});

export const {
    setQuizzes,
    addQuiz,
    deleteQuiz,
    updateQuiz,
    addQuestionToQuiz,
    updateQuestionInQuiz,
    deleteQuestionFromQuiz,
    editQuiz,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
