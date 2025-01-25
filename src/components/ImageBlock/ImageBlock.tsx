import React, { useState } from 'react';
import img1 from '@assets/img1.jpg';
import img2 from '@assets/img2.jpg';
import img3 from '@assets/img3.jpg';
import img4 from '@assets/img4.jpg';
import './ImageBlock.scss';

interface ImageBlockProps {
  id: string;
  selectedImage: string;
  onImageSelect: (id: string, image: string) => void;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ id, selectedImage, onImageSelect }) => {
  const [showImageSelector, setShowImageSelector] = useState(false);

  const images = [img1, img2, img3, img4];

  const handleImageClick = () => {
    setShowImageSelector(true);
  };

  const handleImageSelect = (image: string) => {
    onImageSelect(id, image);
    setShowImageSelector(false);
  };

  return (
    <div className="image-block">
      <div className="image-container">
        {showImageSelector ? (
          <div className="image-selector">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Selectable ${index}`}
                className="img-thumbnail"
                onClick={() => {
                  handleImageSelect(image);
                }}
              />
            ))}
          </div>
        ) : (
          !selectedImage ? (
            <div className="placeholder" onClick={handleImageClick}>Select Image</div>
          ) : (
            <img src={selectedImage} alt="Selected" className="selected-img" onClick={handleImageClick}/>
          )
        )}
      </div>
    </div>
  );
};

export default ImageBlock;