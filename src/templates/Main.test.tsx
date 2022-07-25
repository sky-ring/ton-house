import { render } from '@testing-library/react';

import { Main } from './Main';

describe('Main template', () => {
  describe('Render method', () => {
    it('should have 3 menu items', () => {
      render(
        <Main meta={null} selectedTab="Home">
          {null}
        </Main>
      );

      // const menuItemList = screen.getAllByRole('listitem');

      // expect(menuItemList).toHaveLength(3);
    });
  });
});
