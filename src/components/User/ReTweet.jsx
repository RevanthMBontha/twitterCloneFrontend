import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoIosSend } from "react-icons/io";
import Button from "../Button";
import { reTweetMfn } from "../../utils/mutationFunctions";
import { toast } from "react-toastify";

const ReTweet = ({
  setShowModal,
  tweetUserName,
  tweetUserHandle,
  tweetUserImage,
  tweetContent,
  tweetImage,
  tweetIdToRepost,
}) => {
  const queryClient = useQueryClient();

  const [tweetDetails, setTweetDetails] = useState({
    isReTweet: true,
    content: "",
  });

  const reTweetMutation = useMutation({
    mutationFn: () => reTweetMfn(tweetIdToRepost, tweetDetails),
    onSettled: () => {
      setTweetDetails({
        isReTweet: true,
        rePostTweetId: tweetIdToRepost,
        content: "",
      });
    },
    onSuccess: () => {
      toast.success("ReTweeted the Tweet!");
      queryClient.invalidateQueries([
        ["tweets"],
        ["profile", localStorage.getItem("handle")],
      ]);
      setShowModal(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!");
    },
  });

  return (
    <div
      className="max-h-[500px] overflow-y-auto p-4 text-white"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Reposter and their reposted Tweet Details */}
      <div onClick={(e) => e.stopPropagation()}>
        {/* Reposter information */}
        <div
          className="flex items-center gap-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            className="h-[54px] w-[54px] rounded-full bg-gray-400"
            src={localStorage.getItem("profilePicture")}
            alt={localStorage.getItem("name")}
          />
          <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
            <span className="font-bold">{localStorage.getItem("name")}</span>
            <span className="text-sm font-thin">
              @{localStorage.getItem("handle")}
            </span>
          </div>
        </div>
        {/* New information added by the person reposting */}
        <div className="m-2" onClick={(e) => e.stopPropagation()}>
          <input
            className="ml-1 h-12 w-full flex-grow appearance-none rounded-full bg-black pl-1 text-lg text-white outline-none"
            type="text"
            name="content"
            id="content"
            placeholder="Add a comment..."
            onClick={(e) => e.stopPropagation()}
            value={tweetDetails.content}
            onChange={(e) =>
              setTweetDetails({ ...tweetDetails, content: e.target.value })
            }
          />
        </div>
      </div>
      {/* Tweet being Reposted */}
      <div
        className="m-4 rounded-xl border border-solid border-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Details of User who tweeted the original tweet */}
        <div className="flex items-center gap-x-2">
          <img
            className="h-[54px] w-[54px] rounded-full bg-gray-400"
            src={tweetUserImage}
            alt={tweetUserName}
          />
          <div className="flex flex-col">
            <span className="font-bold">{tweetUserName}</span>
            <span className="text-sm font-thin">@{tweetUserHandle}</span>
          </div>
        </div>
        {/* Details of the original tweet */}
        <div onClick={(e) => e.stopPropagation()}>
          <p className="mx-2 py-2">{tweetContent}</p>
          <div className="p-2" onClick={(e) => e.stopPropagation()}>
            {tweetImage && (
              <img
                className="mx-auto h-full w-full rounded-xl object-scale-down"
                src={tweetImage}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      {/* Repost Tweet Button */}
      <div
        className="flex items-center justify-end"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          beforeElement={<IoIosSend size={24} />}
          style={`bg-blue-400 w-fit hover:bg-blue-600 text-xl font-semibold justify-center p-0 px-4 py-1`}
          onClick={(e) => {
            e.stopPropagation();
            reTweetMutation.mutate();
          }}
          shouldHideText={false}
        >
          ReTweet
        </Button>
      </div>
    </div>
  );
};

ReTweet.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  tweetUserName: PropTypes.string.isRequired,
  tweetUserHandle: PropTypes.string.isRequired,
  tweetUserImage: PropTypes.string.isRequired,
  tweetContent: PropTypes.string.isRequired,
  tweetImage: PropTypes.string.isRequired,
  tweetIdToRepost: PropTypes.string.isRequired,
};

export default ReTweet;
