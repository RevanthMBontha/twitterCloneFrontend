import PropTypes from "prop-types";
import { Button, ReTweet, ReplyToTweet } from "../components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { LuDot } from "react-icons/lu";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { MdOutlinePoll } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { toast } from "react-toastify";
import { getDate, getTime } from "../utils/helperFunctions";
import {
  likeTweetMFn,
  dislikeTweetMFn,
  followUserMfn,
  unFollowUserMfn,
  deleteTweetMfn,
} from "../utils/mutationFunctions";
import { getTweetFn } from "../utils/queryFunctions";
import { useNavigate } from "react-router-dom";
import Modal from "../modals/Modal";
import { useState } from "react";

const SingleTweet = ({ id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showReTweetModal, setShowReTweetModal] = useState(false);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tweet", id],
    queryFn: () => getTweetFn(id),
  });

  const likeMutation = useMutation({
    mutationFn: (id) => likeTweetMFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tweet", id]);
      toast.success("Liked tweet!");
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: (id) => dislikeTweetMFn(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tweet", id]);
      toast.success("Disliked tweet!");
    },
  });

  const followMutation = useMutation({
    mutationFn: (handle) => followUserMfn(handle),
    onSuccess: () => {
      queryClient.invalidateQueries(["tweet", id]);
      toast.success(`Followed ${data?.tweet?.tweetedBy?.username}!`);
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: (handle) => unFollowUserMfn(handle),
    onSuccess: () => {
      queryClient.invalidateQueries(["tweet", id]);
      toast.success(`Unfollowed ${data?.tweet?.tweetedBy?.username}!`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTweetMfn(id),
    onSettled: () => {
      queryClient.invalidateQueries([
        ["tweets"],
        ["profile", localStorage.getItem("handle")],
      ]);
    },
    onSuccess: () => {
      toast.success("Deleted the tweet!");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!");
    },
  });

  if (isPending) return <div className="text-white">Loading...</div>;

  if (isError) return <div className="text-white">{error.message}</div>;

  return (
    <div
      className="w-full cursor-pointer border-b border-solid border-gray-600 px-2 pt-2 hover:bg-gray-900"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/tweet/${id}`);
      }}
    >
      {/* Tweet User Details */}
      <div className="flex items-center justify-between">
        <div className="flex w-fit gap-x-2">
          <img
            className="h-[54px] w-[54px] rounded-full bg-gray-500 object-contain"
            src={data?.tweet?.tweetedBy?.profilePicture}
            alt="profile"
          />
          <div className="flex flex-col">
            <span className="font-bold capitalize text-white">
              {data?.tweet?.tweetedBy?.name}
            </span>
            <span
              className="cursor-pointer text-sm font-thin lowercase text-white hover:text-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${data?.tweet?.tweetedBy?.username}`);
              }}
            >
              @{data?.tweet?.tweetedBy?.username}
            </span>
          </div>
        </div>
        <div className="w-fit">
          {data?.tweet?.tweetedBy?._id === localStorage.getItem("id") ? (
            ""
          ) : data?.tweet?.tweetedBy?.followers.includes(
              localStorage.getItem("id"),
            ) ? (
            <Button
              style="border-white border border-solid text-lg"
              beforeElement={<AiOutlineUserDelete size={24} />}
              onClick={(e) => {
                e.stopPropagation();
                unFollowMutation.mutate(data?.tweet?.tweetedBy?.username);
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              style="border-white border border-solid text-lg"
              beforeElement={<AiOutlineUserAdd size={24} />}
              onClick={(e) => {
                e.stopPropagation();
                followMutation.mutate(data?.tweet?.tweetedBy?.username);
              }}
            >
              Follow
            </Button>
          )}
        </div>
      </div>

      {/* Tweet Content */}
      <div className="my-2 px-12">
        <p className="text-white">{data?.tweet?.content}</p>
      </div>

      {/* Tweet Image if any */}
      {data?.tweet?.image && (
        <div className="mx-auto my-2 flex h-fit w-4/5 items-center justify-center py-2 lg:px-8">
          <img
            className="rounded-md object-cover"
            src={data?.tweet?.image}
            alt=""
          />
        </div>
      )}

      {/* If ReTweet, display the original Tweet */}
      {data?.tweet?.isReTweet && (
        <div
          className="m-4 rounded-xl border border-solid border-white bg-black p-4 text-white hover:bg-gray-900"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/tweet/${data?.tweet?.rePostTweet?._id}`);
          }}
        >
          {/* Details of User who tweeted the original tweet */}
          <div className="flex items-center gap-x-2">
            <img
              className="h-[54px] w-[54px] rounded-full bg-gray-400"
              src={data?.tweet?.rePostTweet?.tweetedBy?.profilePicture}
              alt={data?.tweet?.rePostTweet?.tweetedBy?.name}
            />
            <div className="flex flex-col">
              <span className="font-bold">
                {data?.tweet?.rePostTweet?.tweetedBy?.name}
              </span>
              <span className="text-sm font-thin">
                @{data?.tweet?.rePostTweet?.tweetedBy?.username}
              </span>
            </div>
          </div>
          {/* Details of the original tweet */}
          <div>
            <p className="mx-2 py-2">{data?.tweet?.rePostTweet?.content}</p>
            <div className="p-2">
              {data?.tweet?.rePostTweet?.image && (
                <img
                  className="mx-auto h-full w-full rounded-xl object-scale-down"
                  src={data?.tweet?.rePostTweet?.image}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Date Time Extended */}
      <div>
        <p className="my-2 flex items-center px-12 text-sm text-gray-400">
          {`${getTime(data?.tweet?.createdAt)}`} <LuDot />{" "}
          {`${getDate(data?.tweet?.createdAt)}`}
        </p>
      </div>

      {/* Tweet Action Buttons */}
      <div className="mt-4 flex w-full cursor-pointer justify-evenly border-t border-solid border-gray-600 py-4 text-white">
        {/* Replies Button */}
        <div
          className="flex items-center gap-x-1"
          onClick={(e) => {
            e.stopPropagation();
            setShowReplyModal(true);
          }}
        >
          <span>
            <FaRegComment size={21} />
          </span>
          <span>{data?.tweet?.replies?.length}</span>
        </div>

        {/* Reposts Button */}
        <div
          className="flex items-center gap-x-1"
          onClick={(e) => {
            e.stopPropagation();
            setShowReTweetModal(true);
          }}
        >
          <span>
            <BiRepost size={24} />
          </span>
          <span>{data?.tweet?.reTweetBy?.length}</span>
        </div>

        {/* Likes Button */}
        <div
          className="flex items-center gap-x-1"
          onClick={
            data?.tweet?.likes.includes(localStorage.getItem("id"))
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
            {data?.tweet?.likes.includes(localStorage.getItem("id")) ? (
              <IoHeart size={21} />
            ) : (
              <IoHeartOutline size={21} />
            )}
          </span>
          <span>{data?.tweet?.likes?.length}</span>
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

        {/* Delete Tweet Buttons */}
        {data?.tweet?.tweetedBy?._id === localStorage.getItem("id") && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              deleteMutation.mutate(id);
            }}
          >
            <HiOutlineTrash size={20} />
          </span>
        )}
      </div>

      {/* Modal to show Reply to tweet */}
      <Modal showModal={showReplyModal} setShowModal={setShowReplyModal}>
        <ReplyToTweet
          setShowModal={setShowReplyModal}
          profileImage={data?.tweet?.tweetedBy?.profilePicture}
          profileName={data?.tweet?.tweetedBy?.name}
          profileHandle={data?.tweet?.tweetedBy?.username}
          tweetContent={data?.tweet?.content}
          tweetIdToReply={data?.tweet?._id}
        />
      </Modal>
      <Modal showModal={showReTweetModal} setShowModal={setShowReTweetModal}>
        <ReTweet
          setShowModal={setShowReTweetModal}
          tweetUserName={data?.tweet?.tweetedBy?.name}
          tweetUserHandle={data?.tweet?.tweetedBy?.username}
          tweetUserImage={data?.tweet?.tweetedBy?.profilePicture}
          tweetContent={data?.tweet?.content}
          tweetImage={data?.tweet?.image}
          tweetIdToRepost={data?.tweet?._id}
        />
      </Modal>
    </div>
  );
};

SingleTweet.propTypes = {
  id: PropTypes.string.isRequired,
  showActionButtons: PropTypes.bool,
  isRetweet: PropTypes.bool,
};

SingleTweet.defaultProps = {
  showActionButtons: true,
  isRetweet: false,
};

export default SingleTweet;
