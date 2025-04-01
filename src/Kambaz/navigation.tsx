import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { FaInbox, FaBook } from "react-icons/fa";
import { HiBeaker } from "react-icons/hi";
import { BiHelpCircle, BiHistory } from "react-icons/bi";

export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: <AiOutlineDashboard className="fs-1 text-danger" /> },
    { label: "Courses", path: "/Kambaz/Dashboard", icon: <FaBook className="fs-1 text-danger" /> },
    { label: "Calendar", path: "/Kambaz/Calendar", icon: <IoCalendarOutline className="fs-1 text-danger" /> },
    { label: "Inbox", path: "/Kambaz/Inbox", icon: <FaInbox className="fs-1 text-danger" /> },
    { label: "History", path: "/Kambaz/History", icon: <BiHistory className="fs-1 text-danger" /> },
    { label: "Help", path: "/Kambaz/Help", icon: <BiHelpCircle className="fs-1 text-danger" /> },
    { label: "Labs", path: "/Labs", icon: <HiBeaker className="fs-1 text-danger" /> },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern" />
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account"
        className={`text-center border-0 bg-black ${
          pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <IoPersonCircleOutline
          className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`}
        />
        <br />
        Account
      </ListGroup.Item>
      {links.map((link) => (
        <ListGroup.Item
          key={link.path}
          as={Link}
          to={link.path}
          className={`bg-black text-center border-0 
            ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
          {link.icon}
          <br />
          {link.label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
