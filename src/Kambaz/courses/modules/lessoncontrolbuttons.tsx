import { IoEllipsisVertical }
  from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
  

export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <FaCheckCircle className="text-success"/>
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
