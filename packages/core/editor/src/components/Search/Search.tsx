import { useEffect, useRef } from 'react';

// components
import { Button } from '@graphiql-prototype/ui-library';

// hooks
import { useSearch } from '../../hooks';

// styles
import { StyledSearch, StyledSearchTriggerWrap } from './styles';

export const Search = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { searchBarVisible, setSearchBarVisible, searchValue, setSearchValue } =
    useSearch();

  useEffect(() => {
    const closeSearch = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchBarVisible({ bool: false });
      }
    };

    const searchHotKey = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        setSearchBarVisible({ bool: true });
      }
    };

    window.addEventListener('keydown', closeSearch);
    window.addEventListener('keydown', searchHotKey);

    return () => {
      window.removeEventListener('keydown', closeSearch);
      window.removeEventListener('keydown', searchHotKey);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchBarVisible && inputRef.current) {
      inputRef.current.focus();
    }

    if (searchBarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBarVisible]);

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapRef.current && wrapRef?.current.contains(e.target as Node)) {
      return;
    }
    setSearchBarVisible({ bool: false });
  };

  const handleChange = ({ value }: { value: string }) => {
    setSearchValue({ value });
  };

  return (
    <StyledSearch isActive={searchBarVisible} ref={wrapRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Quick search not yet implemented!"
        value={searchValue}
        onChange={(e) => handleChange({ value: e.currentTarget.value })}
      />
      <StyledSearchTriggerWrap>
        {searchBarVisible ? (
          <Button
            action={() => setSearchBarVisible({ bool: false })}
            icon="Close"
            label="Close schema search"
            size="LARGE"
            style="ICON"
          />
        ) : (
          <Button
            action={() => setSearchBarVisible({ bool: true })}
            icon="Search"
            label="Search schema"
            size="LARGE"
            style="ICON"
          />
        )}
      </StyledSearchTriggerWrap>
    </StyledSearch>
  );
};
