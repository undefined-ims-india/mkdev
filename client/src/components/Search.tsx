import React, { ReactElement, useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import Button from '@mui/material/Button';
import styled from '@mui/system/styled';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TagsAutoComplete from './TagsAutoComplete';
import { Tags } from '@prisma/client';

const tagTypes = ['User', 'Post'];

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const SelectContainer = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
}));

const AutocompleteContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: theme.spacing(2),
}));

const AutocompleteWrapper = styled('div')(({ theme }) => ({
  flex: 1,
}));

const SearchButton = styled(Button)(({ theme }) => ({
  flex: 0.25,
}));

const CustomChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SearchComponent(): ReactElement {
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);
  const [tagType, setTagType] = useState<string>('Post');
  const navigate = useNavigate();

  const getAllTags = async () => {
    try {
      const { data } = await axios.get('/api/tags/all/post');
      setTags(data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  const handleChangeTagType = (event: SelectChangeEvent<string>) => {
    setTagType(event.target.value);
  };

  const handleSearch = async () => {
    const names = selectedTags.map((tag) => tag.name).join('-');
    try {
      navigate(`/searchresults/${tagType}/${names}`);
      // const { data } = await axios.get(`/api/search/${tagType}/${names}`);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const changeSelectedEvent = (
    event: React.SyntheticEvent,
    newValue: Tags[],
  ) => {
    setSelectedTags(newValue);
  };

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Form
        sx={{
          width: '75vw',
          minWidth: 300,
          marginY: 2,
        }}
      >
        <SelectContainer variant='outlined' fullWidth>
          <InputLabel id='tagType-label'>Search By Tag Type</InputLabel>
          <Select
            value={tagType}
            onChange={handleChangeTagType}
            input={<OutlinedInput label='Search By Tag Type' />}
            renderValue={(selected) => (
              <CustomChip key={selected} label={selected} />
            )}
          >
            {tagTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </SelectContainer>
        <AutocompleteContainer>
          <AutocompleteWrapper>
            <TagsAutoComplete all={tags} selected={selectedTags} handleChange={changeSelectedEvent} />
          </AutocompleteWrapper>
          <SearchButton
            variant='contained'
            color='primary'
            onClick={handleSearch}
          >
							<ManageSearchIcon fontSize='large' />
          </SearchButton>
        </AutocompleteContainer>
      </Form>
    </Box>
  );
}
