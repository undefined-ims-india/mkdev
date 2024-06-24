import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import SearchComponent from './Search';
import Post from './Post';
import { PostWithRelations } from '../../../types';

export default function SearchResults() {
	const { tagType, tags } = useParams();
	const [postFeed, setPostFeed]: [PostWithRelations[], Function] = useState(
		[],
	);
	const [userFeed, setUserFeed] = useState([]);
	const feedRef = useRef(postFeed);

	const getSearch = () => {
		axios.get(`/api/search/filter/${tagType}/${tags}`).then(({ data }) => {
			if (tagType === 'User') {
				let users = data.reduce((acc: any, curr: any) => {
					acc.push(curr.user);
					return acc;
				}, []);
				console.log(users.flat());
				return setUserFeed(users.flat());
			}
      // else if tagType is equal to posts
			data.reduce((acc: any, curr: any) => {
				acc.push(curr.posts);
				return acc;
			}, []);
			return setPostFeed(data[0].posts);
		});
	}

	useEffect(() => {
		getSearch();
	}, []);

	try {
		return (
			<Box sx={{ display: 'flex' }}>
				<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
					<SearchComponent />
					{postFeed.map((post) => {
						return (
							<Post key={post.id + post.title} content={post} refreshParent={getSearch}/>
						);
					})}
				</Box>
			</Box>
		);
	} catch (err) {
		console.error;
		return <></>;
	}
}
