/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IoArrowBackSharp, IoCalendarNumberOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { GoLocation } from "react-icons/go";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import {
  Button,
  EditUserProfile,
  Suggestions,
  TweetsByUser,
  UserLikedTweets,
  UserReplies,
} from "../components";
import {
  checkUserLoggedIn,
  logoutUser,
  getJoiningMonth,
} from "../utils/helperFunctions";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import { getTweetsByUserFn, getUserFn } from "../utils/queryFunctions";
import Modal from "../modals/Modal";

const Profile = () => {
  const scrollDiv = useRef(null);

  const [tab, setTab] = useState("posts");
  const [scrollValue, setScrollValue] = useState(0);

  const navigate = useNavigate();
  const handle = location.pathname.split("/")[2];

  const [showEditProfile, setShowEditProfile] = useState(false);

  // Query to get User
  const {
    isPending: isUserPending,
    isError: isUserError,
    data: userData,
    error: userError,
  } = useQuery({
    queryKey: ["profile", handle],
    queryFn: () => getUserFn(handle),
  });

  // Query to get Tweets by the user
  const {
    isPending: areTweetsPending,
    isError: areTweetsError,
    data: tweetsData,
    error: tweetsError,
  } = useQuery({
    queryKey: ["tweets", handle],
    queryFn: () => getTweetsByUserFn(handle),
  });

  // Handle scroll to top
  const handleScrollToTop = (e) => {
    e.stopPropagation();

    if (scrollDiv.current) {
      scrollDiv.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Handle Scroll
  const handleScroll = () => {
    if (scrollDiv.current) {
      const scrollTop = scrollDiv.current.scrollTop;
      setScrollValue(scrollTop);
    }
  };

  // Navigate to login if not logged in
  const isLoggedIn = checkUserLoggedIn();
  useEffect(() => {
    if (!isLoggedIn.status) {
      toast.error(isLoggedIn.message);
      logoutUser();
      navigate("/login");
    }
  }, []);

  // Check if some error has occurred and redirect to the homepage
  useEffect(() => {
    if (!isUserPending && userError?.response?.data?.message) {
      toast.error(userError.response.data.message);
      navigate("/home");
    } else if (!isUserPending && isUserError) {
      toast.error("Something went wrong! Redirecting to home page!");
      navigate("/home");
    }
  }, [isUserPending, isUserError, userError]);

  if (isUserPending || areTweetsPending)
    return (
      <div className="flex flex-grow ">
        {/* Profile Page */}
        <div className="flex-grow text-white">
          {/* Back and Account Name */}
          <div className="flex items-center gap-x-4  px-4 py-2">
            <div
              className="flex-grow-0 cursor-pointer rounded-md p-4 pr-6 hover:bg-gray-500"
              onClick={() => navigate("/home")}
            >
              <IoArrowBackSharp size={24} />
            </div>
            <div className="flex flex-grow flex-col">
              <h1 className="text-xl font-semibold capitalize">
                <Skeleton />
              </h1>
              <p className="text-sm font-thin text-gray-400">
                <Skeleton />
              </p>
            </div>
          </div>
          {/* Account Details Overview */}
          <div className="">
            {/* Background Image */}
            <div className="h-fit">
              <div className="h-[210px] bg-gray-600" />
            </div>
            {/* Details and Profile Image */}
            <div className="relative h-[220px] w-[156px]">
              <div className="absolute top-0 -translate-y-16 translate-x-4">
                <div className="flex flex-col items-start">
                  {/* Profile Image */}
                  <img
                    className="h-[128px] w-[128px] rounded-full border-4 border-solid border-black bg-gray-200 object-contain"
                    src="https://cdn.icon-icons.com/icons2/3054/PNG/512/account_profile_user_icon_190494.png"
                    alt="user"
                  />
                  {/* Text Details */}
                  <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col">
                      {/* User name */}
                      <span className="text-2xl font-bold capitalize">
                        <Skeleton />
                      </span>
                      {/* Handle */}
                      <span className="text-sm font-thin text-gray-400">
                        <Skeleton />
                      </span>
                    </div>
                    {/* Joined Date */}
                    <div className="items-center text-lg font-semibold text-gray-400">
                      <Skeleton />
                    </div>
                    {/* Followers and Following */}
                    <div className="flex gap-x-8">
                      <span className="w-1/2 text-gray-400">
                        <Skeleton />
                      </span>
                      <span className="w-1/2 text-gray-400">
                        <Skeleton />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Tabs Section */}
            <div className="flex justify-between border-b border-solid border-gray-200">
              {/* Posts */}
              <div
                onClick={() => setTab("posts")}
                className="flex cursor-pointer justify-center hover:bg-gray-700"
              >
                <div className="mt-2 text-lg font-semibold">
                  <span
                    className={`${tab === "posts" ? "text-white" : "text-gray-400"}`}
                  >
                    Posts
                  </span>
                  <hr
                    className={`${tab === "posts" ? "border-blue-400" : "border-black"} mt-2 rounded-md border-2 border-solid`}
                  />
                </div>
              </div>
              <div
                onClick={() => setTab("likes")}
                className="flex cursor-pointer justify-center hover:bg-gray-700"
              >
                <div className="mt-2 text-lg font-semibold">
                  <span
                    className={`${tab === "likes" ? "text-white" : "text-gray-400"}`}
                  >
                    Likes
                  </span>
                  <hr
                    className={`${tab === "likes" ? "border-blue-400" : "border-black"} mt-2 rounded-md border-2 border-solid`}
                  />
                </div>
              </div>
            </div>
            <div className="">
              {tab === "posts" ? <TweetsByUser /> : <UserLikedTweets />}
            </div>
          </div>
        </div>
        <Suggestions />
      </div>
    );

  if (isUserError)
    return (
      <div className="bg-black text-white">
        Error occurred: {isUserError.message}
      </div>
    );

  if (areTweetsError)
    return (
      <div className="bg-black text-white">
        Tweets Error occurred: {tweetsError.message}
      </div>
    );

  return (
    <div className="flex h-screen flex-grow lg:w-3/4">
      <div
        ref={scrollDiv}
        onScroll={handleScroll}
        className="no-scrollbar relative flex-grow overflow-y-auto text-white lg:w-2/3"
      >
        {/* Back and Account Name */}
        <div className="flex items-center gap-x-4 px-4 py-2">
          <div
            className="flex-grow-0 cursor-pointer rounded-md p-4 pr-6 hover:bg-gray-500"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackSharp size={24} />
          </div>
          <div className="flex flex-grow flex-col">
            <h1 className="text-xl font-semibold capitalize">
              {userData.user.name}
            </h1>
            <p className="text-sm font-thin text-gray-400">
              {tweetsData.tweets.length} posts
            </p>
          </div>
        </div>

        {/* Account Details Overview */}
        <div className="overflow-y-auto">
          {/* Background Image */}
          <div className="h-[210px] bg-gray-600" />
          {/* Details and Profile Image */}
          <div className="relative h-[280px]">
            {/* Profile Image */}
            <div className="absolute top-0 -translate-y-16 translate-x-4">
              <div className="flex flex-col items-start">
                <img
                  className="h-[128px] w-[128px] rounded-full border-4 border-solid border-black bg-gray-200 object-contain"
                  src={userData.user.profilePicture}
                  alt={userData.user.name}
                />
              </div>
              {/* Text Details */}
              <div className="flex flex-col gap-y-4">
                {/* Name and Handle */}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold capitalize">
                    {userData.user.name}
                  </span>
                  <span className="text-sm font-thin text-gray-400">
                    @{userData.user.username}
                  </span>
                </div>

                {/* Joined Month and Year */}
                <span className="flex items-center gap-x-2 text-lg font-semibold text-gray-400">
                  <span>
                    <IoCalendarNumberOutline />
                  </span>
                  {`Joined ${getJoiningMonth(userData.user.createdAt)}`}
                </span>

                {/* Location */}
                <span className="flex items-center gap-x-2 text-lg font-semibold text-gray-400">
                  <span>
                    <GoLocation />
                  </span>
                  {`Located in ${userData.user.location}`}
                </span>
                <div className="flex gap-x-8">
                  <span className="text-gray-400">
                    <span className="mr-2 text-white">
                      {userData.user.following.length}
                    </span>
                    Following
                  </span>
                  <span className="text-gray-400">
                    <span className="mr-2 text-white">
                      {userData.user.followers.length}
                    </span>
                    Followers
                  </span>
                </div>
              </div>
            </div>
            {/* Profile Button */}
            <div className="absolute right-4 top-4 h-fit w-fit">
              {userData.user.username === localStorage.getItem("handle") ? (
                <Button
                  style="border-white border border-solid text-lg"
                  beforeElement={<LiaUserEditSolid size={24} />}
                  onClick={() => setShowEditProfile(true)}
                >
                  Edit Profile
                </Button>
              ) : userData.user.followers.includes(
                  //Check if the user is following the other user or not
                  localStorage.getItem("id"),
                ) ? (
                <Button
                  style="border-white border border-solid text-lg"
                  beforeElement={<AiOutlineUserDelete size={24} />}
                  onClick={() => alert("Trigger unfollow")}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  style="border-white border border-solid text-lg"
                  beforeElement={<AiOutlineUserAdd size={24} />}
                  onClick={() => alert("Trigger Follow")}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>

          {/* Tabs Section */}
          <div className="flex justify-evenly border-b border-solid border-gray-200">
            {/* Posts */}
            <div
              onClick={() => setTab("posts")}
              className="flex w-full cursor-pointer justify-center hover:bg-gray-700"
            >
              <div className="mt-2 text-lg font-semibold">
                <span
                  className={`${tab === "posts" ? "text-white" : "text-gray-400"}`}
                >
                  Posts
                </span>
                <hr
                  className={`${tab === "posts" ? "border-blue-400" : "border-black"} mt-2 rounded-md border-2 border-solid`}
                />
              </div>
            </div>
            {/* Replies */}
            <div
              onClick={() => setTab("replies")}
              className="flex w-full cursor-pointer justify-center hover:bg-gray-700"
            >
              <div className="mt-2 text-lg font-semibold">
                <span
                  className={`${tab === "replies" ? "text-white" : "text-gray-400"}`}
                >
                  Replies
                </span>
                <hr
                  className={`${tab === "replies" ? "border-blue-400" : "border-black"} mt-2 rounded-md border-2 border-solid`}
                />
              </div>
            </div>
            {/* Likes */}
            <div
              onClick={() => setTab("likes")}
              className="flex w-full cursor-pointer justify-center hover:bg-gray-700"
            >
              <div className="mt-2 text-lg font-semibold">
                <span
                  className={`${tab === "likes" ? "text-white" : "text-gray-400"}`}
                >
                  Likes
                </span>
                <hr
                  className={`${tab === "likes" ? "border-blue-400" : "border-black"} mt-2 rounded-md border-2 border-solid`}
                />
              </div>
            </div>
          </div>

          {/* Items to display based on tabs */}
          <div className="overflow-y-auto">
            {tab === "posts" ? (
              <div className="">
                <TweetsByUser />
              </div>
            ) : tab === "replies" ? (
              <div>
                <UserReplies />
              </div>
            ) : (
              <div>
                <UserLikedTweets />
              </div>
            )}
          </div>
        </div>
        {scrollValue > 200 && (
          <div className="fixed bottom-2 left-0 flex w-full items-center justify-center">
            <button
              className="rounded-full bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-600"
              onClick={handleScrollToTop}
            >
              Back to Top
            </button>
          </div>
        )}
      </div>
      <Suggestions />
      <Modal showModal={showEditProfile} setShowModal={setShowEditProfile}>
        <EditUserProfile
          setShowModal={setShowEditProfile}
          name={userData.user.name}
          profilePicture={userData.user.profilePicture}
          location={userData.user.location}
        />
      </Modal>
    </div>
  );
};

Profile.propTypes = {
  hasBgImage: PropTypes.string,
};

Profile.defaultProps = {
  hasBgImage: "no bg image",
};

export default Profile;
