import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// Enroll a User in a Course
export const enrollUserInCourse = async (userId: string, courseId: string) => {
    const response = await axios.post(`${ENROLLMENTS_API}/enroll`, { userId, courseId });
    return response.data;  // Assuming the server sends a success message
};
  
  // Unenroll a User from a Course
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
    const response = await axios.post(`${ENROLLMENTS_API}/unenroll`, { userId, courseId });
    return response.data;  // Assuming the server sends a success message
};

export const getUserEnrollments = async (userId: string) => {
    try {
        const { data } = await axios.get(`${ENROLLMENTS_API}/${userId}`);
        return data;
    } catch (error) {
        console.error("Error fetching user enrollments:", error);
        throw error;
    }
};
