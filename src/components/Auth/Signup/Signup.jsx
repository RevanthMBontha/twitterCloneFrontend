import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { signInMFn } from "../../../utils/mutationFunctions";
import { toast } from "react-toastify";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const Signup = ({ setShowModal }) => {
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    dateOfBirth: "",
    profilePicture: "",
    location: "",
  });

  // Mutation to sign up a new user
  const signInMutation = useMutation({
    mutationFn: (userData) => signInMFn(userData),
    onSuccess: () => {
      setUserDetails({
        name: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        dateOfBirth: "",
        profilePicture: "",
        location: "",
      });
      toast.success("User registered successfully. Please sign in!");
      setShowModal(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again");
      setShowModal(false);
    },
  });

  return (
    <div className="flex max-h-[500px] w-full flex-col items-center gap-y-8 overflow-y-auto">
      <div>
        <img className="h-[64px] w-[64px]" src="./images/logo.png" alt="logo" />
      </div>
      <div>
        <h1 className="text-center text-2xl font-semibold text-white">
          Sign-up to X
        </h1>
      </div>
      <div className="w-full">
        {step === 1 ? (
          <StepOne userDetails={userDetails} setUserDetails={setUserDetails} />
        ) : (
          <StepTwo userDetails={userDetails} setUserDetails={setUserDetails} />
        )}
      </div>
      <div className="my-6 w-full">
        <button
          disabled={
            userDetails.name.length === 0 ||
            userDetails.email.length === 0 ||
            userDetails.username.length === 0 ||
            userDetails.password.length === 0 ||
            userDetails.passwordConfirm.length === 0 ||
            !userDetails.dateOfBirth
          }
          onClick={() =>
            step === 1 ? setStep(2) : signInMutation.mutate(userDetails)
          }
          className="w-full rounded-full border border-solid border-white py-2 text-xl font-semibold text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:text-red-400"
        >
          {step === 1 ? "Next" : "Sign up"}
        </button>
      </div>
    </div>
  );
};

Signup.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};

export default Signup;
