import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer Component', () => {
  describe('Render footer', () => {
    it('should contain current year', () => {
      render(<Footer />);

      const content = screen.getByRole('copyright');

      const year = new Date().getFullYear();

      expect(content).toHaveTextContent(`${year}`);
    });

    it('should link to socials', () => {
      render(<Footer />);

      const socials = screen.getAllByRole('social');

      expect(socials).toHaveLength(2);
    });
  });
});
