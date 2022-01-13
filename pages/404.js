import Head from 'next/head';
import { Container, Grid, Typography, Button, makeStyles, withStyles } from '@material-ui/core';
import base from '../styles/base.module.css';
import pagecss from '../styles/404.module.css';
import Link from 'next/link';

const image404Css = makeStyles((theme) => ({
    root: {
        height: '100%',
        paddingTop: '5px',
        paddingBottom: '5px',
        [theme.breakpoints.down('xs')]: {
            width: '18em',
        },
        [theme.breakpoints.down('sm')]: {
            width: '20rem',
        },
        [theme.breakpoints.up('md')]: {
            width: '24rem',
        },
        [theme.breakpoints.up('lg')]: {
            width: '28rem',
        },
    },
}));

const GoBackButton = withStyles({
    root: {
        color: '#fff',
        backgroundColor: '#ff805d',
        '&:hover': {
            backgroundColor: '#e55f39',
        },
        marginTop: '15px',
        padding: '10px 15px',
        width: '200px',
    },
})(Button);

export default function Custom404() {
    const img404 = image404Css();
    return (
        <>
            <Head>
                <title>OpenCoder Solutions</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Bringing you quality software based on your needs."></meta>
                <meta
                    property="og:title"
                    content="OpenCoder Solutions"
                />
                <meta
                    property="og:description"
                    content="Bringing you quality software based on your needs."
                />
                <meta
                    property="og:image"
                    content="/images/logo.png"
                />
                <meta name="KeyWords" content="OpenCoder Solutions" />
            </Head>

            <div className={pagecss.page404Container}>
                <Container>
                    <div className={base.containerXPadding}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Link href="/">
                                    <div>
                                        <img src="./images/oc-logo.png" className={pagecss.logo} />
                                    </div>
                                </Link>
                            </Grid>
                        </Grid>
                        <div className={pagecss.contentContainer}>
                            <Grid container justify="center" alignItems="center">
                                <Grid item xs={12} md={6} lg={6}>
                                    <div className={base.textCenter}>
                                        <img src="./images/404-image.png" className={img404.root} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Typography variant="h4" className={base.f500}>We couldn't find what your looking for.</Typography>
                                    <Typography variant="body1">Unfortunately the page you were looking for could not be found, it may be temporarily unavailable, moved or no longer exist.</Typography>
                                    <Link href="/">
                                        <GoBackButton variant="contained">Go Back to Home</GoBackButton>
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
