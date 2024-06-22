import React, { useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import SearchComponent from './Search';
import Post from './Post';
import { PostWithRelations } from '../../../types';

export default function SearchResults() {
	const { tagType, tags } = useParams();
  const [feed, setFeed]:[PostWithRelations[], Function] = useState([]);
  const feedRef = useRef(feed)

  useEffect(() => {
    axios.get(`/api/search/filter/${tagType}/${tags}`)
      .then(({data}) => {
        setFeed(data.posts);
      })
  }, [feedRef])

  console.log(feed);
	return (
		<Box sx={{ display: 'flex' }}>
      <h1>This is the Search Results!!</h1>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<SearchComponent />
				{feed.map((post) => (
					<Post key={post.id + post.title} content={post} />
				))}
			</Box>
		</Box>
	);
}
