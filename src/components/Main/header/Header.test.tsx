import { render, screen } from '@testing-library/react';

import { AppConfig } from '@/utils/AppConfig';

import Header from './Header';
import { Tabs } from './Tabs';

describe('Header Component', () => {
  describe('Render header', () => {
    it('should have title', () => {
      render(<Header tab="Home" />);

      const title = screen.getByText(AppConfig.title);

      expect(title).toBeVisible();
    });

    it('should have tabs component', () => {
      render(<Header tab="Home" />);

      const tabs = screen.getAllByRole('tab');

      expect(tabs).toHaveLength(6);
      expect(tabs[0]?.textContent).toEqual('Home');
    });
  });

  describe('Render tabs', () => {
    it('should have 6 tabs', () => {
      render(<Tabs selected="Home" />);

      const tabs = screen.getAllByRole('tab');

      expect(tabs).toHaveLength(6);
      expect(tabs[0]?.textContent).toEqual('Home');
      expect(tabs[1]?.textContent).toEqual('Validators');
      expect(tabs[2]?.textContent).toEqual('Transactions');
      expect(tabs[3]?.textContent).toEqual('Blocks');
      expect(tabs[4]?.textContent).toEqual('Tokens');
      expect(tabs[5]?.textContent).toEqual('Supply');
    });
  });

  it('should have the selected tab underlined', () => {
    render(<Tabs selected="Home" />);

    const tabs = screen.getAllByRole('tab');

    expect(tabs[0]?.classList).toContain('tabSelected');
    expect(tabs[1]?.classList).not.toContain('tabSelected');
  });
});
