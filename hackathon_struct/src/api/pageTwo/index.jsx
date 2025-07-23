import axios from 'axios';

export const getAlltimes = () => {
    return axios
        .get('http://localhost:4000/getTime')
        .then(({ data }) => {
            console.log(data.previousTimes);
            return data.previousTimes;
        });
};

export const removeLastTime = () => {
    return axios
        .post('http://localhost:4000/removetime');
}
