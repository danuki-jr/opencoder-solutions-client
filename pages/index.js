import Head from 'next/head';
import { Container } from '@material-ui/core';
import base from '../styles/base.module.css';
import layoutStyles from '../styles/layout.module.css';
import Layout from '../components/main/layout';
import Intro from '../components/home/intro';
import About from '../components/home/about';
import HowWeWorks from '../components/home/how-we-works';
import Services from '../components/home/services';
import WhyUs from '../components/home/whyus';
import Technologies from '../components/home/technologies';
import ContactUs from '../components/home/contactus';


export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>OpenCoder Solutions</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="prefetch" href="/images/bg-image.jpg"/>
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

            <Container disableGutters className={`${layoutStyles.noMaxWidth} ${base.overflowHide}`}>
                <Intro />
                <About />
                <HowWeWorks />
                <Services />
                <Technologies />
                <ContactUs />
            </Container>
        </Layout>
    )
}
