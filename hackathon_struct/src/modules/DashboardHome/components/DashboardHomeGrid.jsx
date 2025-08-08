import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTimes } from "store/thunks/dashboardhome-thunk";
import { useNavigate } from "react-router-dom";
import 'common/dashboard.css'
import PageTwoGrid from "modules/PageTwo/components/PageTwoGrid.jsx";
import ShowAlertsResult from "modules/PageTwo/components/ShowAlertsResult.jsx";
import ShowPipelineResult from "modules/PageTwo/components/ShowBacklog.jsx";
import {FiAlertCircle} from "react-icons/fi";

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
          <main className="dashboard-content p-4 h-full w-full">
            <div className="dashboard-panels flex flex-row gap-4 h-full">

              {/* Left column: 4 evenly spaced boxes */}
              <div className="flex flex-col justify-between w-1/4 h-full">
                <section className="kanban-panel">🔔 You have # Alerts!!</section>
                <section className="kanban-panel">View all SKUs</section>
                <section className="kanban-panel">View by Warehouse</section>
                <section className="kanban-panel">View by asdfasdf</section>
                <section className="kanban-panel">View by asdfasdf</section>
                <section className="kanban-panel">View by asdfasdf</section>
                <section className="kanban-panel">View by asdfasdf</section>
              </div>

              {/* Right column: fills remaining space */}
              <section className="right-panel flex-1">
                <ShowAlertsResult />
              </section>
            </div>
          </main>

        </div>
      </div>
  );
};

export default DashboardHomeGrid;
