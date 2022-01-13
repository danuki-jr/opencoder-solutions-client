import {
    Typography, Button, AppBar, Toolbar, IconButton, Drawer, MenuItem, Container
} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import base from '../../styles/base.module.css';
import layoutStyles from '../../styles/layout.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const headerMenu = [
    { label: 'About Us', section: 'aboutus' },
    { label: 'How We Work', section: 'howwework' },
    { label: 'Services', section: 'services' },
    { label: 'Technologies', section: 'technologies' },
    { label: 'Contact Us', section: 'contactus' },
];

export default function Header({ children, home, props }) {
    const router    = useRouter();
    const headerCss = router.pathname === '/' ? layoutStyles.indexHeader : layoutStyles.appHeader;

    const handleClick = (event, id) => {
        if(home){
            const anchor = (event.target.ownerDocument || document).querySelector(`#${id}`);
            if (anchor) {
              anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        else{
            router.push(`/#${id}`);
        }
    }

    const [viewState, setViewState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const [relative, sticky] = useState(false);

    const { mobileView, drawerOpen } = viewState;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 1152
                ? setViewState((prevState) => ({ ...prevState, mobileView: true }))
                : setViewState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());
        window.addEventListener("scroll", () => {
            sticky(window.scrollY > 50);
        });
    }, []);

    const ocLogo = (
        <Link href="/">
            <div>
                <img src="./images/oc-logo.png" className={[layoutStyles.appLogo, relative ? layoutStyles.smLogo : ''].join(' ')} />
            </div>
        </Link>
    );

    const getMenu = () => {
        return headerMenu.map(({ label, section }) => {
            return (
                <Button key={label} onClick={(e) => handleClick(e, section)} color="inherit" className={layoutStyles.appMenu}>
                    <Typography variant="inherit" className={base.textShadow}>{label}</Typography>
                </Button>
            );
        });
    };

    const getDrawer = () => {
        return headerMenu.map(({ label, section }) => {
            return (
                <MenuItem key={label} onClick={(e) => handleClick(e, section)}>{label}</MenuItem>
            );
        });
    };

    const displayDesktop = () => {
        return (
            <Container>
                <Toolbar className={layoutStyles.appToolbar}>
                    {ocLogo}
                    <div>{getMenu()}</div>
                </Toolbar>
            </Container>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setViewState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setViewState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar>
                <IconButton {...{ edge: "start", color: "inherit", onClick: handleDrawerOpen }}>
                    <MenuIcon />
                </IconButton>
                <Drawer {...{ open: drawerOpen, onClose: handleDrawerClose }}>
                    <div className={layoutStyles.appDrawer}>{getDrawer()}</div>
                </Drawer>
                <div>{ocLogo}</div>
            </Toolbar>
        );
    };

    return (
        <React.Fragment>
            <AppBar id="header" className={[headerCss, relative ? layoutStyles.shadow : ''].join(' ')}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
            <Toolbar id="back_to_top"/>
        </React.Fragment>
    );
}
