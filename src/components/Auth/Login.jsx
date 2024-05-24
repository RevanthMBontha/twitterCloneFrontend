import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginMFn } from "../../utils/mutationFunctions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (userData) => loginMFn(userData),
    onSuccess: (response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("tokenExpiresIn", response.expiresIn);
      localStorage.setItem("id", response.id);
      localStorage.setItem("name", response.name);
      localStorage.setItem("handle", response.handle);
      localStorage.setItem("loginAt", Date.now());
      localStorage.setItem("profilePicture", response.profilePicture);

      toast.success(`Welcome @${response.handle}`);

      setUserDetails({
        email: "",
        password: "",
      });

      navigate("/home");
    },
    onError: (response) => {
      toast.error(response.response.data.message);
    },
  });

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div>
        <img className="h-[64px] w-[64px]" src="./images/logo.png" alt="logo" />
      </div>
      <div>
        <h1 className="text-center text-2xl font-semibold text-white">
          Sign-in to X
        </h1>
      </div>
      <div className="mb-6 flex w-full flex-col gap-y-8">
        {/* Email */}
        <div className="w-full px-4">
          <label className="block text-white" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-md py-1 pl-1 text-black"
            type="text"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="w-full px-4">
          <label className="block text-white" htmlFor="email">
            Password
          </label>
          <input
            className="w-full rounded-md py-1 pl-1 text-black"
            type="password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mb-6 w-full px-8">
        <button
          disabled={
            userDetails.email.length === 0 || userDetails.password.length === 0
          }
          className={`w-full rounded-full border border-solid border-white py-3 text-xl font-semibold text-white hover:bg-gray-400 disabled:cursor-not-allowed disabled:text-red-400`}
          onClick={() => loginMutation.mutate(userDetails)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
