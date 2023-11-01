import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import ImageCard from "./components/image-component";
import { imageList } from "./utilities/data";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};



const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(imageList);
  }, []);

  const onDragEnd = (result) => {
    console.log(result,'=================')
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    console.log(reorderedItems,'=================');
    setItems(reorderedItems);
  };


  return (
      <DragDropContext onDragEnd={onDragEnd}>
          {items.map((item, index) => (
        <Droppable droppableId={item} key={index} index={index}>

          {(provided, snapshot) => (
            <div className="image-card-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
                <Draggable key={index} draggableId={item} index={index}>
                  {(provided, snapshot) => (
                    <div
                    className="image-container float-start"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    
                    >
                      <div >
                      <ImageCard url={`/public/images/${item}`} />
                      </div>

                    </div>
                  )}
                </Draggable>
              {provided.placeholder}
            </div>
          )}
  
        </Droppable>
              ))}
      </DragDropContext>
  );
};

export default App;