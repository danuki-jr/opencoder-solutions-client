import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { 
    Container, Grid, Typography, Slide, 
    Tabs, Tab, Box, AppBar, makeStyles, useTheme 
} from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import base from '../../styles/base.module.css';
import indexCss from '../../styles/index.module.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} style={{ textAlign: 'justify', paddingLeft: 0, paddingRight: 0 }}>
                <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const aboutImgCss = makeStyles((theme) => ({
    root: {
        height: '100%',
        paddingTop: '5px',
        paddingBottom: '5px',
        [theme.breakpoints.down('sm')]: {
            width: '30rem',
        },
        [theme.breakpoints.down('xs')]: {
            width: '20em',
        },
        [theme.breakpoints.up('md')]: {
            width: '30rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '38rem',
            position: 'relative',
            left: '6%',
        },
    },
}));

const tabCss = makeStyles((theme) => ({
    indicator: {
        backgroundColor: '#e3603a !important',
    },
}));

export default function About(props) {
    const aboutImgClass = aboutImgCss();
    const tabClass      = tabCss();
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 400,
    });

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange      = (event, newValue) => { setValue(newValue); };
    const handleChangeIndex = (index) => { setValue(index); };

    return (
        <div id="aboutus" className={base.containerYPadding}>
            <Container>
                <Grid container className={base.containerXPadding}>
                    <Slide direction="right" in={trigger} timeout={500}>
                        <Grid item xs={12} md={6} lg={5}>
                            <Typography variant="subtitle1" className={indexCss.sectionTitle}>ABOUT US</Typography>
                            <Typography variant="h4" className={indexCss.sectionTagline}>Providing Best IT Services</Typography>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                aria-label="full width tabs example" 
                                classes={{
                                    indicator: tabClass.indicator
                                }}
                            >
                                <Tab label="Company" {...a11yProps(0)} />
                                <Tab label="Mission" {...a11yProps(1)} />
                                <Tab label="Vision" {...a11yProps(2)} />
                            </Tabs>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <Typography variant="body1" component="span" className={base.lh2}>Based in the Philippines, OpenCoder Solutions is comprised of a small team of experienced app developers looking to create applications using various software technologies. We aim to server various clients with their software needs, and provide long-term service through systematical maintenance and updates.</Typography>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <Typography variant="body1" component="span" className={base.lh2}>To provide our clients with modern technology that will improve ease of living and convenience at a low cost.</Typography>
                                </TabPanel>
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <Typography variant="body1" component="span" className={base.lh2}>To make modern technology advancements accessible to everyone.</Typography>
                                </TabPanel>
                            </SwipeableViews>
                        </Grid>
                    </Slide>
                    <Slide direction="left" in={trigger} timeout={500}>
                        <Grid item xs={12} md={6} lg={7}>
                            <div className={base.textCenter}>
                                <img src="./images/about-us-img.png" className={aboutImgClass.root}></img>
                            </div>
                        </Grid>
                    </Slide>
                </Grid>
            </Container>
        </div>
    );
}