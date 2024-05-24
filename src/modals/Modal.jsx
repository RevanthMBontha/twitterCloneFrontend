import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, showModal, setShowModal }) => {
  return (
    <div
      className={`${showModal ? "visible" : "hidden"} fixed inset-0 z-10 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-white bg-opacity-25`}
    >
      <div className="relative mx-auto my-6 w-full max-w-xl">
        <div
          className="absolute right-2 top-2 cursor-pointer rounded-full p-2 text-white hover:bg-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
          }}
        >
          <IoClose size={24} />
        </div>
        <div className="rounded-xl bg-black p-8">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.default = {
  showModal: false,
};

export default Modal;
