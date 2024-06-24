import * as React from 'react';
import { IconButton, AppBar, Toolbar, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawers from './Drawers';

const drawerWidth = 240; 

export default function Sidebar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawers
                mobileOpen={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
            </Box>
        </Box>
    );
}
