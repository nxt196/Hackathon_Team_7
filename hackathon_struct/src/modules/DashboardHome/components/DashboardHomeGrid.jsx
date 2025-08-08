import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTimes } from "store/thunks/dashboardhome-thunk";
import { Link, useNavigate } from "react-router-dom";
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


  return  (
      <div className="dashboard-container">
        {/* Top Header */}
        <header className="dashboard-header">

        {/* Navigation Bar */}
        <nav className="header-buttons">
          <Link to="/page-one" className="nav-link">Page One</Link>
          <Link to="/page-two" className="nav-link">Page Two</Link>
        </nav>

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
                <button className="kanban-panel">🔔 You have # Alerts!!</button>
                <button className="kanban-panel">View all SKUs</button>
                <button className="kanban-panel">View by Warehouse</button>
                <button className="kanban-panel">View by asdfasdf</button>
                <button className="kanban-panel">View by asdfasdf</button>
                <button className="kanban-panel">View by asdfasdf</button>
                <button className="kanban-panel">View by asdfasdf</button>
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
