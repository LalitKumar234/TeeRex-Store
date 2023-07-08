import axios from 'axios';
const baseURL = `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`

export const axiosGet = () => {
    return axios.get(baseURL)
}