import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('renders correctly', () => {
    render(<Navbar />);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  test('displays the logo image', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('displays the brand text', () => {
    render(<Navbar />);
    const brandText = screen.getByText('React Drag & Drop Builder');
    expect(brandText).toBeInTheDocument();
  });
});