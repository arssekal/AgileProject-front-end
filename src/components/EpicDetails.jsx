import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
// icons
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UserStories from "./UserStories";
//
import { getEpicDetails, listEpicUserStories } from "../services/epicService";
import { getProject } from "../services/projectService";

export default function EpicDetails() {
  const [projectTitle, setProjectTitle] = useState("");
  const [epic, setEpic] = useState({});
  const [stories, setStories] = useState([]);
  const { epicId, backlogId } = useParams();

  useEffect(() => {
    // i get the project from the backlog because they always have the same id
    getProject(backlogId).then((resp) => {
      console.log("ppppppppppppppppppp")
      console.log(resp.data.nom)
      console.log("ppppppppppppppppppp")
      setProjectTitle(resp.data.nom);
    });
  }, []);

  useEffect(() => {
    getEpicDetails(epicId).then((resp) => {
      setEpic(resp.data);
    });
  }, []);

  useEffect(() => {
    listEpicUserStories(epicId).then((resp) => {
      setStories(resp.data);
    });
  }, [epicId]);

  return (
    <div className="mx-2.5 sm:mx-0">
      <div className="flex items-center gap-2 my-5 text-sm lg:text-md">
        <Link to={"/dashboard"}>
          <HomeIcon className="text-gray-500 cursor-pointer" />
        </Link>
        <KeyboardArrowRightIcon className="text-gray-500" />{" "}
        <Link to={"/projects"}>
          <span className="cursor-pointer text-gray-500">projects</span>
        </Link>
        <KeyboardArrowRightIcon className="text-gray-500" />{" "}
        <Link to={`/projects/${backlogId}`}>
          <span className="cursor-pointer text-gray-500">{projectTitle}</span>
        </Link>
        <KeyboardArrowRightIcon className="text-gray-500" />{" "}
        <span className="cursor-pointer">{epic.titre}</span>
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-700">{epic.titre}</h2>
          <p className="text-md text-gray-600">{epic.description}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg text-gray-700 font-semibold mb-3">
            User Stories
          </h3>
          <Button
            className="h-fit"
            variant="contained"
            startIcon={<AddIcon />}
            disableElevation
          >
            Add User Story
          </Button>
        </div>
        <UserStories stories={stories} />{" "}
      </div>
    </div>
  );
}
