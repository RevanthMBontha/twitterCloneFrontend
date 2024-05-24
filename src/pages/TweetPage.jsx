import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoArrowBackSharp } from "react-icons/io5";
import { getTweetFn } from "../utils/queryFunctions";
import { Suggestions, SingleTweet } from "../components";

const TweetPage = () => {
  const scrollDiv = useRef(null);
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tweet", id],
    queryFn: () => getTweetFn(id),
  });

  const [scrollValue, setScrollValue] = useState(0);

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

  if (isPending) return <div className="text-white">Loading...</div>;

  if (isError) return <div className="text-white">{error.message}</div>;

  return (
    <div className="flex h-screen flex-grow lg:w-3/4">
      <div
        ref={scrollDiv}
        onScroll={handleScroll}
        className="no-scrollbar relative w-full overflow-y-auto lg:w-2/3"
      >
        {/* Back and Post */}
        <div className="flex items-center gap-x-4 px-4 py-2">
          <div
            className="flex-grow-0 cursor-pointer rounded-md p-4 pr-6 text-white hover:bg-gray-500"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackSharp size={24} />
          </div>
          <div className="flex flex-grow flex-col">
            <h1 className="text-xl font-semibold capitalize text-white">
              Post
            </h1>
          </div>
        </div>

        {/* Tweet Post */}
        <SingleTweet id={id} />

        {/* Add new Tweets */}
        {/* TODO: Add logic to reply to tweet here */}

        {/* Reply Tweets */}
        <div className="">
          {data.tweet.replies.length === 0 ? (
            <div className="text-white">No replies yet!</div>
          ) : (
            data.tweet.replies.map((id) => <SingleTweet key={id} id={id} />)
          )}
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
    </div>
  );
};

export default TweetPage;
