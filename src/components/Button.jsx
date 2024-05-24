import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Button = ({
  children,
  style,
  beforeElement,
  onClick,
  disabled,
  shouldHideText,
}) => {
  const buttonStyle = twMerge(
    `py-2 px-4 ${disabled ? "text-red-400 cursor-not-allowed" : "text-white cursor-pointer"} flex items-center justify-start text-xl rounded-full hover:bg-gray-600 w-full`,
    style,
  );

  return (
    <div className={buttonStyle} onClick={onClick} disabled={disabled}>
      <div className="relative flex items-center justify-start gap-x-4">
        {!!beforeElement && <div>{beforeElement}</div>}
        <div className={`${shouldHideText ? "hidden lg:block" : "block"}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.string,
  beforeElement: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  shouldHideText: PropTypes.bool,
};

Button.defaultProps = {
  children: "Button",
  style: "",
  onClick: (e) => {
    e.stopPropagation();
    alert("Button clicked");
  },
  shouldHideText: true,
  disabled: false,
};

export default Button;
