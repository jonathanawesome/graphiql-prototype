// components
import { Button } from '@graphiql-prototype/ui-library';
import { useEffect, useRef, useState } from 'react';

// styles
import { StyledSearch, StyledSearchTriggerWrap } from './styles';

export const Search = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>(``);

  useEffect(() => {
    const closeSearch = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsActive(false);
      }
    };

    const searchHotKey = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        setIsActive(true);
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
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapRef.current && wrapRef?.current.contains(e.target as Node)) {
      return;
    }
    setIsActive(false);
  };

  const handleChange = ({ value }: { value: string }) => {
    setValue(value);
  };

  return (
    <StyledSearch isActive={isActive} ref={wrapRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Quick search not yet implemented!"
        value={value}
        onChange={(e) => handleChange({ value: e.currentTarget.value })}
      />
      <StyledSearchTriggerWrap>
        {isActive ? (
          <Button
            action={() => setIsActive(!isActive)}
            icon="Close"
            label="Close schema search"
            size="LARGE"
            variant="ICON"
          />
        ) : (
          <Button
            action={() => setIsActive(!isActive)}
            icon="Search"
            label="Search schema"
            size="LARGE"
            variant="ICON"
          />
        )}
      </StyledSearchTriggerWrap>
    </StyledSearch>
  );
};
