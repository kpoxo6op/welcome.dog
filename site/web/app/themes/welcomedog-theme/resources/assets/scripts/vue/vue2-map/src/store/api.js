import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: sageData.ajaxBaseURL + 'wp-json/wp/v2', // eslint-disable-line
  })
}