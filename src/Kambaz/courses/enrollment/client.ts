import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;


export const enrollUserInCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${ENROLLMENTS_API}/enroll`, { userId, courseId });
    console.log("Error")
    return response.data;  
};
  
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${ENROLLMENTS_API}/unenroll`, { userId, courseId });
    console.log("Error")
    return response.data;  
};


