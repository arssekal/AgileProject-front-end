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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { createEpic } from "../services/productBacklogService";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddEpicCard({ open, handleClose }) {
  const [epic, setEpic] = React.useState({ titre: "", description: "" });
  const handleEpicCreation = () => {
    createEpic(1, epic).then((response) => {
      console.log("Epic created:", response.data);
    });
    handleClose();
  };

  const handleTitreChange = (e) => {
    setEpic({ ...epic, titre: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setEpic({ ...epic, description: e.target.value });
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
          Create Epic
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
          <div className="flex flex-col gap-5 w-100 : md:w-120">
            <TextField value={epic.titre} onChange={handleTitreChange} id="outlined-basic" label="title" variant="outlined" />
            <TextareaAutosize
              value={epic.description} onChange={handleDescriptionChange}
              id="epic-description"
              aria-label="epic's description"
              minRows={3}
              placeholder="Epic Description"
              className="border border-zinc-300 outline-none px-1.5 py-1.5 min-h-15"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            close
          </Button>
          <Button autoFocus onClick={handleEpicCreation}>
            create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
