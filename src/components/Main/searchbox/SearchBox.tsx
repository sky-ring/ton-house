import React, { useState } from 'react';

import SearchIcon from '@/components/icons/search';
import styles from '@/styles/main/searchbox.module.scss';

import Card from '../card/Card';

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

type SearchBoxProps = {
  title?: string;
};

export default function SearchBox(props: SearchBoxProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    // search functionality
  };

  return (
    <div className={styles.container}>
      {props.title ? <h2>{props.title}</h2> : null}
      <Card className={styles.searchContainer}>
        <form className={styles.search} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchInput}
          />
          <SearchButton onClick={handleSearch} />
        </form>
      </Card>
    </div>
  );
}
