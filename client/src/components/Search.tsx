import React, { ReactElement, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

const tagTypes = ['users', 'post', 'all'];

const tags = [
  { id: 1, name: 'Javascript', tag: 'post' },
  { id: 2, name: 'Typescript', tag: 'post' },
  { id: 3, name: 'Ruby', tag: 'post' },
  { id: 4, name: 'Fullstack', tag: 'users' },
  { id: 5, name: 'Backend', tag: 'users' },
  { id: 6, name: 'Web Dev', tag: 'users' },
  { id: 7, name: 'Game Dev', tag: 'users' },
  { id: 8, name: 'Go', tag: 'post' },
  { id: 9, name: 'Rust', tag: 'post' },
  { id: 10, name: 'HTML', tag: 'post' },
];

export default function SearchComponent(): ReactElement {
  const [selectedTags, setSelectedTags] = useState<
    { id: number; name: string; tag: string }[]
  >([]);

  const [tagType, setTagType] = useState<string>('all');

  const handleChangeTagType = (event: SelectChangeEvent<string>) => {
    setTagType(event.target.value);
  };

  return (
    <form>
      <FormControl variant='outlined' fullWidth>
        <InputLabel id='tagType-label'>Search By a Tag</InputLabel>
        <Select
          labelId='tagType-label'
          id='tagType'
          value={tagType}
          onChange={handleChangeTagType}
          input={<OutlinedInput label='Search By a Tag' />}
          renderValue={(selected) => (
            <div>
              <Chip key={selected} label={selected} />
            </div>
          )}
        >
          {tagTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Autocomplete
        multiple
        id='people-select'
        options={tags}
        getOptionLabel={(option) => option.name}
        value={selectedTags}
        onChange={(event, newValue) => {
          setSelectedTags(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Select People'
            placeholder='Add People'
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant='outlined'
              label={option.name}
              {...getTagProps({ index })}
            />
          ))
        }
      />
      <div>
        Selected People: {selectedTags.map((tag) => tag.name).join(', ')}
      </div>
    </form>
  );
};

