import { render, screen } from '@testing-library/react';

import SearchBox from './SearchBox';

describe('SearchBox Component', () => {
  describe('Render header', () => {
    it('should have placeholder', () => {
      render(<SearchBox />);

      const input = screen.getByPlaceholderText('Search');

      expect(input).toBeVisible();
    });
  });
});
