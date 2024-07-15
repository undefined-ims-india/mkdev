import React, {useState, useEffect} from 'react';
import { PostWithRelations } from '../../../../../types';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import FullPost from './FullPost';

export default () => {

  const [content, setContent] : [PostWithRelations | null, Function] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const {id} = useParams();

  const getPost = () => {
    axios.get(`/api/posts/${id}`)
    .then(({data}) => {
      setContent(data);
      setImageLink(`https://mkdev-ims-india.s3.us-east-2.amazonaws.com/${data.s3_key}`);
    })
  }

  useEffect(getPost, [content]);

  return (
    <>
      {content ? <FullPost content={content} imageLink={imageLink} getPost={getPost}/> : <></>}
    </>
  )
}