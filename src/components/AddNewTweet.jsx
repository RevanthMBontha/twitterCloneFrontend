import { useState, useRef } from "react";
import { LuImage } from "react-icons/lu";
import { IoIosCloseCircleOutline, IoIosSend } from "react-icons/io";
import PropTypes from "prop-types";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewTweetMFn } from "../utils/mutationFunctions";
import { toast } from "react-toastify";

const AddNewTweet = ({ setShowModal }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [tweetDetails, setTweetDetails] = useState({
    tweetContent: "",
    tweetImage: null,
  });

  const inputRef = useRef(null);

  const queryClient = useQueryClient();

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file && file.type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file");
    }

    setTweetDetails({ ...tweetDetails, tweetImage: file });
  };

  const handleDeleteSelectedImage = () => {
    setSelectedImage(null);
  };

  const { mutate, loading } = useMutation({
    mutationFn: (tweetData) => addNewTweetMFn(tweetData),
    onSettled: () => {
      setTweetDetails({
        tweetContent: "",
        tweetImage: null,
      });
    },
    onSuccess: () => {
      setShowModal(false);
      toast.success("Successfully posted the tweet");

      setSelectedImage(null);
      queryClient.invalidateQueries([
        ["profile", localStorage.getItem("handle")],
        "tweets",
      ]);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!");
    },
  });

  return (
    <div className="flex flex-col gap-y-4 p-2 px-4 pt-8">
      {/* Profile image and Tweet text */}
      <div className="flex h-fit">
        {/* Profile Image */}
        <img
          className="h-[48px] w-[48px] rounded-full bg-gray-400"
          src={localStorage.getItem("profilePicture")}
          alt={localStorage.getItem("handle")}
        />

        {/* Add Tweet Text */}
        <input
          className="ml-1 h-12 w-full appearance-none rounded-full bg-black pl-1 text-lg text-white outline-none"
          placeholder="What is happening?"
          type="text"
          name="addTweet"
          id="addTweet"
          value={tweetDetails.tweetContent}
          onChange={(e) =>
            setTweetDetails({ ...tweetDetails, tweetContent: e.target.value })
          }
        />
      </div>

      {/* Display image if any */}
      {selectedImage && (
        <div className="mx-auto my-2 flex h-fit w-4/5 items-center justify-center py-2 lg:px-8">
          <img
            className="rounded-md object-cover"
            src={selectedImage}
            alt="this is a test"
          />
          <Button
            style="absolute top-0 right-0 w-fit"
            shouldHideText={false}
            onClick={handleDeleteSelectedImage}
          >
            <IoIosCloseCircleOutline />
          </Button>
        </div>
      )}
      {/* Icon List and Post Button */}
      <div className="flex items-end justify-between">
        {/* Icon List */}
        <div>
          {/* Image Upload Icon */}
          <div>
            <button
              className="cursor-pointer text-blue-400 hover:text-blue-600"
              htmlFor="image"
              onClick={handleButtonClick}
            >
              <LuImage size={24} />
            </button>
            <input
              ref={inputRef}
              className="invisible w-0"
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          {/* Gif Button ? */}
        </div>

        {/* Post Button */}
        <div>
          <Button
            beforeElement={<IoIosSend size={24} />}
            style={`${loading ? "text-red-400" : "text-white"} bg-blue-400 hover:bg-blue-600 text-xl font-semibold justify-center p-0 px-4 py-1`}
            onClick={() => mutate(tweetDetails)}
            shouldHideText={false}
            disabled={loading}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

AddNewTweet.propTypes = {
  setShowModal: PropTypes.func,
};

AddNewTweet.defaultProps = {
  setShowModal: () => {
    console.log("Testing");
  },
};

export default AddNewTweet;
