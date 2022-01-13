import { Grid, Typography, Container, Fade, Grow } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import base from '../../styles/base.module.css';
import indexCss from '../../styles/index.module.css';
import clsx from 'clsx';
import LayersIcon from '@material-ui/icons/Layers';
import WebIcon from '@material-ui/icons/Web';
import LanguageIcon from '@material-ui/icons/Language';
import SmartphoneIcon from '@material-ui/icons/Smartphone';

export default function Services(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 1500,
    });

    const trigger2 = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 1600,
    });

    return (
        <div id="services" className={indexCss.serviceContainer}>
            <Container>
                <div className={base.containerXPadding}>
                    <Fade in={trigger} timeout={500}>
                        <div className={base.textCenter}>
                            <Typography variant="subtitle1" className={clsx(indexCss.sectionTitle, base.whiteText)}>OUR SERVICES</Typography>
                            <Typography variant="h4" className={clsx(indexCss.sectionTagline, base.whiteText)}>What we offer for you</Typography>
                        </div>
                    </Fade>
                    <Grid container spacing={2} className={base.paddingTopLg}>
                        <Grow in={trigger2} timeout={500}>
                            <Grid item xs={12} md={6} lg={3}>
                                <div className={indexCss.serviceItem}>
                                    <LayersIcon className={clsx(indexCss.icon)}/>
                                    <Typography variant="h5" className={base.paddingTopMd}>UI/UX Design Strategy</Typography>
                                </div>
                            </Grid>
                        </Grow>
                        <Grow in={trigger2} timeout={1000}>
                            <Grid item xs={12} md={6} lg={3}>
                                <div className={indexCss.serviceItem}>
                                    <WebIcon className={clsx(indexCss.icon)}/>
                                    <Typography variant="h5" className={base.paddingTopMd}>Content Management</Typography>
                                </div>
                            </Grid>
                        </Grow>
                        <Grow in={trigger2} timeout={1500}>
                            <Grid item xs={12} md={6} lg={3}>
                                <div className={indexCss.serviceItem}>
                                    <LanguageIcon className={clsx(indexCss.icon)}/>
                                    <Typography variant="h5" className={base.paddingTopMd}>Web Development</Typography>
                                </div>
                            </Grid>
                        </Grow>
                        <Grow in={trigger2} timeout={2000}>
                            <Grid item xs={12} md={6} lg={3}>
                                <div className={indexCss.serviceItem}>
                                    <SmartphoneIcon className={clsx(indexCss.icon)}/>
                                    <Typography variant="h5" className={base.paddingTopMd}>Mobile Development</Typography>
                                </div>
                            </Grid>
                        </Grow>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}