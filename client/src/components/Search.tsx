import React, { ReactElement, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import styled from '@mui/system/styled';

const tagTypes = ['User', 'Post', ];

const Form = styled('form')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
}));

const SelectContainer = styled(FormControl)(({ theme }) => ({
	minWidth: 120,
}));

const AutocompleteContainer = styled('div')(({ theme }) => ({
	width: '100%',
}));

const SearchButton = styled(Button)(({ theme }) => ({
	alignSelf: 'flex-start',
}));

const CustomChip = styled(Chip)(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

interface Tag {
	id: number;
	name: string;
	tag: string;
}

export default function SearchComponent(): ReactElement {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);

	const getAllTags = () => {
		axios
			.get('/api/tags')
			.then(({ data }) => {
				setTags(data);
			})
			.catch((error) => {
				console.error('Error fetching tags:', error);
			});
	};

	useEffect(() => {
		getAllTags();
	}, []);

    const handleSearch = () => {
        const names = selectedTags.map(tag => tag.name).join('-');
        console.log(names);
        axios.get(`/api/search/filter/${tagType}/${names}`)
            .then(({ data }) => {
                // console.log(data);
            })
            .catch((error) => {
                console.error('Error during search:', error);
            });
    };
	const [tagType, setTagType] = useState<string>('all');

	const handleChangeTagType = (event: SelectChangeEvent<string>) => {
		setTagType(event.target.value);
	};

	const handleSearch = () => {
		const names = selectedTags.map((tag) => tag.name).join('-');
		axios
			.get(`/api/search/${tagType}/${names}`)
			.then(({ data }) => {
				
			})
			.catch((error) => {
				console.error('Error during search:', error);
			});
	};

	const changeSelectedEvent = (
		event: React.SyntheticEvent,
		newValue: Tag[],
	) => {
		setSelectedTags(newValue);
	};

	return (
		<Form>
			<SelectContainer variant='outlined' fullWidth>
				<InputLabel id='tagType-label'>Search By a Tag</InputLabel>
				<Select
					value={tagType}
					onChange={handleChangeTagType}
					input={<OutlinedInput label='Search By a Tag' />}
					renderValue={(selected) => (
						<div>
							<CustomChip key={selected} label={selected} />
						</div>
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
				<Autocomplete
					multiple
					options={tags}
					getOptionLabel={(option: Tag) => option.name}
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
					renderTags={(value: Tag[], getTagProps) =>
						value.map((option: Tag, index: number) => (
							<CustomChip
								variant='outlined'
								label={option.name}
								{...getTagProps({ index })}
							/>
						))
					}
				/>
			</AutocompleteContainer>
			<SearchButton
				variant='contained'
				color='primary'
				onClick={handleSearch}
			>
				Search
			</SearchButton>
			<Divider />
		</Form>
	);
}
