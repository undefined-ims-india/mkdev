import React from 'react';
import { Tags } from '@prisma/client'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

export default (
  {selected, all, handleChange}
  :{
    selected: Tags[],
    all: Tags[],
    handleChange(event: React.SyntheticEvent, newValue: Tags[]):void
  }) => {
  return (
      <Autocomplete
        multiple
        options={all.filter(opt => !selected.map(opt => opt.name).includes(opt.name))}
        getOptionLabel={(option: Tags) => option.name}
        value={selected}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant='outlined'
            label='Select Tags'
            placeholder='Add Tags'
          />
        )}
        renderTags={(value: Tags[], getTagProps) =>
          value.map((option: Tags, index: number) => (
            <Chip
              variant='outlined'
              label={option.name}
              {...getTagProps({ index })}
            />
          ))
        }
      />
  )
}