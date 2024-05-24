import { useQuery } from "@tanstack/react-query";
import { getPopularUsersFn } from "../../utils/queryFunctions";
import SuggestionsUser from "../SuggestionsUser";

const Suggestions = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["popular"],
    queryFn: () => getPopularUsersFn(),
  });

  if (isPending)
    return (
      <div className="h-full w-1/3 border-l border-solid border-white p-2 text-white">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="h-full w-1/3 border-l border-solid border-white p-2 text-white">
        {error.message}
      </div>
    );

  return (
    <div className="hidden w-1/3 flex-grow-0 border-l border-solid border-gray-200 p-4 text-white lg:block">
      <div className="rounded-xl border border-solid border-gray-400 p-2">
        <h1 className="mb-6  text-center text-xl font-bold">Who to Follow</h1>
        <div className="flex flex-col gap-y-2">
          {data.popularUsers.map((user) => (
            <SuggestionsUser key={user._id} id={user._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
