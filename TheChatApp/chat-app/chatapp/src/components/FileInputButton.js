import React, { useRef, useState } from "react";

const FileInputButton = ({ onFileSelect, selectedFile }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        onChange={onFileSelect}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 mx-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        {selectedFile ? "Change Photo" : "Send Photo"}
      </button>
    </>
  );
};
export default FileInputButton;
