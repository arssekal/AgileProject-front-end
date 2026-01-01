import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ProjectCard from "../components/ProjectCard";
import { listProjects } from "../services/projectService";
// icons
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    listProjects().then((response) => {
      setProjects(response.data);
    });
  }, []);

  return (
    <div className="mx-2.5 sm:mx-0">
      <div className="flex items-center gap-2 my-5">
        <Link to={"/dashboard"}>
          <HomeIcon className="text-gray-500 cursor-pointer" />
        </Link>
        <KeyboardArrowRightIcon  className="text-gray-500"/>{" "}
        <span className="cursor-pointer">projects</span>
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-700">Projects</h2>
          <p className="text-md text-gray-600">
            Manage and track all your agile projects
          </p>
        </div>
        <Button
          className="h-fit"
          variant="contained"
          startIcon={<AddIcon />}
          disableElevation
        >
          New Project
        </Button>
      </div>
      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
