import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import axios from 'axios';

interface TagsResponse {
	id: number;
	tagType: 'User' | 'Post';
	name: string;
}

const Tags = () => {
	const [userTags, setUserTags] = useState<TagsResponse[]>([]);

	const getUserTags = async () => {
		try {
			const { data } = await axios.get('/api/tags');
			setUserTags(data.tags);
		} catch (error) {
			console.error('Error fetching user tags:', error);
		}
	};

	useEffect(() => {
		getUserTags();
	}, []);

	const handleClick = async (id: number) => {
		console.log(id, 'YOU CLICKED!!');
		try {
			await axios.patch(`/api/tags/${id}`);
			getUserTags();
		} catch (error) {
			console.error('Error deleting tag:', error);
		}
	};

	return (
		<div>
			{userTags.map((tag) => (
				<Chip
					key={tag.id}
					label={tag.name}
					onClick={() => handleClick(tag.id)}
				/>
			))}
		</div>
	);
};

export default Tags;
