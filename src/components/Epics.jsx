import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import EpicCard from "./EpicCard";
import { useEffect, useState } from "react";
import { listEpics } from "../services/productBacklogService";
import AddEpicCard from "./AddEpicCard";

export default function Epics() {
  const [epics, setEpics] = useState([]);
   const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    listEpics(1).then((response) => {   
      setEpics(response.data);
    });
  }, []);

  return (
    <>
    <AddEpicCard open={open} handleClose={handleClose}/>
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-gray-700 mb-2">Epics</h1>
          <p className="text-sm">Organize user stories into larger epics</p>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Create Epic
        </Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
        {epics.map((epic, index) => {
            return <EpicCard key={index} epic={epic} />;
        })}
      </div>
    </div>
    </>
  );
}
