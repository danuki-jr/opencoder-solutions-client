import { Container, Grid, Typography, Button, withStyles } from '@material-ui/core';
import base from '../../styles/base.module.css';
import indexCss from '../../styles/index.module.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Fab from '@material-ui/core/Fab';
import Link from 'next/link';
import clsx from 'clsx';

const RequestButton = withStyles({
    root: {
        color: '#fff',
        backgroundColor: '#ff805d',
        '&:hover': {
            backgroundColor: '#e55f39',
        },
        marginTop: '15px',
        padding: '15px',
        width: '200px',
    },
})(Button);


export default function ContactUs() {
    return (
        <div id="contactus" className={indexCss.contactContainter}>
            <Container className={base.containerYPadding}>
                <Grid container spacing={4} alignItems="center" className={base.containerXPadding}>
                    <Grid item xs={12} lg={6}>
                        <Typography variant="subtitle1" className={indexCss.sectionTitle}>Get in Touch</Typography>
                        <Typography variant="h4" className={clsx(indexCss.sectionTagline, base.whiteText)}>We're here to help you</Typography>
                        <Typography variant="body1" align="justify" className={base.lh2}>Got a project in mind? We’d love to hear about it. Contact us so we can get to know you and understand your project.</Typography>
                        <Link href="/submit-a-request">
                            <RequestButton variant="contained">Submit a Request</RequestButton>
                        </Link>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Fab className={indexCss.contactUsIcon} size="small">
                            <FacebookIcon />
                        </Fab>
                        <Link href="http://www.facebook.com/teamOpenCoder">
                            <Typography variant="body1" className={`${indexCss.contactUsDescription} ${indexCss.contactUsLink}`}>
                                OpenCoder Solutions
                            </Typography>
                        </Link>
                        <div style={{display:'inline-flex'}}>
                            <Fab className={indexCss.contactUsIcon} size="small">
                                <LocationOnIcon />
                            </Fab>
                            <Typography variant="body1" className={indexCss.contactUsDescription}>Unit 303 Avida Cityflex SOHO Tower, 7th Ave. Cor. Lane T,<br/>Bonifacio Global City, Taguig</Typography>
                        </div>
                        <div>
                            <Fab className={indexCss.contactUsIcon} size="small">
                                <PhoneIcon />
                            </Fab>
                            <Typography variant="body1" className={indexCss.contactUsDescription}>(02) 7916 6539</Typography>
                        </div>
                        <div>
                            <Fab className={indexCss.contactUsIcon} size="small">
                                <EmailIcon />
                            </Fab>
                            <Typography variant="body1" className={indexCss.contactUsDescription}>support@opencodersolutions.net</Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}