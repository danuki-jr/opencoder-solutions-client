import { Grid, Typography } from '@material-ui/core';
import indexStyles from '../../styles/index.module.css';


export default function WhyUs() {
    return (
        <Grid id="whyus" container className={indexStyles.container}>
            <Grid item xs={12}>
                <Typography variant="h2" className={indexStyles.title}>WHY US?</Typography>
                <Grid container className={indexStyles.descriptionContainer}>
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <Typography variant="h6" className={indexStyles.description}>We aim to solidify relationships as well as cater to the needs of our clients. We'll do this by following these principles:</Typography>
                        <Typography variant="h5" className={indexStyles.subTitle}>We will deliver using the latest technology and infrastructure.</Typography>
                        <Typography variant="h6" className={indexStyles.description}>With our combined experiences, we will use the latest technologies available in the current market to attain optimized and secure applications.</Typography>
                        <Typography variant="h5" className={indexStyles.subTitle}>We’ll adjust to the technology you prefer to the utmost extent.</Typography>
                        <Typography variant="h6" className={indexStyles.description}>If you want a specific software technology or programming language that will be used, we will consider it and adjust accordingly.</Typography>
                        <Typography variant="h5" className={indexStyles.subTitle}>We’ll always keep you up to date.</Typography>
                        <Typography variant="h6" className={indexStyles.description}>We'll keep you posted of our progress weekly, so that you know where the status of the ongoing application development stands at all times.</Typography>
                        <Typography variant="h5" className={indexStyles.subTitle}>We won’t leave you hanging.</Typography>
                        <Typography variant="h6" className={indexStyles.description}>We are not the type of people to desert our clients -- we will always maintain a healthy communication.</Typography>
                    </Grid>
                    <Grid item xs={3} />
                </Grid>
                
            </Grid>
        </Grid>
    );
}