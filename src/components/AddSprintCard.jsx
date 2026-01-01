import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
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
/*
projectId

private String nom;
    private String description;
    private Long scrumMasterId;
    private LocalDate dateDebut;
    private LocalDate dateFin;
*/

export default function AddSprintCard({ open, handleClose }) {
  const [sprint, setSprint] = React.useState({
    nom: "",
    scrumMasterId: null,
    dateDebut: dayjs(),
    dateFin: dayjs(),
  });

  const handleTitleChange = (event) => {
    setSprint({
      ...sprint,
      titre: event.target.value,
    });
  };
  const handleDescriptionChange = (event) => {
    setSprint({
      ...sprint,
      description: event.target.value,
    });
  };

  const handleStartDateChange = (newValue) => {
    setSprint({
      ...sprint,
      dateDebut: newValue,
    });
  };

  const handleEndDateChange = (newValue) => {
    setSprint({
      ...sprint,
      dateFin: newValue,
    });
  };

  const hanleCreateSprint = () => {
    const startDate = sprint.dateDebut.format("YYYY-MM-DD");
    const endDate = sprint.dateFin.format("YYYY-MM-DD");
    console.log(startDate);
    console.log(endDate);
    console.log(sprint.dateDebut.isAfter(dayjs("2026-02-01")));
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
          Create Sprint
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
              value={sprint.nom}
            />
            <TextField
              id="standard-basic"
              label="description"
              variant="standard"
              className="w-1/2"
              onChange={handleDescriptionChange}
              value={sprint.description}
            />
          </div>
          <div className="flex justify-between flex-col md:flex-row gap-4 w-100 xl:w-130 my-3.5">
            <DateField
              label="start date"
              format="DD-MM-YYYY"
              minDate={dayjs()}
              value={sprint.dateDebut}
              onChange={(newValue) => handleStartDateChange(newValue)}
            />
            <DateField
              label="end date"
              format="DD-MM-YYYY"
              minDate={dayjs()}
              value={sprint.dateFin}
              onChange={(newValue) => handleEndDateChange(newValue)}
              slotProps={{
                textField: {
                  error: (sprint.dateFin && !sprint.dateFin.isValid()) || sprint.dateFin.isBefore(sprint.dateDebut),
                  helperText:
                    sprint.dateFin && !sprint.dateFin.isValid()
                      ? "Invalid date"
                      : "",
                },
              }}
            />
          </div>
          <div className="flex justify-between flex-col md:flex-row gap-4 w-100 xl:w-130 mb-3.5"></div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={hanleCreateSprint}>
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
