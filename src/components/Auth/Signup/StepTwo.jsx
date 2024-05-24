import PropTypes from "prop-types";
import { useRef, useState } from "react";

const StepTwo = ({ userDetails, setUserDetails }) => {
  const inputRef = useRef(null);

  const [image, setImage] = useState(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    setUserDetails({ ...userDetails, profilePicture: file });
  };

  return (
    <div className="flex w-full flex-col gap-y-8">
      {/* Profile picture */}
      <div className=" w-full px-4">
        <label className="block w-full text-white" htmlFor="profilePicture">
          Profile Picture
        </label>
        {/* Image and Button */}
        <div className="flex rounded-md border border-solid border-white p-4">
          <div className="flex w-1/2">
            <img
              className="h-[96px] w-[96px] rounded-full bg-gray-300"
              src={image}
              alt={userDetails.name}
            />
          </div>
          <div className="flex w-1/2 items-center justify-center">
            <button
              onClick={handleButtonClick}
              className="w-full rounded-full border border-solid border-white py-2 text-lg font-semibold text-white hover:bg-gray-600"
            >
              Upload image
            </button>
            <input
              ref={inputRef}
              className="invisible w-0"
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      {/* Location */}
      <div className="w-full px-4">
        <label className="block text-white" htmlFor="location">
          Location
        </label>
        <input
          name="location"
          className="w-full rounded-md py-1 pl-1 text-black"
          type="text"
          value={userDetails.location}
          onChange={(e) =>
            setUserDetails({ ...userDetails, location: e.target.value })
          }
        />
      </div>
    </div>
  );
};

StepTwo.propTypes = {
  userDetails: PropTypes.object.isRequired,
  setUserDetails: PropTypes.func.isRequired,
};

export default StepTwo;
