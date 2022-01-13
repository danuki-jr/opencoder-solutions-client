
import requestConfig from '../../../easy-peasy/request-config';
const saveData = async (req, res) => {
    try {
        let questions = req.body;
        let defaultQuestions = questions.filter((questionItem) => {
            return questionItem.isDefault;
        });

        let definedQuestions = questions.filter((questionItem) => {
            return !questionItem.isDefault
        });

        let requestData = {
            name: defaultQuestions.find((defaultQuestionItem) => {
                return defaultQuestionItem.code == 'indicate-name';
            }).answersData.other,
            email: defaultQuestions.find((defaultQuestionItem) => {
                return defaultQuestionItem.code == 'indicate-email';
            }).answersData.other
        };

        let requestAnswers = [];

        definedQuestions.forEach((questionItem) => {
            let answersData = questionItem.answersData;
            answersData.answerIds.forEach((answerId) => {
                requestAnswers.push({
                    questionId: questionItem.id,
                    answerId: answerId,
                    other: null
                });
            });

            if (answersData.other != '') {
                requestAnswers.push({
                    questionId: null,
                    answerId: null,
                    other: answersData.other
                });
            }
        });

        requestData.requestAnswers = requestAnswers;

        const serverResponse = await fetch(`${process.env.SERVER_URL}/api/requests/save`, {
            ...requestConfig.post,
            body: JSON.stringify(requestData)
        });

        const statusCode = serverResponse.status;
        let responseData = await serverResponse.json();

        if (statusCode == 404) {
            res.status(404).send({ message: 'Not found.' });
        }
        else {
            res.status(statusCode).send(responseData);
        }
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
}

export default async (req, res) => {
    let isValidRequest = true;
    const {
        query: { process }
    } = req;

    switch (process) {
        case 'save':
            await saveData(req, res);
            break;
        default:
            isValidRequest = false;
    }

    if (!isValidRequest)
        res.redirect('/404');
}
