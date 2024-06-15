import React, {
  useState,
  useEffect,
  ReactElement,
  useRef,
  SyntheticEvent,
} from 'react';
import axios from 'axios';
import Nav from './Nav';
import UserPosts from './UserPosts';
import Blogs from './Blogs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Follow from './Follow';

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinId: string;
  githubId: string;
  devId: string;
  sub: string;
  username: string;
  picture: string;
  postCount: string;
  followedBy: User[];
  following: User[];
}
interface Post {
  id: string;
  userId: number;
  author: string;
  title: string;
  body: string;
}

const Profile = (): ReactElement => {
  const [user, setUser] = useState<User>({} as User);
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState<string>('');
  const [following, setFollowing] = useState([]);
  const [followedBy, setFollowedBy] = useState([]);

  const userRef = useRef(user);

  const [tab, setTab] = useState('1');

  const handleTab = (e: SyntheticEvent, newTab: string) => {
    setTab(newTab);
  };

  // get loggedIn user
  const getUser = () => {
    if (user) {
      axios
        .get('/api/users/loggedIn')
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {
          console.error('Failed to get user:', err);
        });
    }
  };

  const checkUsername = () => {
    return user.username === null || user.username === ''
      ? user.name
      : user.username;
  };

  const getPosts = () => {
    if (!user) {
      return;
    }
    axios
      .get<Post[]>(`/api/posts/`)
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((err) => {
        console.error('Failed to fetch posts:', err);
      });
  };
  useEffect(() => {
    setUsername(checkUsername());
    getPosts();
  }, [user]);

  useEffect(() => {
    getUser();
  }, [userRef]);

  return (
    <>
      {user ? (
        <div>
          <Nav />
          <div>
            <h4>{`${username}`}</h4>
            <img
              src={user?.picture}
              alt={user?.name}
              style={{ width: 100, height: 100 }}
            />
            <p> LinkedIn: {user?.linkedinId}</p>
            <p>
              Dev.to:{' '}
              <a href={`https://dev.to/${user?.devId}`} target='blank' rel=''>
                {user?.devId}
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a
                href={`https://github.com/${user?.githubId}`}
                target='blank'
                rel=''
              >
                {user?.githubId}
              </a>
            </p>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleTab}
                    aria-label='lab API tabs example'
                  >
                    <Tab label='Posts' value='1' />
                    <Tab label='Dev.to Blogs' value='2' />
                    <Tab label='Followers' value='3' />
                    <Tab label='Following' value='4' />
                  </TabList>
                </Box>
                <TabPanel value='1'>
                  {<UserPosts posts={posts} getPosts={getPosts} />}
                </TabPanel>
                <TabPanel value='2'>
                  {<Blogs devId={`${user.devId}`} />}
                </TabPanel>
                <TabPanel value='3'>Followers</TabPanel>
                <TabPanel value='4'>Following</TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      ) : (
        <p>Please log in to view your Profile</p>
      )}
    </>
  );
};

export default Profile;
