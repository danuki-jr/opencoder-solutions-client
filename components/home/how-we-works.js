import { Container, Grid, Typography, Paper, Fade, Slide, makeStyles } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, 
    TimelineContent, TimelineDot } from '@material-ui/lab';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import base from '../../styles/base.module.css';
import indexCss from '../../styles/index.module.css';

const worksData = [
    { label: 'Discussion', desc: 'We meet clients in set place to discuss the details about needs and demands before proposing a plan.' },
    { label: 'Concepts & Initatives', desc: 'Our team come up with all kinds of ideas and initiatives for delivering the best solutions for IT services chosen.' },
    { label: 'Testing & Trying', desc: 'After agreeing on the ideas and plans, we will conduct as scheduled and give comments on the results and adaptations.' },
    { label: 'Execute & Install', desc: 'Once the final plan is approved, everything will be conducted according to the agreed contract.' },
];

const timelineCss = makeStyles((theme) => ({
    missingOppositeContent: {
        '&::before': {
            [theme.breakpoints.down('xs')]: {
                content: 'none',
            }
        }
    },
    alignAlternate: {
        '&:nth-child(even)': {
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'row',
            },
            '& .MuiTimelineItem-content': {
                [theme.breakpoints.down('xs')]: {
                    textAlign: 'left ',
                }
            }
        },
    } 
}));

export default function HowWeWorks(props) {
    const timelineClass = timelineCss();
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 800,
    });

    const trigger2 = useScrollTrigger({
        target: window  ? window() : undefined,
        disableHysteresis: true,
        threshold: 900,
    });

    const getContent = () => { 
        return worksData.map(({ label, desc }, index) => {
            const modulo = index % 2 ? 'right' : 'left';
            return (
                <TimelineItem key={index} 
                    classes={{
                        missingOppositeContent: timelineClass.missingOppositeContent,
                        alignAlternate: timelineClass.alignAlternate,
                    }}
                >
                    <TimelineSeparator>
                        <TimelineDot className={indexCss.timelineDot}>
                        </TimelineDot>
                        {index < worksData.length - 1 ? <TimelineConnector /> : ''}
                    </TimelineSeparator>
                    <Slide direction={modulo} in={trigger2} timeout={500 * (index + 1)}>
                        <TimelineContent>
                            <Paper elevation={3} className={base.paddingMd}>
                                <Typography variant="h6" className={base.defaultTextColor}>{label}</Typography>
                                <Typography className={base.paddingTopSm}>{desc}</Typography>
                            </Paper>
                        </TimelineContent>
                    </Slide>
                </TimelineItem>
            );
        });
    };

    return (
        <div id="howwework" className={base.containerYPadding} style={{ backgroundColor: '#eee' }}>
            <Container>
                <Grid container className={base.containerXPadding}>
                    <Grid item xs={12}>
                        <Fade in={trigger} timeout={500}>
                            <div className={base.textCenter}>
                                <Typography variant="subtitle1" className={indexCss.sectionTitle}>HOW WE WORK</Typography>
                                <Typography variant="h4" className={indexCss.sectionTagline}>How we innovate your business</Typography>
                            </div>
                        </Fade>
                        <Timeline align="alternate">
                            {getContent()}
                        </Timeline>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}