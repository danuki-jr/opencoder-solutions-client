import { Button, Container, Grid, Typography, withStyles, makeStyles } from '@material-ui/core';
import base from '../../styles/base.module.css';
import indexCss from '../../styles/index.module.css';
import Link from 'next/link';

const RequestButton = withStyles({
    root: {
        color: '#fff',
        backgroundColor: '#ff805d',
        '&:hover': {
            backgroundColor: '#e55f39',
        },
        marginLeft: '4px',
        padding: '15px',
        width: '200px',
    },
})(Button);

const titleCss = makeStyles((theme) => ({
    root: {
        color: '#fff',
        marginBottom: '20px',
        textShadow: '2px 2px 5px rgb(0 0 0 / 30%)',
    },
    h3: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.5rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '3rem',
        }
    },
}));
  
export default function Intro() {
    const titleClass = titleCss();

    return (
        <div id="home" className={indexCss.homeContainer}>
            <div className={indexCss.homeOverlay}/>
            <Container style={{zIndex:1}}>
                <Grid container className={base.containerXPadding}>
                    <Grid item xs={12} md={7} lg={8}>
                        <div>
                            <Typography variant="h3" component="h1" 
                                classes={{
                                    root: titleClass.root,
                                    h3: titleClass.h3,
                                }}
                            >Bringing you Quality Software Based on your Needs</Typography>
                            <Link href="/submit-a-request">
                                <RequestButton variant="contained">Submit a Request</RequestButton>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}