import { useQuery } from "@tanstack/react-query";
import { getPostsLikedByUserFn } from "../../utils/queryFunctions";
import { SingleTweet } from "..";

const UserLikedTweets = () => {
  const handle = location.pathname.split("/")[2];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["likes", handle],
    queryFn: () => getPostsLikedByUserFn(handle),
  });

  if (isPending) return <div className="p-2 text-white">Loading...</div>;

  if (isError) return <div className="p-2 text-white">{error.message}</div>;

  return (
    <div>
      {data.likedPosts.map((tweet) => (
        <SingleTweet key={tweet._id} id={tweet._id} />
      ))}
    </div>
  );
};

export default UserLikedTweets;
