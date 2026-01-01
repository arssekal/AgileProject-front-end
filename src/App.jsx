import "./App.css";
import Epics from "./components/Epics";
import NavBar from "./components/NavBar";
import { useWhatToShow } from "./contexts/WhatToShow";
import ProductBacklog from "./components/ProductBacklog";
import ProductOwnerDashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProjectPage from "./pages/ProjectPage";
import EpicPage from "./pages/EpicPage";
import SprintPage from "./pages/SprintBacklogPage";
import TaskPage from "./pages/TaskPage";
import ProjectDetails from "./components/ProjectDetails";
import EpicDetails from "./components/EpicDetails";
import Dashboard from "./components/Dashboard";
import SprintBacklogPage from "./pages/SprintBacklogPage";

function App() {
  const { show } = useWhatToShow();

  const renderContent = () => {
    switch (show) {
      case "dashboard":
        return <ProductOwnerDashboard />;
      case "product backlog":
        return <ProductBacklog />;
      case "epics":
        return <Epics />;
      case "reports":
        return <div>Reports Content</div>;
      case "users":
        return <div>Users Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  const project = {
    nom: "Banking System",
    description: "Simple banking application with accounts and transfers",
    status: "IN_PROGRESS",
    createdAt: "2024-11-05T11:45:00",
  };

  return (
    <>
      <div className="bg-linear-to-t bg-indigo-100 min-h-screen pb-5">
        <NavBar />
        <div className="container mx-auto mt-[65px] pt-5">
          {/* {renderContent()}  */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects">
              <Route index element={<ProjectPage />} />
              <Route path=":projectId" element={<ProjectDetails />} />
              <Route
                path=":backlogId/epics/:epicId"
                element={<EpicDetails />}
              />
              <Route path=":projectId/sprint-backlog/:sprintId" element={<SprintBacklogPage />} />
            </Route>
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="*" element={<div>page not found</div>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default App;
