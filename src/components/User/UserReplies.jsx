import { SingleTweet } from "..";
import { useQuery } from "@tanstack/react-query";
import { getRepliesByUserFn } from "../../utils/queryFunctions";
import { useNavigate } from "react-router-dom";

const UserReplies = () => {
  const handle = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["replies", handle],
    queryFn: () => getRepliesByUserFn(handle),
  });

  if (isPending) return <div className="p-2 text-white">Loading...</div>;

  if (isError) return <div className="p-2 text-white">{error.message}</div>;

  return (
    <div className="w-full overflow-y-auto p-2">
      {data.replies.map((dataPoint) => (
        <div key={dataPoint.reply}>
          <h1>
            Replying to{" "}
            <span
              className="cursor-pointer text-blue-400 hover:text-blue-600"
              onClick={() => navigate(`/tweet/${dataPoint.tweetRepliedTo}`)}
            >
              post
            </span>
            :
          </h1>
          <div className="p-4">
            <div className="rounded-xl">
              <SingleTweet id={dataPoint.reply} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReplies;
