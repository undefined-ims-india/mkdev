import React, { ReactElement, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';

const tagTypes = ['user', 'post', 'all'];

const tags = [
    { id: 1, name: 'Javascript', tag: 'post' },
    { id: 2, name: 'Typescript', tag: 'post' },
    { id: 3, name: 'Ruby', tag: 'post' },
    { id: 4, name: 'Fullstack', tag: 'user' },
    { id: 5, name: 'Backend', tag: 'user' },
    { id: 6, name: 'Web Dev', tag: 'user' },
    { id: 7, name: 'Game Dev', tag: 'user' },
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

    const handleSearch = () => {
        const names = selectedTags.map(tag => tag.name).join('-');
        axios.get(`/api/search/${tagType}/${names}`)
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error during search:', error);
            });
    };

    const changeSelectedEvent = (
        event: React.ChangeEvent<{}>,
        newValue: { id: number; name: string; tag: string }[]
    ) => {
        setSelectedTags(newValue);
    };

    return (
        <form>
            <FormControl variant='outlined' fullWidth>
                <InputLabel id='tagType-label'>Search By a Tag</InputLabel>
                <Select
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
                options={tags}
                getOptionLabel={(option) => option.name}
                value={selectedTags}
                onChange={changeSelectedEvent}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant='outlined'
                        label='Select Categories'
                        placeholder='Add Categories'
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
                Selected Categories: {selectedTags.map((tag) => tag.name).join(', ')}
            </div>
            <button type="button" onClick={handleSearch}>Search</button>
        </form>
    );
};

