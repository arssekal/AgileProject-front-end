import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { listEpics } from "../services/productBacklogService";
import { createUserStroy } from "../services/epicService";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddStoryCard({ open, handleClose }) {
  const [userStory, setUserStory] = React.useState({
    titre: "",
    statut: "",
    priority: "",
    description: "",
    critereAcceptation: "",
    epicId: null,
  });

  const [epics, setEpics] = React.useState([]);

  React.useEffect(() => {
    listEpics(1).then((response) => {
      setEpics(response.data);
    });
  }, []);

  const handlePriorityChange = (event) => {
    setUserStory({
      ...userStory,
      priority: event.target.value,
    });
  };

  const handleStatutChange = (event) => {
    setUserStory({
      ...userStory,
      statut: event.target.value,
    });
  };
  const handleTitleChange = (event) => {
    setUserStory({
      ...userStory,
      titre: event.target.value,
    });
  };
  const handleDescriptionChange = (event) => {
    setUserStory({
      ...userStory,
      description: event.target.value,
    });
  };

  const handEpicChange = (event) => {
    setUserStory({
      ...userStory,
      epicId: event.target.value,
    });
  };
  const handleCritereAcceptationChange = (event) => {
    setUserStory({
      ...userStory,
      critereAcceptation: event.target.value,
    });
  }

  const hanleCreateUserStory = () => {
    // Logic to create user story goes here
    createUserStroy(userStory).then((response) => {
      console.log("User story created:", response.data);
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        disableScrollLock
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create User Story
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex justify-between flex-col md:flex-row gap-4 w-100 xl:w-130 mb-3.5">
            <TextField
              id="standard-basic"
              label="title"
              variant="standard"
              className="w-1/2"
              onChange={handleTitleChange}
              value={userStory.titre}
            />
            <TextField
              id="standard-basic"
              label="description"
              variant="standard"
              className="w-1/2"
              onChange={handleDescriptionChange}
              value={userStory.description}
            />
          </div>
          <div className="flex justify-between flex-col md:flex-row gap-4 w-100 xl:w-130 mb-3.5">
            <FormControl variant="standard" className="w-1/2">
              <InputLabel id="demo-simple-select-standard-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={userStory.priority}
                onChange={handlePriorityChange}
                label="priority"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {["MUST_HAVE", "SHOULD_HAVE", "COULD_HAVE", "WONT_HAVE"].map(
                  (priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priority.replace("_", " ").toLowerCase()}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <FormControl variant="standard" className="w-1/2">
              <InputLabel id="demo-simple-select-standard-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={userStory.statut}
                onChange={handleStatutChange}
                label="statut"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {["TO_DO", "IN_PROGRESS", "DONE"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.replace("_", " ").toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-between flex-col md:flex-row gap-4 w-100 xl:w-130 mb-3.5">
            <FormControl variant="standard" className="w-1/3">
              <InputLabel id="demo-simple-select-standard-label">
                Epic
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={userStory.epicId}
                onChange={handEpicChange}
                label="epic"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {epics.map((epic) => (
                  <MenuItem key={epic.id} value={epic.id}>
                    {epic.titre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              value={userStory.critereAcceptation}
              onChange={handleCritereAcceptationChange}
              className="w-2/3"
              id="standard-basic"
              label="Critère d'acceptation"
              variant="standard"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={hanleCreateUserStory}>
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
