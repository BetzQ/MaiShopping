import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { FormControl, InputLabel, Input, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

type SearchBarProps = {
  onSearch: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      onSearch('')
    } else {
      onSearch(searchTerm.trim())
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <FormControl sx={{ my: 2, width: '100%' }}>
      <InputLabel htmlFor="search-input">Search</InputLabel>
      <Input
        id="search-input"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        endAdornment={
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        }
      />
    </FormControl>
  )
}

export default SearchBar
