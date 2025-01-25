import { render, screen, fireEvent } from '@testing-library/react';
import ImageBlock from './ImageBlock';
import img1 from '@assets/img1.jpg';

describe('ImageBlock', () => {
  const mockOnImageSelect = jest.fn();

  beforeEach(() => {
    mockOnImageSelect.mockClear();
  });

  test('renders with the correct initial state', () => {
    render(<ImageBlock id="1" selectedImage="" onImageSelect={mockOnImageSelect} />);
    const placeholder = screen.getByText('Select Image');
    expect(placeholder).toBeInTheDocument();
  });

  test('displays image selector when placeholder is clicked', () => {
    render(<ImageBlock id="1" selectedImage="" onImageSelect={mockOnImageSelect} />);
    const placeholder = screen.getByText('Select Image');
    fireEvent.click(placeholder);
    const imageSelector = screen.getByRole('img', { name: /Selectable 0/i });
    expect(imageSelector).toBeInTheDocument();
  });

  test('displays image selector when selected image is clicked', () => {
    render(<ImageBlock id="1" selectedImage={img1} onImageSelect={mockOnImageSelect} />);
    const selectedImage = screen.getByAltText('Selected');
    fireEvent.click(selectedImage);
    const imageSelector = screen.getByRole('img', { name: /Selectable 0/i });
    expect(imageSelector).toBeInTheDocument();
  });

  test('calls onImageSelect with correct arguments when an image is selected', () => {
    render(<ImageBlock id="1" selectedImage="" onImageSelect={mockOnImageSelect} />);
    const placeholder = screen.getByText('Select Image');
    fireEvent.click(placeholder);
    const selectableImage = screen.getByRole('img', { name: /Selectable 0/i });
    fireEvent.click(selectableImage);
    expect(mockOnImageSelect).toHaveBeenCalledWith('1', img1);
  });
});