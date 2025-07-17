import axios from 'axios';



export const getAlltimes = () => {
    return axios
        .get('http://localhost:4000/getTime')
        .then(({ data }) => {
            console.log(data.previousTimes);
            return data.previousTimes;
        });
};



export const addCurrentTime = (currentTime) => {
    return axios
        .post('http://localhost:4000/addTime', { currentTime })
        .then(({ data }) => {
            return data; // should include { previousTimes: [...] }
        });
};


