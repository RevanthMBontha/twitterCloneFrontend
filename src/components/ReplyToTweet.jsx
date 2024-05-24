import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline, IoIosSend } from "react-icons/io";
import { LuImage } from "react-icons/lu";
import { toast } from "react-toastify";
import { Button } from "./../components";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replyToTweetMFn } from "../utils/mutationFunctions";

const ReplyToTweet = ({
  setShowModal,
  profileImage,
  profileName,
  profileHandle,
  tweetContent,
  tweetIdToReply,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [tweetDetails, setTweetDetails] = useState({
    thisTweetImage: "",
    thisTweetContent: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  //   Handle Add Image button click
  const handleButtonClick = () => {
    inputRef.current.click();
  };

  //   Handle adding a image to the reply
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

    setTweetDetails({ ...tweetDetails, thisTweetImage: file });
  };

  //   Handle removing the image from the reply
  const handleDeleteSelectedImage = () => {
    setSelectedImage(null);
  };

  //   Mutation to reply to the Tweet
  const replyMutation = useMutation({
    mutationFn: () => {
      replyToTweetMFn(tweetIdToReply, tweetDetails);
    },
    onSettled: () => {
      setShowModal(false);
      setTweetDetails({ thisTweetContent: "", thisTweetImage: "" });
    },
    onSuccess: () => {
      toast.success("Replied to the tweet");
      queryClient.invalidateQueries([["tweet", tweetIdToReply], "tweets"]);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!");
    },
  });

  return (
    <div className="flex flex-col gap-y-8">
      {/* Tweet being replied to */}
      <div>
        {/* Tweeted By details */}
        <div className="flex items-center justify-start gap-x-2">
          <img
            className="h-[54px] w-[54px] rounded-full bg-gray-400"
            src={profileImage}
            alt="profile"
          />
          <div className="flex flex-col">
            <span className="font-bold capitalize text-white">
              {profileName}
            </span>
            <span
              className="cursor-pointer text-sm font-thin text-gray-200 hover:text-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${profileHandle}`);
              }}
            >
              @{profileHandle}
            </span>
          </div>
        </div>
        {/* Tweet details */}
        <div className="mx-12 my-2">
          <p className="text-white">{tweetContent}</p>
        </div>
        {/* Replying to text */}
        <div className="mx-16 my-2">
          <p className="text-white">
            Replying to{" "}
            <span
              className="cursor-pointer text-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${profileHandle}`);
              }}
            >
              @{profileHandle}
            </span>
          </p>
        </div>
      </div>

      {/* Show details for the tweet being created */}
      <div>
        {/* Tweeted By details */}
        <div className="flex items-center justify-start gap-x-2">
          <img
            className="h-[54px] w-[54px] rounded-full bg-gray-400"
            src={localStorage.getItem("profilePicture")}
            alt=""
          />
          <div className="flex flex-col">
            <span className="font-bold capitalize text-white">
              {localStorage.getItem("name")}
            </span>
            <span className="cursor-pointer text-sm font-thin text-gray-200 hover:text-blue-400">
              @{localStorage.getItem("handle")}
            </span>
          </div>
        </div>

        {/* Tweet details */}
        <div className="mx-12">
          <input
            className="ml-1 h-12 w-full flex-grow appearance-none rounded-full bg-black pl-1 text-lg text-white outline-none"
            type="text"
            name="replyTweet"
            id="replyTweet"
            placeholder="Reply to the post..."
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setTweetDetails({
                ...tweetDetails,
                thisTweetContent: e.target.value,
              })
            }
          />
        </div>

        {/* Display image if any */}
        {selectedImage && (
          <div className="relative mx-auto h-fit w-full rounded-md border-2 border-solid border-white p-4">
            <img
              className="mx-auto h-fit w-full max-w-xl rounded-md object-scale-down"
              src={selectedImage}
              alt="this is a test"
            />
            <Button
              style="absolute top-0 right-0 w-fit"
              shouldHideText={false}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteSelectedImage();
              }}
            >
              <IoIosCloseCircleOutline />
            </Button>
          </div>
        )}

        {/* Tweet image add button */}
        <div className="mt-4 flex w-full items-center justify-between px-6">
          <div>
            <button
              className="cursor-pointer text-blue-400 hover:text-blue-600"
              htmlFor="image"
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick();
              }}
            >
              <LuImage size={24} />
            </button>
            <input
              ref={inputRef}
              className="invisible w-0"
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>

      {/* Tweet Action Buttons */}
      <div className="flex items-center justify-end">
        <Button
          beforeElement={<IoIosSend size={24} />}
          style={`bg-blue-400 w-fit hover:bg-blue-600 text-xl font-semibold justify-center p-0 px-4 py-1`}
          onClick={(e) => {
            e.stopPropagation();
            replyMutation.mutate();
          }}
          shouldHideText={false}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

ReplyToTweet.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  profileName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  profileHandle: PropTypes.string.isRequired,
  tweetContent: PropTypes.string.isRequired,
  tweetIdToReply: PropTypes.string.isRequired,
};

export default ReplyToTweet;
