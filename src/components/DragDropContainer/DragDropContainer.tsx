import React, { useState, useRef } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Block } from '@common/types';
import TextBlock from '@components/TextBlock/TextBlock';
import ImageBlock from '@components/ImageBlock/ImageBlock';
import SaveButton from '@components/SaveButton/SaveButton';
import ConfirmModal from '@components/ConfirmModal/ConfirmModal';
import { v4 as uuidv4 } from 'uuid';
import './DragDropContainer.scss';

interface DragDropContainerProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const DragDropContainer: React.FC<DragDropContainerProps> = ({ blocks, setBlocks }) => {
  const [showModal, setShowModal] = useState(false);
  const [blockToDelete, setBlockToDelete] = useState<string | null>(null);
  const blockRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  const openModal = (id: string) => {
    setBlockToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setBlockToDelete(null);
  };

  const confirmDelete = () => {
    if (blockToDelete) {
      handleDelete(blockToDelete);
      closeModal();
    }
  };

  return (
    <>
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
                    ref={(el) => {
                      provided.innerRef(el);
                      blockRefs.current[block.id] = el;
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="block mb-2"
                    id={block.id}
                    data-testid="block"
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
                    <div className="block-actions mt-2">
                      <button
                        className="btn btn-sm btn-outline-secondary mr-2"
                        onClick={() => handleDuplicate(block)}
                      >
                        Duplicate
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => openModal(block.id)}
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
      <ConfirmModal
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this block?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default DragDropContainer;