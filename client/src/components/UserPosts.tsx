// import React, { useState, ReactElement, useEffect } from 'react';
// import axios from 'axios';
// import UsersPost from './UsersPost';
// // interface Post {
// //   id: number;
// //   title: string;
// //   body: string;
// // }
// // interface ProfileProps {
// //   posts: Post[];
// // }

// const UserPosts = ({ userId }: { userId: number }): ReactElement => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const response = await axios.get(`/posts/user/${userId}`);
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch user posts:', error);
//         // Here you can handle the error, for example, set an error state
//       }
//     };

//     getPosts();
//   }, [userId]);
//   return (
//     <>
//       {posts.map((post) => (
//         <UsersPost key={post.id} post={post} />
//       ))}
//     </>
//   );
// };

// export default UserPosts;
