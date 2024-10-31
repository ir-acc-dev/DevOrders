import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/steps';

export const getAllSteps = () => axios.get(BASE_URL);