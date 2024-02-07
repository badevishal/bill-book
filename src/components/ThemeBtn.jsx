import React from "react";
import useTheme from "../contexts/ThemeContext";

function ThemeBtn() {
  const { lightMode, darkMode } = useTheme();

  const themeBtnEvent = (e) => {
    const themStatus = e.currentTarget.checked;

    if (themStatus) {
      darkMode();
    } else {
      lightMode();
    }
  };

  return (
    <div className="text-right m-3">
      <p className="text-white dark:text-red-200">Theme</p>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          onChange={themeBtnEvent}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full after:h-5 after:w-5 after:rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:transition-all peer peer-checked:after:translate-x-full peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

export default ThemeBtn;
