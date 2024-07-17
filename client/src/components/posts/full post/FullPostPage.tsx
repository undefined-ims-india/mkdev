import React, {useState, useEffect, useRef} from 'react';
import { PostWithRelations } from '../../../../../types';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import FullPost from './FullPost';

export default () => {

  const [content, setContent] : [PostWithRelations | null, Function] = useState(null);
  const contentREF = useRef(content)
  const [imageLink, setImageLink] = useState('');
  const {id} = useParams();

  const getPost = () => {
    axios.get(`/api/posts/${id}`)
    .then(({data}) => {
      setContent(data);
      setImageLink(`https://mkdev-ims-india.s3.us-east-2.amazonaws.com/${data.s3_key}`);
    })
  }

  useEffect(getPost, [contentREF]);

  return (
    <>
      {content ? <FullPost content={content} imageLink={imageLink} getPost={getPost}/> : <></>}
    </>
  )
}