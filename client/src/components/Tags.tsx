import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';


interface TagsResponse {
    id: number;
    tagType: 'User' | 'Post';
    name: string;
}

const Tags = () => {
    const [userTags, setUserTags] = useState<TagsResponse[]>([]);
    const navigate = useNavigate();

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
                <ListItem>
                    <ListItemButton onClick={() => navigate('/survey')}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText>Your Interests</ListItemText>
                    </ListItemButton>
                </ListItem>
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
            {renderTagsByType('Post')}
        </div>
    );
};

export default Tags;
