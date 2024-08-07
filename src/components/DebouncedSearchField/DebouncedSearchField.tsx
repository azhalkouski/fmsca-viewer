
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useDebouncedCallback } from 'use-debounce';

const DebouncedSearchField = ({
  defaultValue = '',
  onChange,
}: {
  defaultValue?: string;
  onChange: (searchStr: string) => void;
}) => {
  const [searchString, setSearchString] = useState<string>(defaultValue);

  const handleInternalOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSearchString(value);
    serveOuterOnChange(value);
  };

  const serveOuterOnChange = useDebouncedCallback((searchStr: string) => {
    onChange(searchStr);
  }, 300);

  return (
    <TextField
      fullWidth
      label="searchField"
      id="searchField"
      value={searchString}
      onChange={handleInternalOnChange}
      />
  );
};

export default DebouncedSearchField;
