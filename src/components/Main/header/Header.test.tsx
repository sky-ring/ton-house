import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Main template', () => {
  describe('Render method', () => {
    it('should have 3 menu items', () => {
      render(<Header />);

      const menuItemList = screen.getAllByRole('listitem');

      expect(menuItemList).toHaveLength(3);
    });
  });
});
