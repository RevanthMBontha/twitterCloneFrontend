import PropTypes from "prop-types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUserWithIDFn } from "../utils/queryFunctions";
import { followUserMfn, unFollowUserMfn } from "../utils/mutationFunctions";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SuggestionsUser = ({ id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserWithIDFn(id),
  });

  const followMutation = useMutation({
    mutationFn: () => followUserMfn(data.user.username),
    onSuccess: () => {
      queryClient.invalidateQueries([
        ["user", id],
        ["profile", id],
      ]);
      toast.success(`Followed @${data.user.username}!`);
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: () => unFollowUserMfn(data.user.username),
    onSuccess: () => {
      queryClient.invalidateQueries([
        ["user", id],
        ["profile", id],
      ]);
      toast.success(`Unfollowed @${data.user.username}!`);
    },
  });

  const handleUserFollow = (e) => {
    e.stopPropagation();
    if (data.user.followers.includes(localStorage.getItem("id"))) {
      unFollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  if (isPending) return <div className="p-2 text-white">Loading...</div>;

  if (isError) return <div className="p-2 text-white">{error.message}</div>;

  return (
    <div className="flex items-center justify-between rounded-full border border-solid border-gray-400 p-2 text-white">
      <div className="flex items-center gap-x-1">
        <div className="h-[48px] w-[48px]">
          <img
            className="h-[48px] w-[48px] rounded-full bg-gray-400 object-cover"
            src={data.user.profilePicture}
            alt={data.user.name}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold capitalize">{data.user.name}</span>
          <span
            className="cursor-pointer text-sm font-thin hover:text-blue-400"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${data.user.username}`);
            }}
          >
            @{data.user.username}
          </span>
        </div>
      </div>
      <div
        className="my-auto h-fit cursor-pointer rounded-full p-2 hover:bg-gray-400"
        onClick={handleUserFollow}
      >
        {data.user.followers.includes(localStorage.getItem("id")) ? (
          <span>
            <AiOutlineUserDelete size={24} />
          </span>
        ) : (
          <span>
            <AiOutlineUserAdd size={24} />
          </span>
        )}
      </div>
    </div>
  );
};

SuggestionsUser.propTypes = {
  id: PropTypes.string.isRequired,
};
export default SuggestionsUser;
