import { useState } from "react";
import PropTypes from "prop-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkExistingEmailFn,
  checkHandleAvailabilityFn,
} from "../../../utils/queryFunctions";

const StepOne = ({ userDetails, setUserDetails }) => {
  const queryClient = useQueryClient();
  const [hasEnteredHandle, setHasEnteredHandle] = useState(false);
  const [hasEnteredEmail, setHasEnteredEmail] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  // Query to check if the handle is available
  const {
    isPending: isHandlePending,
    isError: isHandleError,
    data: handleData,
  } = useQuery({
    queryKey: ["checkHandleAvailability"],
    queryFn: () => checkHandleAvailabilityFn(userDetails.username),
    enabled: hasEnteredHandle,
  });

  // Query to check if the email is already linked to a account
  const {
    isPending: isEmailPending,
    isError: isEmailError,
    data: emailData,
  } = useQuery({
    queryKey: ["checkExistingEmail"],
    queryFn: () => checkExistingEmailFn(userDetails.email),
    enabled: hasEnteredEmail,
  });
  return (
    <div className="flex w-full flex-col gap-y-8">
      {/* Name */}
      <div className="w-full px-4">
        <label className="block text-white" htmlFor="name">
          Full Name
        </label>
        <input
          name="name"
          className="w-full rounded-md py-1 pl-1 text-black"
          type="text"
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
        />
      </div>

      {/* UserName */}
      <div className="w-full px-4">
        <label className="block text-white" htmlFor="username">
          Handle
        </label>
        <input
          name="username"
          className="w-full rounded-md py-1 pl-1 text-black"
          type="text"
          value={userDetails.username}
          onChange={(e) =>
            setUserDetails({ ...userDetails, username: e.target.value })
          }
          onFocus={() => {
            setHasEnteredHandle(false);
            queryClient.invalidateQueries({
              queryKey: ["checkHandleAvailability"],
            });
          }}
          onBlur={() => {
            userDetails.username.length > 0 && setHasEnteredHandle(true);
          }}
        />
        <p
          className={`${!hasEnteredHandle ? "hidden" : isHandlePending ? "block text-blue-400" : isHandleError ? "block text-red-400" : handleData ? "block text-green-400" : "block text-red-400"} text-sm font-thin`}
        >
          {isHandlePending
            ? "Checking..."
            : isHandleError
              ? "Something went wrong. Please enter your handle again!"
              : handleData
                ? "Handle is available!"
                : "Handle already taken. Please try another handle!"}
        </p>
      </div>

      {/* Email */}
      <div className="w-full px-4">
        <label className="block text-white" htmlFor="email">
          Email
        </label>
        <input
          name="email"
          className="w-full rounded-md py-1 pl-1 text-black"
          type="text"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
          onFocus={() => {
            setHasEnteredEmail(false);
            queryClient.invalidateQueries({
              queryKey: ["checkExistingEmail"],
            });
          }}
          onBlur={() =>
            userDetails.email.length > 0 && setHasEnteredEmail(true)
          }
        />
        <p
          className={`${!hasEnteredEmail ? "hidden" : isEmailPending ? "block text-blue-400" : isEmailError ? "block text-red-400" : emailData ? "block text-red-400" : "block text-green-400"} text-sm font-thin`}
        >
          {isEmailPending
            ? "Checking..."
            : isEmailError
              ? "Something went wrong. Please enter email again!"
              : emailData
                ? "User with email already exists. Please log in!"
                : ""}
        </p>
      </div>

      {/* Password */}
      <div className="w-full px-4">
        <label className="block text-white" htmlFor="password">
          Password
        </label>
        <input
          name="email"
          className="w-full rounded-md py-1 pl-1 text-black"
          type="password"
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
        />
      </div>

      {/* Confirm Password */}
      <div className="w-full px-4">
        <label className="block text-white" htmlFor="passwordConfirm">
          Confirm Password
        </label>
        <input
          name="email"
          className="w-full rounded-md py-1 pl-1 text-black"
          type="password"
          value={userDetails.passwordConfirm}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              passwordConfirm: e.target.value,
            })
          }
          onFocus={() => setPasswordMismatch(false)}
          onBlur={() =>
            userDetails.password !== userDetails.passwordConfirm
              ? setPasswordMismatch(true)
              : setPasswordMismatch(false)
          }
        />
        {passwordMismatch && (
          <p className="block text-sm font-thin text-red-400">
            Passwords do not match
          </p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="w-full px-4">
        <label className="block text-white" htmlFor="passwordConfirm">
          Date of Birth
        </label>
        <input
          name="email"
          className="w-full rounded-md py-1 pl-1 text-black"
          type="date"
          max={new Date().toISOString().split("T")[0]}
          value={
            userDetails.dateOfBirth &&
            `${new Date(userDetails.dateOfBirth).getFullYear() < 10 ? `000${new Date(userDetails.dateOfBirth).getFullYear()}` : new Date(userDetails.dateOfBirth).getFullYear() < 100 ? `00${new Date(userDetails.dateOfBirth).getFullYear()}` : new Date(userDetails.dateOfBirth).getFullYear() < 1000 ? `0${new Date(userDetails.dateOfBirth).getFullYear()}` : new Date(userDetails.dateOfBirth).getFullYear()}-${new Date(userDetails.dateOfBirth).getMonth() < 9 ? `0${new Date(userDetails.dateOfBirth).getMonth() + 1}` : `${new Date(userDetails.dateOfBirth).getMonth() + 1}`}-${new Date(userDetails.dateOfBirth).getDate() < 10 ? `0${new Date(userDetails.dateOfBirth).getDate()}` : `${new Date(userDetails.dateOfBirth).getDate()}`}`
          }
          onChange={(e) =>
            e.target.value
              ? setUserDetails({
                  ...userDetails,
                  dateOfBirth: new Date(e.target.value).toISOString(),
                })
              : setUserDetails({
                  ...userDetails,
                  dateOfBirth: "",
                })
          }
        />
      </div>
    </div>
  );
};

StepOne.propTypes = {
  userDetails: PropTypes.object.isRequired,
  setUserDetails: PropTypes.func.isRequired,
};

export default StepOne;
