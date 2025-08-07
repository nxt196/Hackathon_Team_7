import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTimes } from "store/thunks/dashboardhome-thunk";
import { useNavigate } from "react-router-dom";
import 'common/dashboard.css'
import PageTwoGrid from "modules/PageTwo/components/PageTwoGrid.jsx";
import ShowAlertsResult from "modules/PageTwo/components/ShowAlertsResult.jsx";
import ShowPipelineResult from "modules/PageTwo/components/ShowBacklog.jsx";

const DashboardHomeGrid = ({ onAddTime }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTimes());
  }, [dispatch]);

  const handleNavigatePageOne = () => {
    navigate("/page-one");
  };
  const handleNavigatePageTwo = () => {
    navigate("/page-two");
  };

  return  (
      <div className="dashboard-container">
        {/* Top Header */}
        <header className="dashboard-header">

          {/* Dashboard Title */}
          <div className="header-buttons">
            <button onClick={handleNavigatePageOne}>Page One</button>
            <button onClick={handleNavigatePageTwo}>Page Two</button>
          </div>
          {/* Profile Section */}
          <div className="dashboard-profile">
            <div className="profile-icon">LH</div>
            <div className="profile-label">Profile</div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="dashboard-main">

          {/* Content Area */}
          <main className="dashboard-content">



            {/* Panels */}
            <div className="dashboard-panels">
              <section className="kanban-panel">
              <ShowPipelineResult />
              </section>
              <section className="right-panel"><ShowAlertsResult/></section>

            </div>
            <section className="bottom-panel">Bottom Panel</section>
          </main>
        </div>
      </div>
  );
};

export default DashboardHomeGrid;
