
import React from 'react';
import Head from 'next/head';
import Link from 'next/Link';
import { withStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import layoutStyles from '../styles/layout.module.css';
import introStyles from '../styles/intro.module.css';
import Layout from '../components/main/layout';

const OrangeButton = withStyles({
    root: {
        backgroundColor: '#FF805D !important',
        color: 'rgb(236,236,236)',
        marginLeft: '0.75em',
        paddingTop: '0.7em',
        paddingBottom: '0.7em',
    }
})(Button);

class ThankYouPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shouldRender: false
        }
    }

    componentDidMount(){
        let shouldRedirect = true;
        if(typeof window !== 'undefined'){
            let hasSubmittedRequest = localStorage.getItem("hasSubmittedRequest");
            if(hasSubmittedRequest === 'true'){
                shouldRedirect = false;
                localStorage.removeItem('hasSubmittedRequest');
            }
        }
        if(shouldRedirect){
            window.location.replace('/');
        }
        else{
            this.setState({
                shouldRender: true
            });
        }
    }

    render(){
        return (
            <>
                {
                    this.state.shouldRender ? (
                        <Layout>
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

                            <Container disableGutters className={layoutStyles.noMaxWidth}>
                                <Grid container className={introStyles.container}>
                                    <div className={introStyles.containerOverlay} />
                                    <Grid item xs={1} />
                                    <Grid item xs={10} className={introStyles.introGrid}>
                                        <Grid container className={introStyles.thankYouContainer}>
                                            <Grid item xs={12}>
                                                <Typography variant="h3" className={introStyles.title}>Thanks for sending a request!</Typography>
                                                <br/>
                                                <Typography variant="h6"> We'll get back to you as soon as possible.</Typography>
                                                <Typography variant="h6">If you have any additional queries, you can always drop us an e-mail at support@opencodersolutions.net.</Typography>
                                                <br/>
                                                <br/>
                                                <Link href="/">
                                                    <OrangeButton variant="contained">
                                                        <Typography variant="subtitle1">
                                                            Back to Home
                                                        </Typography>
                                                    </OrangeButton>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} />
                                </Grid>
                            </Container>
                        </Layout>
                    ):(
                        <>
                        </>
                    )
                }
            </>

        );
    }
}

export default ThankYouPage;
