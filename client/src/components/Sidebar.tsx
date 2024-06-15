import * as React from 'react';
import { Chip } from '@mui/material';
import Drawers from './Drawers';

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
        <Drawers mobileOpen={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            handleDrawerClose={handleDrawerClose}
            handleDrawerTransitionEnd={handleDrawerTransitionEnd}
            handleDrawerToggle={handleDrawerToggle}
        />
    );
}

