import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTimes } from 'store/thunks/pageOne-thunk';

import ShowWarehouseResults from 'modules/PageOne/components/ShowWarehouseResults.jsx';

const PageOne = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTimes());
  }, [dispatch]);

  return (
    <div className="home-container">
      <ShowWarehouseResults />
    </div>
  );
};

export default PageOne;
