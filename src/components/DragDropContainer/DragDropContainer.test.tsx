import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DragDropContext } from '@hello-pangea/dnd';
import DragDropContainer from './DragDropContainer';
import { Block } from '@common/types';

describe('DragDropContainer', () => {
  const mockBlocks: Block[] = [
    { id: '1', type: 'text', content: 'Block 1' },
    { id: '2', type: 'image', src: 'image1.jpg' },
  ];

  const setBlocks = jest.fn();

  const renderWithContext = (ui: React.ReactElement) => {
    return render(
      <DragDropContext onDragEnd={() => {}}>
        {ui}
      </DragDropContext>
    );
  };

  test('renders correctly with blocks', () => {
    renderWithContext(<DragDropContainer blocks={mockBlocks} setBlocks={setBlocks} />);
    const blocks = screen.getAllByTestId('block');
    expect(blocks).toHaveLength(mockBlocks.length);
  });

  test('renders correctly with no blocks', () => {
    renderWithContext(<DragDropContainer blocks={[]} setBlocks={setBlocks} />);
    const container = screen.getByText('Drag and drop blocks here');
    expect(container).toBeInTheDocument();
  });

  test('displays the correct number of blocks', () => {
    renderWithContext(<DragDropContainer blocks={mockBlocks} setBlocks={setBlocks} />);
    const blocks = screen.getAllByTestId('block');
    expect(blocks).toHaveLength(mockBlocks.length);
  });

  test('handles block duplication correctly', () => {
    renderWithContext(<DragDropContainer blocks={mockBlocks} setBlocks={setBlocks} />);
    const duplicateButton = screen.getAllByText('Duplicate')[0];
    fireEvent.click(duplicateButton);
    expect(setBlocks).toHaveBeenCalled();
  });

  test('handles block deletion correctly', () => {
    renderWithContext(<DragDropContainer blocks={mockBlocks} setBlocks={setBlocks} />);
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);
    expect(setBlocks).toHaveBeenCalled();
  });
});