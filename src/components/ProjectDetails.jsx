import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserStories from "./UserStories";
// icons
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Sprint from "./Sprint";
import { Link, useParams } from "react-router-dom";
import { getProject, listProjectSprints } from "../services/projectService";
import { listEpics, listUserStories } from "../services/productBacklogService";
import AddStoryCard from "./AddStoryCard";
import AddSprintCard from "./AddSprintCard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProjectDetails() {
  const [value, setValue] = React.useState(0);
  const [project, setProject] = React.useState({});
  const [epics, setEpics] = React.useState([]);
  const [stories, setStories] = React.useState([]);
  const [sprints, setSprints] = React.useState([]);
  const { projectId } = useParams();

  const [openStory, setOpenStory] = React.useState(false);
  const [openSprint, setOpenSprint] = React.useState(false);

  const handleClickOpenStory = () => {
    setOpenStory(true);
  };
  const handleCloseStory = () => {
    setOpenStory(false);
  };

  const handleClickOpenSprint = () => {
    setOpenSprint(true);
  };
  const handleCloseSprint = () => {
    setOpenSprint(false);
  };

  React.useEffect(() => {
    getProject(projectId).then((response) => {
      setProject(response.data);
    });
  }, []);

  React.useEffect(() => {
    if (project.productBacklogData === undefined) return;

    listEpics(project.productBacklogData.id).then((response) => {
      setEpics(response.data);
    });

    listUserStories(project.productBacklogData.id).then((response) => {
      setStories(response.data);
    });

    listProjectSprints(project.productBacklogData.id).then((response) => {
      console.log(response.data);
      setSprints(response.data);
    });
  }, [project]);

  let statusClass = "";
  if (project.status === "PLANNED") {
    statusClass = "bg-gray-500";
  } else if (project.status === "IN_PROGRESS") {
    statusClass = "bg-yellow-500";
  } else if (project.status === "COMPLETED") {
    statusClass = "bg-green-500";
  }

  if (project === null) {
    return <div>waiting</div>;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AddStoryCard open={openStory} handleClose={handleCloseStory} />
      <AddSprintCard open={openSprint} handleClose={handleCloseSprint} />
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
          <span className="cursor-pointer">{project.nom}</span>
        </div>
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-700">{project.nom}</h2>
            <p className="text-md text-gray-600">{project.description}</p>
          </div>
          <span
            className={`flex mt-2.5 h-fit items-center ${statusClass} px-1.5 rounded-full text-white`}
          >
            {project.status}
          </span>
        </div>
        <Box className="w-full mt-5">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Product Backlog" {...a11yProps(0)} />
              <Tab label="Sprints" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="p-5 border rounded-md border-zinc-400 shadow-lg bg-white mb-5">
              <p className="text-gray-800 mb-3">Epics</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
                {epics.map((epic, index) => (
                  <Link
                    key={index}
                    to={`/projects/${project.id}/epics/${epic.id}`}
                  >
                    <div className="flex gap-2.5 items-center p-2.5 border border-zinc-200 hover:bg-zinc-100 hover:border-blue-500 cursor-pointer rounded-md">
                      <ContentPasteGoIcon className="text-green-400" />
                      <span>{epic.titre}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold mb-3">User Stories</h3>
              <Button
                onClick={handleClickOpenStory}
                className="h-fit"
                variant="contained"
                startIcon={<AddIcon />}
                disableElevation
              >
                Add User Story
              </Button>
            </div>
            <UserStories stories={stories} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold mb-3">Sprints</h3>
              <Button
                onClick={handleClickOpenSprint}
                className="h-fit"
                variant="contained"
                startIcon={<AddIcon />}
                disableElevation
              >
                Create Sprint
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
              {sprints.map((sprint, index) => (
                <Sprint
                  key={index}
                  sprint={sprint}
                  projectId={project.productBacklogData.id}
                />
              ))}
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}
