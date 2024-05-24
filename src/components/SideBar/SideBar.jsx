import { useLocation, useNavigate } from "react-router-dom";
import { LuHome, LuSearch, LuMail, LuBell, LuUser2 } from "react-icons/lu";
import { PiDotsThreeCircle } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";
import Button from "../Button";
import ProfileBox from "../ProfileBox";
import Modal from "./../../modals/Modal";
import AddNewTweet from "../AddNewTweet";
import { useState } from "react";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.pathname;

  const [showPostModal, setShowPostModal] = useState(false);

  return (
    <div className="relative flex h-screen w-fit flex-grow-0 flex-col lg:w-1/5">
      {/* Links */}
      <div className="flex h-full w-full flex-col gap-y-4 border-r border-solid border-gray-200 px-2 pt-4 lg:px-8">
        <div className="text-center text-xl font-semibold text-white">
          <img
            className="mx-auto h-[48px] w-[48px]"
            src="/images/logo.png"
            alt="logo"
          />
        </div>

        {/* Home Button */}
        <Button
          style={`${url === "/home" && "font-semibold"}`}
          beforeElement={<LuHome size={24} />}
          onClick={() => navigate("/home")}
        >
          Home
        </Button>

        {/* Explore Page Button */}
        <Button
          style={`${url === "/explore" && "font-semibold"}`}
          beforeElement={<LuSearch size={24} />}
          onClick={() => alert("Explore feature coming soon")}
        >
          Explore
        </Button>

        {/* Notifications Button */}
        <Button
          style={`${url === "/notifications" && "font-semibold"}`}
          beforeElement={<LuBell size={24} />}
          onClick={() => alert("Notifications feature coming soon")}
        >
          Notifications
        </Button>

        {/* Messages Button */}
        <Button
          style={`${url === "/messages" && "font-semibold"}`}
          beforeElement={<LuMail size={24} />}
          onClick={() => alert("Messages coming soon")}
        >
          Messages
        </Button>

        {/* Profile Button */}
        <Button
          style={`${url === "/profile" && "font-semibold"}`}
          beforeElement={<LuUser2 size={24} />}
          onClick={() => navigate(`/profile/${localStorage.getItem("handle")}`)}
        >
          Profile
        </Button>

        {/* More Options Button */}
        <Button
          onClick={() => alert("More features coming soon")}
          beforeElement={<PiDotsThreeCircle size={24} />}
        >
          More
        </Button>

        {/* Post Button */}
        <Button
          onClick={() => setShowPostModal(true)}
          style="bg-blue-400 hover:bg-blue-600 text-2xl font-semibold justify-center p-0 px-4 py-1"
          beforeElement={<IoIosSend size={24} />}
        >
          Post
        </Button>
      </div>
      {/* Profile Box */}
      <div className="absolute bottom-10 flex w-full justify-center px-1 text-white lg:px-8">
        <ProfileBox
          profilePic={localStorage.getItem("profilePicture")}
          name={localStorage.getItem("name")}
          handle={localStorage.getItem("handle")}
        />
      </div>
      {/* Add new tweet modal */}
      <Modal showModal={showPostModal} setShowModal={setShowPostModal}>
        <AddNewTweet setShowModal={setShowPostModal} />
      </Modal>
    </div>
  );
};

export default SideBar;
