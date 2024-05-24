import PropTypes from "prop-types";
import Button from "../Button";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editUserProfileMFn } from "../../utils/mutationFunctions";

const EditUserProfile = ({ setShowModal, name, profilePicture, location }) => {
  const inputRef = useRef(null);
  const handle = localStorage.getItem("handle");
  const queryClient = useQueryClient();

  const [updatedUserDetails, setUpdatedUserDetails] = useState({});

  const [selectedImage, setSelectedImage] = useState(profilePicture);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => setSelectedImage(reader.result);

    if (file) {
      reader.readAsDataURL(file);
    }

    setUpdatedUserDetails({ ...updatedUserDetails, profilePicture: file });
  };

  const handleUpdateUserProfile = (e) => {
    e.stopPropagation();
    console.log(updatedUserDetails);
    updateUserMutation.mutate();
  };

  const updateUserMutation = useMutation({
    mutationFn: () => editUserProfileMFn(updatedUserDetails),
    onSettled: () => {
      setUpdatedUserDetails({});
    },
    onSuccess: (response) => {
      console.log(response);
      toast.success("Updated User Profile");
      localStorage.setItem("profilePicture", response.user.profilePicture);
      queryClient.invalidateQueries(["profile", handle]);
      setShowModal(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!");
    },
  });
  return (
    <div className="p-2 text-white">
      <h1 className="mb-6 text-center text-lg font-bold">Edit Profile</h1>
      {/* Container for Edit Columns */}
      <div className="mb-6 flex flex-col gap-y-4">
        {/* Edit Name */}
        <div className="p-2">
          <label className="ml-3 block" htmlFor="name">
            Name:
          </label>
          <input
            name="name"
            className="h-12 w-full rounded-full border border-solid border-white bg-black pl-1"
            type="text"
            value={
              Object.prototype.hasOwnProperty.call(updatedUserDetails, "name")
                ? updatedUserDetails.name
                : name
            }
            onChange={(e) =>
              setUpdatedUserDetails({
                ...updatedUserDetails,
                name: e.target.value,
              })
            }
          />
        </div>

        {/* Edit Profile Picture */}
        <div className="p-2">
          <label className="mb-2 ml-3 block" htmlFor="profilePicture">
            Profile Picture:
          </label>
          <div className="flex justify-between rounded-md border border-solid border-white p-4">
            <img
              className="h-[54px] w-[54px] rounded-full"
              src={selectedImage}
              alt={name}
            />
            <Button
              shouldHideText={false}
              style="w-fit bg-blue-400 hover:bg-blue-600"
              onClick={handleButtonClick}
            >
              Upload New Picture
            </Button>
            <input
              ref={inputRef}
              className="hidden w-0"
              type="file"
              name="profilePicture"
              id="profilePicture"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Edit Location */}
        <div className="p-2">
          <label className="ml-3 block" htmlFor="location">
            Located In:
          </label>
          <input
            name="location"
            className="h-12 w-full rounded-full border border-solid border-white bg-black pl-1"
            type="text"
            value={
              Object.prototype.hasOwnProperty.call(
                updatedUserDetails,
                "location",
              )
                ? updatedUserDetails.location
                : location
            }
            onChange={(e) =>
              setUpdatedUserDetails({
                ...updatedUserDetails,
                location: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          style="w-fit bg-blue-400 hover:bg-blue-600"
          onClick={handleUpdateUserProfile}
          shouldHideText={false}
          disabled={Object.keys(updatedUserDetails).length === 0}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

EditUserProfile.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  profilePicture: PropTypes.string,
  location: PropTypes.string,
};

export default EditUserProfile;
