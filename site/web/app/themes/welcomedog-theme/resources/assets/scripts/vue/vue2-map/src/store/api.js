import axios from 'axios';

export default () => axios.create({
    baseURL: sageData.ajaxBaseURL + 'wp-json', // eslint-disable-line
});
