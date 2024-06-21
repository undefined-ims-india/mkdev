import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Tags from './Tags';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
	mobileOpen: boolean;
	onTransitionEnd: () => void;
	handleDrawerClose: () => void;
	handleDrawerTransitionEnd: () => void;
	handleDrawerToggle: () => void;
}

const drawerWidth = 240;

export default function Drawers(props: Props) {
	const {
		handleDrawerClose,
		mobileOpen,
		onTransitionEnd,
		handleDrawerTransitionEnd,
	} = props;

	return (
		<Box
			component='nav'
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			aria-label='mailbox folders'
		>
			<Drawer
				variant='temporary'
				open={mobileOpen}
				onTransitionEnd={handleDrawerTransitionEnd}
				onClose={handleDrawerClose}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
			>
				<Box>
					<IconButton onClick={handleDrawerClose}>
						<CloseIcon />
					</IconButton>
					<Tags />
				</Box>
			</Drawer>
			<Drawer
				variant='permanent'
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
				open
			>
				<Tags />
			</Drawer>
		</Box>
	);
}
