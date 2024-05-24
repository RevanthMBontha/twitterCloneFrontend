// Function to check if a user is logged in or not
export const checkUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  const tokenExpiresIn = localStorage.getItem("tokenExpiresIn");
  const loggedInAt = localStorage.getItem("loginAt");

  if (!token) {
    return {
      status: false,
      message: "You have not logged in. Please log in to continue!",
    };
  } else if (Date.now() > Number(loggedInAt) + Number(tokenExpiresIn)) {
    return {
      status: false,
      message:
        "You have been logged out due to inactivity. Please login again!",
    };
  }
  return { status: true, message: "All good" };
};

// Function to log out the user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiresIn");
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("handle");
  localStorage.removeItem("profilePicture");
  localStorage.removeItem("loginAt");
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Function to get Month and Year from ISOString
export const getJoiningMonth = (dateString) => {
  const joinedDate = new Date(dateString);
  const joinedMonth = months[joinedDate.getMonth()];
  const joinedYear = joinedDate.getFullYear();
  return `${joinedMonth} ${joinedYear}`;
};

// Function to get extended date time
export const getTime = (dateString) => {
  const postedDate = new Date(dateString);
  const formattedTime = postedDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedTime;
};

export const getDate = (dateString) => {
  const postedDate = new Date(dateString);

  const postedDay = postedDate.getDate();
  const postedMonth = postedDate.getMonth();
  const postedYear = postedDate.getFullYear();

  return `${months[postedMonth]} ${postedDay},${postedYear}`;
};
