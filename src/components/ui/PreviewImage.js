import React from 'react';

const PreviewImage = ({ image, imageURL }) => {
  if (!imageURL) {
    return (
      <div className="text-muted">
        {image}
      </div>
    );
  } else {
    return (
      <img className="img-fluid mb-2 mt-2" src={imageURL} alt={imageURL} />
    );
  }
}

export default PreviewImage;