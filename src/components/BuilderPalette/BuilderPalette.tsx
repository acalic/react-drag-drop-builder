import React from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import './BuilderPalette.scss';

const BuilderPalette: React.FC = () => (
  <Droppable droppableId="palette" isDropDisabled={true}>
    {(provided) => (
      <div
        className="builder-palette"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        <h5 className='text-center mb-3'>Building Blocks</h5>
        {['text', 'image'].map((type, index) => (
          <Draggable key={type} draggableId={type} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`palette-item mb-2 text-center ${snapshot.isDragging ? 'dragging' : ''}`}
              >
                {type === 'text' ? 'Text Block' : 'Image Block'}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default BuilderPalette;