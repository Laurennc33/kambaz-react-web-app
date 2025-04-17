import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const createQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.post(QUIZZES_API, quiz);
  return data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/course/${courseId}`);
  return response.data;
};

export const fetchAllQuizzes = async (courseId?: string) => {
  if (courseId) {
    return findQuizzesForCourse(courseId);
  }
  const { data } = await axiosWithCredentials.get(QUIZZES_API);
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
