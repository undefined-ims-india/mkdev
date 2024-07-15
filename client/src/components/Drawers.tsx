// import React, { useContext } from 'react';
// import { UserContext } from './UserContext';
// import { useNavigate } from 'react-router-dom';
// import Drawer from '@mui/material/Drawer';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { IconButton, ListItem, ListItemIcon } from '@mui/material';

// const drawerWidth = 240;

// export default function Drawers({ open, onClose, onToggle }) {
//   const navigate = useNavigate();
//   const { userId, userImage } = useContext(UserContext);

//   const DrawerList = () => (
//     <Box sx={{ width: 250 }} role='presentation' onClick={onClose}>
//       <List>
//         <ListItemButton onClick={() => navigate(`/user/${userId}/profile`)}>
//           <Avatar src={userImage} />
//           <ListItemText primary='Profile' />
//         </ListItemButton>
//       </List>
//       {/* <Divider /> */}
//     </Box>
//   );

//   return (
//     <Box
//       component='nav'
//       sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       aria-label='mailbox folders'
//     >

// <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         {/* <DrawerHeader> */}
//           <IconButton onClick={onClose}>
//             {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
//           </IconButton>
//         {/* </DrawerHeader> */}
//         <Divider />
//         <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       {/* <Drawer
//         variant='persistent'
//         open={true}
//         onClose={onClose}
//         ModalProps={{
//           keepMounted: true,
//         }}
//         anchor='left'
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': {
//             boxSizing: 'border-box',
//             width: drawerWidth,
//           },
//         }}
//       >
//         <DrawerList />
//       </Drawer> */}
//       </Box>
//   );
// }
