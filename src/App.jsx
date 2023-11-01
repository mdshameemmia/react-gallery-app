import React, { useState, useRef } from "react";
import "./App.css";
import ImageCard from "./components/image-card.component";
import { imageList } from "./utilities/data";
import Button from "./components/common/button.component";

function App() {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [images, setImages] = useState(imageList);
  const [removeImages, setRemoveImages] = useState([]);

  const handleSelect = (e, item) => {
    if (e.target.checked) {
      setRemoveImages([...removeImages, item]);
      e.target.className = "form-check-input";
    } else {
      const _filteredImages = removeImages.filter(image => image !== item);
      setRemoveImages(_filteredImages);
      e.target.className = "input form-check-input";
    }
  };


  const handleSort = () => {
    //duplicate items
    let _images = [...images];

    //remove and save the dragged item content
    const draggedItemContent = _images.splice(dragItem.current, 1)[0];

    //switch the position
    _images.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setImages(_images);
  };

  // delete img
  const imageDeleteHandler = () => {
    const _inputTags = document.querySelectorAll('input[type=checkbox]');
    _inputTags.forEach(inputTag => {
      if(inputTag.classList[0] == 'form-check-input'){
        inputTag.parentElement.parentElement.remove();
      }
    })
    setRemoveImages([]);
  }

  return (
    <div className="container">
      <div className="mx-3 delete-item-container">
        {removeImages.length > 0 ? (
          <div className="d-flex justify-content-between">
            <label className="fw-bold">
              <input type="checkbox" checked={true} className="mx-1" />
             {removeImages.length} Files Selected
            </label>
            <Button text='Delete Files' onEvent={imageDeleteHandler} className='btn-light text-danger fw-bold'/>
          </div>
        ) : (
          <h3>Gallery</h3>
        )}
      </div>
      <div className="image-card-container">
        {images.map((item, index) => (
          <div
            className="image-container float-start"
            key={index}
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            id={item}
          >
            <ImageCard
              url={`/images/${item}`}
              onEvent={(e) => handleSelect(e, item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
