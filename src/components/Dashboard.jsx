import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import TimelineIcon from "@mui/icons-material/Timeline";
import Button from "@mui/material/Button";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useEffect, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { lastThreeProjects } from "../services/projectService";

export default function Dashboard() {
  const [lastProjects, setLastProjects] = useState([]);

  const cardsData = [
    {
      text: "Total Projects",
      value: 3,
      icon: <CheckCircleIcon style={{ fontSize: 40, color: "#3f51b5" }} />,
    },
    {
      text: "Total Sprints ",
      value: 23,
      icon: <MarkChatReadIcon style={{ fontSize: 40, color: "#f44336" }} />,
    },
    {
      text: "Active Sprints",
      value: 5,
      icon: <ChecklistIcon style={{ fontSize: 40, color: "#4caf50" }} />,
    },
    {
      text: "Total Story Points",
      value: 12,
      icon: <TimelineIcon style={{ fontSize: 40, color: "#ff9800" }} />,
    },
  ];

  useEffect(() => {
    lastThreeProjects().then((resp) => {
      setLastProjects(resp.data);
    });
  }, []);

  return (
    <div className="mx-2 sm:mx-auto">
      <div className="mb-5">
        <h1 className="font-bold text-2xl text-gray-700">Dashboard</h1>
        <p className="text-sm">
          Welcome Here's an overview of your projects and tasks
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <Card key={index} cardContent={card} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <div className="bg-white h-fit py-5 px-5 rounded-xl shadow-md">
          <div className="mb-2.5">
            <h4 className="font-bold text-md text-gray-500">Quick Actions</h4>
            <p>Jump to your most common tasks</p>
          </div>
          <div className="flex flex-col gap-3.5">
            <Link to={"/projects"}>
              <Button
                variant="contained"
                startIcon={<FolderIcon />}
                className="w-full"
              >
                See All Projects
              </Button>
            </Link>
            <Link to={"/sprints"}>
              <Button
                variant="contained"
                startIcon={<RocketLaunchIcon />}
                className="w-full"
              >
                See Active Sprints
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md h-fit">
          <div className="flex justify-between mb-5">
            <div>
              <h4 className="font-bold text-md mb-2.5 text-gray-500">
                Recent Projects
              </h4>
              <p>Your latest project activity</p>
            </div>
            <Link to={"/projects"}>
              <p className="text-blue-500 cursor-pointer flex items-center gap-2">
                view all <ArrowForwardIosIcon sx={{ fontSize: "15px" }} />
              </p>
            </Link>
          </div>
          {lastProjects.map((project) => {
            return (
              <div className="flex items-center gap-7 hover:bg-zinc-100 p-2 rounded-md">
                <MyLocationIcon className="text-blue-500" />
                <div className="flex justify-between w-full">
                  <div>
                    <p className="text-md text-gray-700">{project.nom}</p>
                    <span className="text-sm text-gray-500">{project.description}</span>
                  </div>
                  <span className="text-gray-500">{project.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
