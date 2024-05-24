import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dislikeTweetMFn, likeTweetMFn } from "../utils/mutationFunctions";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { MdOutlinePoll } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const Tweet = ({
  id,
  profileImg,
  profileName,
  profileHandle,
  tweetContent,
  tweetImg,
  replies,
  likes,
  reTweets,
  isLiked,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handle = location.pathname.split("/")[2];

  const likeMutation = useMutation({
    mutationFn: (id) => likeTweetMFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets"]);
      if (handle) queryClient.invalidateQueries([["profile", handle]]);
      toast.success("Liked tweet!");
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: (id) => dislikeTweetMFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets"]);
      if (handle) queryClient.invalidateQueries([["profile", handle]]);
      toast.success("Disliked tweet!");
    },
  });

  return (
    <div
      id={id}
      className="w-full cursor-pointer border-b border-solid border-white p-2 hover:bg-gray-900"
      onClick={() => navigate(`/tweet/${id}`)}
    >
      {/* Container for profile image, name, handle, and tweet content */}
      <div className="my-2 flex items-center gap-x-4">
        <div className="flex-grow-0">
          <img
            className="h-[54px] w-[54px] rounded-full bg-white"
            src={profileImg}
            alt={profileName}
          />
        </div>
        <div className="flex flex-grow items-center">
          <div className="flex flex-col">
            <span className="font-bold capitalize">{profileName}</span>
            <span
              className="cursor-pointer text-sm font-thin  hover:text-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${profileHandle}`);
              }}
            >
              @{profileHandle}
            </span>
          </div>
        </div>
      </div>

      {/* Container for Tweet Content */}
      <div className="my-2 px-12">
        <p>{tweetContent}</p>
      </div>

      {/* Container for Tweet Image if any */}
      {tweetImg && (
        <div className=" my-2 flex h-fit w-full items-center justify-center px-8 py-2">
          <img
            className="h-fit w-fit max-w-xl rounded-md"
            src={tweetImg}
            alt={tweetContent}
          />
        </div>
      )}

      {/* Container for Reposted Tweet */}
      {/* TODO: Add the container for tweet when reposting  */}

      {/* Container for Tweet action buttons */}
      <div className="mt-8 flex w-full cursor-pointer justify-between px-12">
        {/* Replies Button */}
        <div
          className="flex items-center gap-x-1"
          onClick={(e) => {
            e.stopPropagation();
            alert("Reply to Tweet");
          }}
        >
          <span>
            <FaRegComment size={21} />
          </span>
          <span>{replies}</span>
        </div>

        {/* Reposts Button */}
        <div
          className="flex items-center gap-x-1"
          onClick={(e) => {
            e.stopPropagation();
            alert("Repost Tweet");
          }}
        >
          <span>
            <BiRepost size={24} />
          </span>
          <span>{reTweets}</span>
        </div>

        {/* Likes Button */}
        <div
          className="flex items-center gap-x-1"
          onClick={
            isLiked
              ? (e) => {
                  e.stopPropagation();
                  dislikeMutation.mutate(id);
                }
              : (e) => {
                  e.stopPropagation();
                  likeMutation.mutate(id);
                }
          }
        >
          <span>
            {isLiked > 0 ? <IoHeart size={21} /> : <IoHeartOutline size={21} />}
          </span>
          <span>{likes}</span>
        </div>

        {/* Poll Button */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            alert("Check Poll");
          }}
        >
          <MdOutlinePoll size={21} />
        </span>

        {/* Bookmark and Share Tweet Buttons */}
        <span className="flex items-center gap-x-1">
          <span
            onClick={(e) => {
              e.stopPropagation();
              alert("Bookmark Tweet");
            }}
          >
            <FaRegBookmark size={20} />
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              alert("Share Tweet");
            }}
          >
            <IoShareOutline size={20} />
          </span>
        </span>
      </div>
    </div>
  );
};

Tweet.propTypes = {
  id: PropTypes.string.isRequired,
  profileImg: PropTypes.string,
  profileName: PropTypes.string.isRequired,
  profileHandle: PropTypes.string.isRequired,
  tweetContent: PropTypes.string.isRequired,
  tweetImg: PropTypes.string,
  replies: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  reTweets: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
};

Tweet.defaultProps = {
  tweetImg: "",
};

export default Tweet;
