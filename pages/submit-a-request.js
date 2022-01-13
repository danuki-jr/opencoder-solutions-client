

import React, { useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Grid, Typography, Card, CardContent, CardActions, Button, FormGroup, FormControlLabel, TextField, Checkbox, RadioGroup, Radio, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import layoutStyles from '../styles/layout.module.css';
import requestStyles from '../styles/request.module.css';
import Layout from '../components/main/layout';
import grey from '@material-ui/core/colors/grey';
import { useStoreState, useStoreActions } from 'easy-peasy';

const GreyCheckbox = withStyles({
    root: {
        color: grey[400],
        '&$checked': {
            color: grey[200],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ErrorCheckbox = withStyles({
    root: {
        color: '#F44336 !important'
    }
})((props) => <Checkbox color="default" {...props} />);

const GreyRadio = withStyles({
    root: {
        color: 'rgb(236,236,236)',
        '&$checked': {
            color: 'rgb(236,236,236)',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />)

const ErrorRadio = withStyles({
    root: {
        color: '#F44336'
    }
})(Radio)

const GreyTextField = withStyles({
    root: {
        marginTop: '0.5em',
        '& label': {
            color: 'rgb(236,236,236)',
            fontSize: '1em',
        },
        '& label.Mui-focused': {
            color: 'rgb(236,236,236)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FF9800',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgb(236,236,236)',
                fontSize: '0.9em'
            },
            '&:hover fieldset': {
                borderColor: 'rgb(236,236,236)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FF9800',
            },
        },
    },
})((props) => <TextField inputProps={{ style: { fontSize: '0.8em', color: 'rgb(236,236,236)' } }} {...props} />);

const GreyButton = withStyles({
    root: {
        backgroundColor: '#FF805D !important',
        color: 'rgb(236,236,236)',
        marginLeft: '0.75em',
        paddingTop: '0.7em',
        paddingBottom: '0.7em',
    }
})(Button);

const OrangeCircularProgress = withStyles({
    colorPrimary: {
        color: '#FEA858 !important'
    }
})(CircularProgress);

function SubmitARequest() {
    const { isQuestionsLoading, isRequestsLoading, questionsData, questionsError, requestsError } = useStoreState(state => ({
        isQuestionsLoading: state.questions.isLoading,
        isRequestsLoading: state.requests.isLoading,
        questionsData: state.questions.data
    }));

    const { fetchQuestions, saveRequests } = useStoreActions(actions => ({
        fetchQuestions: actions.questions.fetch,
        saveRequests: actions.requests.save
    }));

    const router = useRouter();
    const [state, setState] = React.useState({
        isFirstLoad: false,
        renderQuestions: false,
        questions: [],
        isSnackbarOpen: false,
        errorMessages: []
    });
    const { questions, renderQuestions, errorMessages, isSnackbarOpen } = state;

    useEffect(async () => {
        if(!isQuestionsLoading){
            if (!state.isFirstLoad) {
                setState({
                    ...state,
                    isFirstLoad: true,
                });
                await fetchQuestions();
            }
            else {
                let questions = [];
                if (questionsData.length != 0) {
                    questions = questionsData.map((questionItem) => {
                        return {
                            ...questionItem,
                            isHidden: questionItem.parentQuestion != null,
                            answersData: {
                                answerIds: [],
                                other: ''
                            },
                            hasError: false,
                            helperText: ''
                        }
                    })
                }
                setState({
                    ...state,
                    renderQuestions: true,
                    questions: questions
                });

            }
        }

    }, [isQuestionsLoading]);

    const handleTextFieldBlur = (event, question) => {
        let questions = [...state.questions];

        let questionItem = questions.find((questionItem) => {
            return questionItem.code == question.code;
        });

        let answersData = questionItem.answersData;

        if (questionItem.hasError) {
            questionItem.hasError = false;
            questionItem.helperText = '';
        }

        answersData.other = event.target.value;

        setState({
            ...state,
            questions: questions
        });
    }

    const handleRadioButtonChange = (selectedAnswerId, question) => {
        let questions = [...state.questions];

        let questionItem = questions.find((questionItem) => {
            return questionItem.code == question.code;
        });

        let answersData = questionItem.answersData;

        if (questionItem.hasError) {
            questionItem.hasError = false;
            questionItem.helperText = '';
        }

        if (!answersData.answerIds.includes(selectedAnswerId)) {
            answersData.answerIds.length = 0;
            answersData.answerIds.push(selectedAnswerId);
            if (questionItem.childQuestion != null) {
                let childQuestion = questionItem.childQuestion;
                let childQuestionItem = questions.find((questionItem) => {
                    return questionItem.code == childQuestion.code;
                })

                childQuestionItem.isHidden = childQuestionItem.parentTriggerAnswer.id != selectedAnswerId;
            }

            setState({
                ...state,
                questions: questions
            });
        }
    }

    const handleCheckboxChange = (selectedAnswerId, question) => {
        let questions = [...state.questions];

        let questionItem = questions.find((questionItem) => {
            return questionItem.code == question.code;
        });

        let answersData = questionItem.answersData;

        if (questionItem.hasError) {
            question.hasError = false;
            question.helperText = '';
        }

        if (answersData.answerIds.includes(selectedAnswerId)) {
            answersData.answerIds = answersData.answerIds.filter((answerId) => {
                return answerId != selectedAnswerId
            });
        }
        else {
            answersData.answerIds.push(selectedAnswerId);
        }

        setState({
            ...state,
            questions: questions
        });
    }

    const handleSubmit = async () => {
        let hasValidationPassed = true;

        let questions = [...state.questions];
        let errorMessages = state.errorMessages;
        if(errorMessages.length != 0)
            errorMessages.length = 0;
        let hasBlankFields = false;
        let isInvalidEmail = false;
        questions.forEach((questionItem) => {
            let answersData = questionItem.answersData;
            if (!questionItem.isHidden) {
                switch (questionItem.questionType.code) {
                    case 'checkbox':
                        if (answersData.answerIds.length == 0 && answersData.other == '') {
                            questionItem.helperText = 'Please select one.'
                            questionItem.hasError = true;
                            hasValidationPassed = false;
                            hasBlankFields = true;
                        }
                        break;
                    case 'radio-button':
                        if (answersData.answerIds.length == 0) {
                            questionItem.helperText = 'Please select one.'
                            questionItem.hasError = true;
                            hasValidationPassed = false;
                            hasBlankFields = true;
                        }
                        break;
                    case 'text':
                        if (answersData.other == '') {
                            questionItem.helperText = 'This field is required.';
                            questionItem.hasError = true;
                            hasValidationPassed = false;
                            hasBlankFields = true;
                        }
                        break;
                    case 'text-area':
                        if (answersData.other == '') {
                            questionItem.helperText = 'This field is required.';
                            questionItem.hasError = true;
                            hasValidationPassed = false;
                            hasBlankFields = true;
                        }
                        break;
                }
                if(questionItem.code == 'indicate-email' && questionItem.answersData.other != ''){
                    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(!regex.test(questionItem.answersData.other)){
                        questionItem.helperText = 'Please enter a valid e-mail address.'
                        questionItem.hasError = true;
                        hasValidationPassed = false;
                        isInvalidEmail = true;
                    }
                }
            }
        });

        if (hasValidationPassed) {
            document.body.style.overflow = 'hidden';
            let filteredQuestions = questions.filter((questionItem) => {
                return !questionItem.isHidden;
            });
            await saveRequests(filteredQuestions).then((error) => {
                if(error == ''){
                    localStorage.setItem('hasSubmittedRequest', 'true');
                    router.push('/thank-you')
                }
                else{
                    errorMessages.push(error);
                    document.body.style.overflow = 'scroll';
                    setState({
                        ...state,
                        isSnackbarOpen: true,
                        errorMessages: errorMessages
                    });
                }
            });

        }
        else {
            if(hasBlankFields)
                errorMessages.push('Some questions were unanswered (Highlighted in red)');
            if(isInvalidEmail)
                errorMessages.push('The e-mail that was entered is invalid.');
            setState({
                ...state,
                questions: questions,
                isSnackbarOpen: true,
                errorMessages: errorMessages
            });
        }
    }

    const handleSnackbarClose = () => {
        setState({
            ...state,
            isSnackbarOpen: false
        });
    }

    const renderQuestion = (question, questionIndex) => {
        if (!question.isHidden) {
            return (
                <CardContent key={questionIndex}>
                    <Typography variant="subtitle1">{`${(questionIndex + 1)}. ${question.text}`}</Typography>
                    {
                        renderAnswers(question, questionIndex)
                    }
                </CardContent>
            );
        }
        else
            return null;
    }

    const renderAnswers = (question, questionIndex) => {
        let renderedData = null;
        switch (question.questionType.code) {
            case 'checkbox':
                renderedData = (
                    <FormGroup>
                        {
                            question.questionAnswers.map((questionAnswer, index) => {
                                let answer = questionAnswer;
                                let renderedCheckbox = question.hasError ? (
                                    <ErrorCheckbox
                                        name={answer.code}
                                        checked={question.answersData.answerIds.includes(answer.id)}
                                        onChange={() => { handleCheckboxChange(answer.id, question) }}
                                    />
                                ) :
                                    (
                                        <GreyCheckbox
                                            name={answer.code}
                                            checked={question.answersData.answerIds.includes(answer.id)}
                                            onChange={() => { handleCheckboxChange(answer.id, question) }}
                                        />
                                    );
                                return (
                                    <FormControlLabel
                                        key={`${questionIndex}-${index}`}
                                        control={renderedCheckbox}
                                        label={
                                            <Typography variant="subtitle2"
                                                className={requestStyles.typographyFont}
                                            >
                                                {answer.name}
                                            </Typography>
                                        }
                                    />
                                )
                            })
                        }
                        {
                            question.hasOther ? (
                                <Grid container>
                                    <Grid item xs={12} md={8}>
                                        <GreyTextField
                                            key={`${questionIndex}-other`}
                                            error={question.hasError}
                                            defaultValue={question.answersData.other}
                                            label="Other (Please specify)"
                                            variant="outlined"
                                            fullWidth
                                            onBlur={(e) => { handleTextFieldBlur(e, question) }} />
                                    </Grid>
                                </Grid>

                            ) :
                                null
                        }
                        {
                            question.hasError ? (
                                <Typography variant="caption" className={requestStyles.helperText}>{question.helperText}</Typography>
                            ) : null
                        }
                    </FormGroup>
                );
                break;
            case 'radio-button':
                renderedData = (
                    <RadioGroup aria-label={question.code} name={question.code}>
                        {
                            <>
                                {
                                    question.questionAnswers.map((questionAnswer, index) => {
                                        let answer = questionAnswer;
                                        let renderedRadio = question.hasError ? (
                                            <ErrorRadio
                                                key={`${questionIndex}-${index}`}
                                                checked={question.answersData.answerIds.includes(answer.id)}
                                                onChange={(e) => { handleRadioButtonChange(answer.id, question) }}
                                            />
                                        ) : (
                                                <GreyRadio
                                                    key={`${questionIndex}-${index}`}
                                                    checked={question.answersData.answerIds.includes(answer.id)}
                                                    onChange={(e) => { handleRadioButtonChange(answer.id, question) }}
                                                />
                                            );
                                        return (
                                            <FormControlLabel
                                                key={`${questionIndex}-${index}`}
                                                value={answer.id}
                                                control={renderedRadio}
                                                label={<Typography variant="subtitle2">{answer.name}</Typography>}
                                            />
                                        )
                                    })
                                }
                                {
                                    question.hasError ? (
                                        <Typography variant="caption" className={requestStyles.helperText}>{question.helperText}</Typography>
                                    ) : null
                                }
                            </>

                        }
                    </RadioGroup>
                );
                break;
            case 'text-area':
                renderedData = (
                    <Grid container>
                        <Grid item xs={12} md={8}>
                            <GreyTextField
                                key={questionIndex}
                                multiline
                                fullWidth
                                variant="outlined"
                                size="medium"
                                defaultValue={question.answersData.other}
                                onBlur={(e) => { handleTextFieldBlur(e, question) }}
                                helperText={question.helperText}
                                error={question.hasError}
                            />
                        </Grid>
                    </Grid>
                );
                break;
            case 'text':
                renderedData = (
                    <Grid container>
                        <Grid item xs={12} md={8}>
                            <GreyTextField
                                key={question.code}
                                defaultValue={question.answersData.other}
                                fullWidth
                                variant="outlined"
                                onBlur={(e) => { handleTextFieldBlur(e, question) }}
                                helperText={question.helperText}
                                error={question.hasError}
                            />
                        </Grid>
                    </Grid>
                );
        }


        return renderedData;
    }
    return (
        <Layout className={layoutStyles.container}>
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

                <Grid container className={requestStyles.requestContainer}>
                    <Grid item xs={1} md={3} />
                    <Grid item xs={10} md={6} className={requestStyles.cardGrid}>
                        <Typography variant="h6">Thank you for your interest in OpenCoder Solutions!</Typography>
                        <Typography variant="subtitle1">Please fill in the form below. We'll get back to you as soon as we can!</Typography>
                        <Card className={requestStyles.card}>
                            {
                                !renderQuestions ? (
                                    <Grid container className={requestStyles.loaderContainer}>
                                        <Grid item xs={12} className={requestStyles.loaderGrid}>
                                            <OrangeCircularProgress />
                                        </Grid>
                                    </Grid>
                                ) :
                                    (
                                        <>
                                            {
                                                questions.length == 0 ? (
                                                    <Grid container className={requestStyles.loaderContainer}>
                                                        <Grid item xs={12} className={requestStyles.loaderGrid}>
                                                            <Typography variant="subtitle1">Woops! We're still preparing our questions for you. We'll be back soon!</Typography>
                                                        </Grid>
                                                    </Grid>
                                                ) :
                                                    (
                                                        <>
                                                            {
                                                                questions.map((question, index) => {
                                                                    return renderQuestion(question, index);
                                                                })
                                                            }
                                                            <CardActions key="actions" className={requestStyles.cardActions}>
                                                                <GreyButton variant="contained" onClick={handleSubmit}>
                                                                    Submit Request
                                                                </GreyButton>
                                                            </CardActions>
                                                        </>
                                                    )

                                            }
                                        </>
                                    )
                            }
                        </Card>
                    </Grid>
                    <Grid item xs={1} md={3} />
                </Grid>
                {
                    isRequestsLoading ? (
                        <Grid container className={requestStyles.answersLoaderContainer}>
                            <Grid item xs={12}>
                                <OrangeCircularProgress />
                            </Grid>
                        </Grid>
                    ) : null
                }
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={isSnackbarOpen}
                    autoHideDuration={3000} onClose={handleSnackbarClose}>
                    <Alert severity="error" variant="filled" onClose={handleSnackbarClose}>
                        Could not proceed due to the following:
                        {
                            errorMessages.length != 0 ?
                            (
                                <ul className={requestStyles.snackbarUnorderedList}>
                                    {errorMessages.map((errorMessage) => {
                                        return (<li>{errorMessage}</li>);
                                    })}
                                </ul>
                            ):''
                        }
                    </Alert>
                </Snackbar>
            </Container>
        </Layout>
    )
}

export default SubmitARequest;
