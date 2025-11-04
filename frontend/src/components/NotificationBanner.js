import React from "react";

/**
 * NotificationBanner component
 * Displays success or error messages at the top of the screen.
 * Props:
 *   type: "success" | "error"
 *   message: string
 *   onClose: function
 */

const NotificationBanner = ({ type = "success", message, onClose }) => {
  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-500 text-green-700"
      : "bg-red-100 border-red-500 text-red-700";

  return (
    <div
      className={`border-l-4 p-4 fixed top-4 left-1/2 transform -translate-x-1/2 shadow-lg rounded-md w-3/4 sm:w-1/2 ${bgColor}`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-sm font-semibold underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
