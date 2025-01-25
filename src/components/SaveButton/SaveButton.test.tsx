import { render, screen, fireEvent } from '@testing-library/react';
import SaveButton from './SaveButton';
import { Block } from '@common/types';

describe('SaveButton', () => {
  const mockBlocks: Block[] = [
    { id: '1', type: 'text', content: 'Block 1' },
    { id: '2', type: 'image', src: 'image1.jpg' },
  ];

  test('renders correctly', () => {
    render(<SaveButton blocks={mockBlocks} />);
    const button = screen.getByText('Save');
    expect(button).toBeInTheDocument();
  });

  test('calls handleSave when button is clicked', () => {
    console.log = jest.fn(); // Mock console.log
    render(<SaveButton blocks={mockBlocks} />);
    const button = screen.getByText('Save');
    fireEvent.click(button);
    expect(console.log).toHaveBeenCalledWith('Landing Page Data:', JSON.stringify(mockBlocks, null, 2));
  });
});