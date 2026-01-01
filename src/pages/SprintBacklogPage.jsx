import Button from "@mui/material/Button";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import UserStories from "../components/UserStories";
import { sprintUserStories, getSprint } from "../services/sprintBacklogService";
import { getProject } from "../services/projectService";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// icons
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function SprintBacklogPage() {
  const [projectTitle, setProjectTitle] = useState("");
  const { sprintId, projectId } = useParams();
  const [sprintTitle, setSprintTitle] = useState("");
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getProject(projectId).then((resp) => {
      setProjectTitle(resp.data.nom);
    });
  }, []);

  useEffect(() => {
    sprintUserStories(sprintId).then((resp) => {
      setStories(resp.data);
      console.log(resp.data);
    });
    getSprint(sprintId).then((resp) => {
      setSprintTitle(resp.data.nom);
    });
  }, []);

  return (
    <div className="mx-2.5 sm:mx-0 mt-5">
      <div className="flex items-center gap-2 my-5 text-sm lg:text-md">
        <Link to={"/dashboard"}>
          <HomeIcon className="text-gray-500 cursor-pointer" />
        </Link>
        <KeyboardArrowRightIcon className="text-gray-500" />{" "}
        <Link to={"/projects"}>
          <span className="cursor-pointer text-gray-500">projects</span>
        </Link>
        <KeyboardArrowRightIcon className="text-gray-500" />{" "}
        <Link to={`/projects/${projectId}`}>
          <span className="cursor-pointer text-gray-500">{projectTitle}</span>
        </Link>
        <KeyboardArrowRightIcon className="text-gray-500" />{" "}
        <span className="cursor-pointer">{sprintTitle}</span>
      </div>
      <div className="flex justify-between mb-5">
        <div>
          <h2 className="text-3xl font-bold text-gray-700">Sprint Backlog</h2>
          <p className="text-md text-gray-600">
            Manage and track your sprint backlog
          </p>
        </div>
        <Button
          className="h-fit"
          variant="contained"
          startIcon={<VerticalAlignBottomIcon />}
          disableElevation
        >
          import user story
        </Button>
      </div>
      <UserStories stories={stories} />
    </div>
  );
}
