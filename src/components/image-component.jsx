import React from "react";

const ImageCard = ({ url, onEvent }) => {

  return (
    <div >
      <input
        type="checkbox"
        className="input form-check-input"
        onChange={(e) => onEvent(e)}
      />
      <img src={url} alt="Image" />
      <div className="image-overlay"></div>
    </div>
  );
};

export default ImageCard;
