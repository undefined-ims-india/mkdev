import React from 'react';
import { Tags } from '@prisma/client'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import styled from '@mui/system/styled';

const CustomChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default (
  {selected, all, handleChange}
  :{
    selected: Tags[],
    all: Tags[],
    handleChange(event: React.SyntheticEvent, newValue: Tags[]):void}) => {
  return (
      <Autocomplete
        multiple
        options={all}
        getOptionLabel={(option: Tags) => option.name}
        value={selected}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label='Select Tags'
            placeholder='Add Tags'
          />
        )}
        renderTags={(value: Tags[], getTagProps) =>
          value.map((option: Tags, index: number) => (
            <CustomChip
              variant='outlined'
              label={option.name}
              {...getTagProps({ index })}
            />
          ))
        }
      />
  )
}