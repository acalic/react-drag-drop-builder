import React, { useState } from 'react';
import BuilderPalette from './components/BuilderPalette/BuilderPalette';
import DragDropContainer from './components/DragDropContainer/DragDropContainer';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Block, BlockType } from './types';
import { v4 as uuidv4 } from 'uuid';
import logo from './assets/react.svg';
import './styles/main.scss';

const App: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // Add new block when dragged from palette
    if (source.droppableId === 'palette' && destination.droppableId === 'blocks') {
      const newBlock: Block = {
        id: uuidv4(),
        type: result.draggableId as BlockType,
        content: result.draggableId === 'text' ? 'New text' : '',
        src: '',
      };

      setBlocks((prev) => {
        const updatedBlocks = Array.from(prev);
        updatedBlocks.splice(destination.index, 0, newBlock);
        return updatedBlocks;
      });
    }

    // Reorder blocks within the container
    if (source.droppableId === 'blocks' && destination.droppableId === 'blocks') {
      const reorderedBlocks = Array.from(blocks);
      const [movedBlock] = reorderedBlocks.splice(source.index, 1);
      reorderedBlocks.splice(destination.index, 0, movedBlock);
      setBlocks(reorderedBlocks);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="logo" />
          <span>React Drag & Drop</span>
        </a>
      </nav>
      <div className="main">
        <div className="sidebar">
          <BuilderPalette />
        </div>
        <div className="content">
          <DragDropContainer blocks={blocks} setBlocks={setBlocks} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;