import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimes, addCurrentTime } from 'store/thunks/dashboardhome-thunk';
// import { selectTimes } from '../../../../store/slices/dashboardhome-slice';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTimes());
    }, [dispatch]);

    const previousTimes = useSelector((state) => state.dashboardhome?.previousTimes || []);


    // console.log(useSelector(selectTimes));
    console.log(previousTimes);


    const handleGetAllTimes = () => {
        dispatch(getAllTimes());
    };

    const handleAddTime = () => {
        const currentTime = new Date().toISOString(); // ISO format is clean and consistent
        dispatch(addCurrentTime(currentTime));
    };

    // console.log('Raw previousTimes:', previousTimes);
    return (
        <div>
            <h1>Welcome!</h1>
            <p>2025 Sherwin Hackathon</p>

            <button onClick={handleAddTime}>Add Current Time</button>
            <button onClick={handleGetAllTimes}>Get All Times</button>

            <h2>Previous Times:</h2>




            <ul>
                {previousTimes
                    .filter((time) => {
                        const date = new Date(time);
                        return time && !isNaN(date.getTime());
                    })
                    .map((time, index) => (
                        <li key={index}>{new Date(time).toLocaleString()}</li>
                    ))}
            </ul>


        </div>
    );
};

export default Home;
