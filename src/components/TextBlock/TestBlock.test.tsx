import { render, screen, fireEvent } from '@testing-library/react';
import TextBlock from './TextBlock';

describe('TextBlock', () => {
  const mockOnContentChange = jest.fn();

  beforeEach(() => {
    mockOnContentChange.mockClear();
  });

  test('renders with the correct initial content', () => {
    render(<TextBlock id="1" content="Initial content" onContentChange={mockOnContentChange} />);
    const textBlock = screen.getByText('Initial content');
    expect(textBlock).toBeInTheDocument();
  });

  test('calls onContentChange with updated content when editing is finished', () => {
    render(<TextBlock id="1" content="Initial content" onContentChange={mockOnContentChange} />);
    const textBlock = screen.getByText('Initial content');
    fireEvent.click(textBlock);
    fireEvent.input(textBlock, { target: { innerText: 'Updated content' } });
    fireEvent.blur(textBlock);
    expect(mockOnContentChange).toHaveBeenCalledWith('1', 'Updated content');
  });
});