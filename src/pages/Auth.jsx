import { useState } from "react";
import { Login, Signup } from "../components";
import Modal from "./../modals/Modal";

const Auth = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="relative">
      <div className="flex h-full min-h-screen w-full flex-col items-center py-4 text-white lg:flex-row">
        <div className="flex h-full w-1/2 items-center justify-center">
          <img
            className="h-fit w-1/2 object-contain"
            src="/images/logo.png"
            alt="X Logo"
          />
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-6 pl-8 lg:items-start">
          <h1 className="mb-8 text-4xl font-extrabold text-gray-200 md:text-6xl xl:text-8xl">
            Happening Now
          </h1>
          <h2 className="mb-6 text-xl font-bold text-gray-200 md:text-3xl xl:text-5xl">
            Join today.
          </h2>
          <div className="flex w-full flex-col gap-y-12 lg:w-1/2">
            <div className="w-full">
              <button
                className="w-full rounded-full bg-blue-400 py-2 text-lg font-semibold text-white hover:bg-blue-600"
                onClick={() => setShowRegisterModal(true)}
              >
                Create account
              </button>
            </div>
            <div className="relative w-full">
              <p className="absolute right-1/2 top-1/2 w-fit -translate-y-1/2 translate-x-6 rounded-full bg-black p-4 text-xl font-semibold">
                or
              </p>
              <hr className="border border-solid border-gray-300" />
            </div>
            <div className="flex w-full flex-col gap-y-4">
              <h1 className="text-xl font-semibold">
                Already have an account?
              </h1>
              <button
                className="w-full rounded-full border border-solid border-blue-400 py-2 text-lg font-semibold text-blue-400 hover:bg-gray-700"
                onClick={() => setShowLoginModal(true)}
              >
                Sign-in
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal showModal={showLoginModal} setShowModal={setShowLoginModal}>
        <Login />
      </Modal>
      <Modal showModal={showRegisterModal} setShowModal={setShowRegisterModal}>
        <Signup setShowModal={setShowRegisterModal} />
      </Modal>
    </div>
  );
};

export default Auth;
