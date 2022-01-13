import React from 'react';
import { Grid, Typography, Container, Tooltip } from '@material-ui/core';
import base from '../../styles/base.module.css';
import indexCss from '../../styles/index.module.css';

const techList = [
    { label: 'React Native', img: './images/react-logo.png' },
    { label: 'NodeJS', img: './images/nodejs-logo.png' },
    { label: '.Net Core', img: './images/dotnetcore-logo.png' },
    { label: 'Next.js', img: './images/nextjs-logo.png' },
    { label: 'Laravel', img: './images/laravel-logo.png' },
    { label: 'Material-UI', img: './images/materialui-logo.png' },
];

export default function Technologies() {
    const getTechList = () => {
        return techList.map(({ label, img }, index) => {
            return (
                <Grid key={index} item className={indexCss.descriptionImageGrid} 
                    {...{ xs: 6, sm: 4, md: 4, lg: 2 }}
                >
                    <Tooltip arrow placement="top" title={
                        <React.Fragment>
                            <Typography variant="h6">{label}</Typography>
                        </React.Fragment>
                    }>
                        <img src={img} className={indexCss.descriptionImage}/>
                    </Tooltip>
                </Grid>
            );
        });
    };

    return (
        <div id="technologies" className={base.containerYPadding}>
            <Container>
                <div className={base.containerXPadding}>
                    <div className={base.textCenter}>
                        <Typography variant="subtitle1" className={indexCss.sectionTitle}>TECHNOLOGIES</Typography>
                        <Typography variant="h4" className={indexCss.sectionTagline}>We deliver using latest technologies</Typography>
                    </div>
                    <Grid container spacing={8} alignItems="center" className={base.paddingTopLg}>
                        {getTechList()}
                    </Grid>
                </div>
            </Container>
        </div>
    );
}