import React from 'react';
import Chip from '@mui/material/Chip';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface Props {
	tag: TagsResponse;
	selectedTags: TagsResponse[];
	toggleTag: (tag: TagsResponse) => void;
}

interface TagsResponse {
	id: number;
	tagType: 'User' | 'Post';
	name: string;
}

const TagChip: React.FC<Props> = ({ tag, selectedTags, toggleTag }) => {
	const isSelected = selectedTags.includes(tag);

	const chipStyles: SxProps<Theme> = {
		backgroundColor: isSelected ? 'lightgray' : 'default',
		borderColor: isSelected ? 'black' : 'default',
	};

	return (
		<Chip
			label={tag.name}
			variant={isSelected ? 'outlined' : 'filled'}
			onClick={() => toggleTag(tag)}
			sx={chipStyles}
		/>
	);
};

export default TagChip;
