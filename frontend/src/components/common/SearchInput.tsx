'use client';

import { TextField, InputAdornment } from '@mui/material';
import { HiSearch } from 'react-icons/hi';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

const SearchInput = ({
  placeholder = '검색어를 입력하세요',
  value,
  onChange,
  onSearch,
}: SearchInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      size="medium"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <HiSearch className="text-gray-500" size={20} />
          </InputAdornment>
        ),
        sx: {
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          '& fieldset': {
            border: '1px solid #e9ecef',
          },
          '&:hover fieldset': {
            border: '1px solid #dee2e6',
          },
          '&.Mui-focused fieldset': {
            border: '2px solid #4285f4',
          },
        },
      }}
      sx={{
        '& .MuiOutlinedInput-input': {
          padding: '12px 2px',
        },
      }}
    />
  );
};

export default SearchInput;
