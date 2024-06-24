import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
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
		try {
			await axios.patch(`/api/tags/${id}`);
			await getUserTags();
		} catch (error) {
			console.error('Error deleting tag:', error);
		}
	};

    const renderTagsByType = (tagType: 'User' | 'Post') => {
        return (
            <List>
                {userTags.filter(tag => tag.tagType === tagType).map(tag => (
                    <ListItem key={tag.id}>
                        <Chip
                            label={tag.name}
                            onClick={() => handleClick(tag.id)}
                        />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <div>
            <Typography variant="h6">User Tags</Typography>
            {renderTagsByType('User')}
            <Divider />
            <Typography variant="h6">Post Tags</Typography>
            {renderTagsByType('Post')}
        </div>
    );
};

export default Tags;
