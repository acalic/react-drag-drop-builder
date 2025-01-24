import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Block } from '../../types';
import TextBlock from '../TextBlock/TextBlock';
import ImageBlock from '../ImageBlock/ImageBlock';
import SaveButton from '../SaveButton/SaveButton';
import { v4 as uuidv4 } from 'uuid';
import './DragDropContainer.scss';

interface DragDropContainerProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const DragDropContainer: React.FC<DragDropContainerProps> = ({ blocks, setBlocks }) => {

  const handleDuplicate = (block: Block) => {
    const newBlock = { ...block, id: uuidv4() };

    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === block.id);
      const updatedBlocks = [...prev];
      updatedBlocks.splice(index + 1, 0, newBlock);
      return updatedBlocks;
    });
  };

  const handleDelete = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleContentChange = (id: string, content: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, content } : b
      )
    );
  };

  const handleImageSelect = (id: string, src: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, src } : b
      )
    );
  };

  return (
    <Droppable droppableId="blocks">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="drag-drop-container mb-3"
        >
          {blocks.length === 0 && (
            <div className="empty-message text-center">
              Drag and drop blocks here
            </div>
          )}
          {blocks.map((block, index) => (
            <Draggable key={block.id} draggableId={block.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="block"
                >
                  {block.type === 'text' && (
                    <TextBlock
                      id={block.id}
                      content={block.content || ''}
                      onContentChange={handleContentChange}
                    />
                  )}
                  {block.type === 'image' && (
                    <ImageBlock
                      id={block.id}
                      selectedImage={block.src || ''}
                      onImageSelect={handleImageSelect}
                    />
                  )}
                  <div className="block-actions">
                    <button
                      className="btn btn-sm btn-secondary mt-2"
                      onClick={() => handleDuplicate(block)}
                    >
                      Duplicate
                    </button>
                    <button
                      className="btn btn-sm btn-danger mt-2"
                      onClick={() => handleDelete(block.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {blocks.length > 0 && <SaveButton blocks={blocks} />}
        </div>
      )}
    </Droppable>
  );
};

export default DragDropContainer;