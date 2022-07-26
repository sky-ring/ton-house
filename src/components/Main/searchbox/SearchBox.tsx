import React, { useState } from 'react';

import SearchIcon from '@/components/icons/search';
import styles from '@/styles/main/searchbox.module.scss';

type SearchButtonProps = {
  onClick?: () => void;
};
function SearchButton(props: SearchButtonProps) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <SearchIcon />
    </button>
  );
}

export default function SearchBox() {
  const [searchText, setSearchText] = useState('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    // search functionality
  };

  return (
    <form className={styles.container} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={handleSearchInput}
      />
      <SearchButton onClick={handleSearch} />
    </form>
  );
}
