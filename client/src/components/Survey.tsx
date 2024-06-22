import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SurveyTag from './SurveyTag';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface TagsResponse {
	id: number;
	tagType: 'User' | 'Post';
	name: string;
}

export default function Signup() {
	const [allUserTags, setUserTags] = useState<TagsResponse[]>([]);
	const [allPostTags, setPostTags] = useState<TagsResponse[]>([]);
	const [selectedTags, setSelectedTags] = useState<TagsResponse[]>([]);
	const navigate = useNavigate();

	const handleSubmit = (selectedTags: TagsResponse[]) => {
		console.log('hiii', selectedTags);
		axios
			.post('/api/tags/all',{tags: selectedTags})
			.then(getAllTags)
			.then(() => navigate('/dashboard'));
	};

	const getAllTags = async () => {
		try {
			const { data } = await axios.get('/api/tags/all');
			console.log(data);
			setUserTags(data.User || []);
			setPostTags(data.Post || []);
		} catch (error) {
			console.error('Error fetching tags:', error);
		}
	};

	const toggleTag = (tag: TagsResponse) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
		} else {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	useEffect(() => {
		getAllTags();
	}, []);

	return (
		<Container maxWidth="md">
			<Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
				<Typography variant="h4" gutterBottom>
					Signup
				</Typography>
				<form onSubmit={(e) => { e.preventDefault(); handleSubmit(selectedTags); }}>
					<Box marginBottom={3}>
						<Typography variant="h5" gutterBottom>
							Select User Tags
						</Typography>
						<Grid container spacing={2}>
							{allUserTags.map((tag) => (
								<Grid item key={tag.id}>
									<SurveyTag
										tag={tag}
										selectedTags={selectedTags}
										toggleTag={toggleTag}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
					<Box marginBottom={3}>
						<Typography variant="h5" gutterBottom>
							Select Post Tags
						</Typography>
						<Grid container spacing={2}>
							{allPostTags.map((tag) => (
								<Grid item key={tag.id}>
									<SurveyTag
										tag={tag}
										selectedTags={selectedTags}
										toggleTag={toggleTag}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={() => handleSubmit(selectedTags)}
					>
						Submit Selected Tags
					</Button>
				</form>
			</Paper>
		</Container>
	);
}
