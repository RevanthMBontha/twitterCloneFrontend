import { useState, useEffect, useRef } from "react";
import { AddNewTweet, Suggestions, SingleTweet } from "../components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkUserLoggedIn, logoutUser } from "../utils/helperFunctions";
import { useQuery } from "@tanstack/react-query";
import { getTweetsFn } from "../utils/queryFunctions";

const Tweets = () => {
  const scrollDiv = useRef(null);
  const navigate = useNavigate();

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

  // Navigate to login if not logged in
  const isLoggedIn = checkUserLoggedIn();
  useEffect(() => {
    if (!isLoggedIn.status) {
      toast.error(isLoggedIn.message);
      logoutUser();
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: () => getTweetsFn(),
  });

  return (
    <div className="flex h-screen flex-grow lg:w-3/4">
      <div
        ref={scrollDiv}
        onScroll={handleScroll}
        className="no-scrollbar flex-grow overflow-y-auto text-white lg:w-2/3"
      >
        {/* Add new Tweet Container */}
        <div className="h-fit border-b border-solid border-gray-200">
          <AddNewTweet />
        </div>
        {/* Tweets Container */}
        <div className="w-full overflow-y-auto">
          {isPending ? (
            <div>
              <p className="text-white">Loading...</p>
            </div>
          ) : isError ? (
            <div>
              <p className="text-white">{error.message}</p>
            </div>
          ) : (
            data.tweets.map((tweet) => {
              if (!tweet.isReply)
                return <SingleTweet key={tweet._id} id={tweet._id} />;
            })
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

export default Tweets;
