import axios from 'axios';

export const addCurrentTime = (currentTime) => {
    return axios
        .post('http://localhost:4000/addTime', { currentTime });
};

export const removeLastTime = () => {
    return axios
        .post('http://localhost:4000/removetime');
}