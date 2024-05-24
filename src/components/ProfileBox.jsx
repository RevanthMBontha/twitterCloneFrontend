import PropTypes from "prop-types";
import { TbDots } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/helperFunctions";
import { toast } from "react-toastify";

const ProfileBox = ({ profilePic, name, handle }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex w-full cursor-pointer items-center gap-x-2 rounded-full p-2 hover:bg-gray-700"
      onClick={() => {
        logoutUser();
        toast.success("Logged out user successfully!");
        navigate("/login");
      }}
    >
      {/* Profile Image */}
      <div className="h-[48px] w-[48px] flex-grow-0 rounded-full">
        <img
          className="h-full w-full rounded-full bg-gray-200 object-cover"
          src={profilePic}
          alt={name}
        />
      </div>

      {/* Profile Details */}
      <div className="hidden flex-grow lg:block">
        <p className="text-md font-semibold capitalize">{name}</p>
        <p className="text-xs font-thin">@{handle}</p>
      </div>

      {/* More options button */}
      <div className="hidden flex-grow-0 p-2 lg:block">
        <TbDots size={21} />
      </div>
    </div>
  );
};

ProfileBox.propTypes = {
  profilePic: PropTypes.string,
  name: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
};

export default ProfileBox;
