import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButtons({ 
    assignmentId, 
    deleteAssignment, 
}: { 
    assignmentId: string; 
    deleteAssignment: (assignmentId: string) => void; 
} ) {
  return (
    <div className="float-end">
        <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)}/>
        <BsPlus className="fs-1" />
        <IoEllipsisVertical className="fs-4" />
    </div> );}