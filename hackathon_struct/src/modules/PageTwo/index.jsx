import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTimes } from 'store/thunks/pageTwo-thunk';
import 'common/styles.css';
import ShowBacklog from 'modules/PageTwo/components/ShowBacklog.jsx';

const PageTwo = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTimes());
  }, [dispatch]);

  return (
    <div className="home-container">
      <ShowBacklog />
    </div>
  );
};

export default PageTwo;
