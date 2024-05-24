import { useQuery } from "@tanstack/react-query";
import { getTweetsByUserFn } from "../../utils/queryFunctions";
import SingleTweet from "../SingleTweet";

const TweetsByUser = () => {
  const handle = location.pathname.split("/")[2];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tweets", handle],
    queryFn: () => getTweetsByUserFn(handle),
  });

  if (isPending) return <div className="text-white">Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  if (data.tweets.length == 0)
    return (
      <div className="w-full p-4">
        <p className="text-center">
          No Tweets to show. Please tweet something!
        </p>
      </div>
    );

  return (
    <div className="w-full overflow-y-auto">
      {data.tweets.map((tweet) => {
        if (!tweet.isReply)
          return <SingleTweet key={tweet._id} id={tweet._id} />;
      })}
    </div>
  );
};

export default TweetsByUser;
