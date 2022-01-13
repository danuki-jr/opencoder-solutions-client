import Head from 'next/head';
import { Container, Grid, Typography } from '@material-ui/core';
import base from '../styles/base.module.css';
import mcss from '../styles/maintenance.module.css';


export default function Maintenance() {

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

            <div className={mcss.maintenanceContainer}>
                <Container>
                    <div className={base.containerXPadding}>
                        <Grid container>
                            <Grid item xs={12}>
                                <div>
                                    <img src="./images/oc-logo.png" className={mcss.logo} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" alignItems="center" className={mcss.contentContainer}>
                            <Grid item xs={12}>
                                <Typography variant="h3" className={base.f500}>Our site is getting a little tune up</Typography>
                                <Typography variant="h6">We apologize for the inconvenience, but we’re performing some maintenance.</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </>
    )
}
