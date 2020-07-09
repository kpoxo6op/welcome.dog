import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: sageData.ajaxBaseURL + 'wp-json', // eslint-disable-line
  })
}