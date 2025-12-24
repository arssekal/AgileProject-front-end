import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useEffect, useState } from "react";
import { listEpicUserStories } from "../services/epicService";
import DialogCard from "./DialogCard";

export default function EpicCard({ epic }) {
  const [open, setOpen] = useState(false);
  const [userStories, setUserStories] = useState([]);

  const [epicData, setEpicData] = useState({
    ...epic,
    userStoryCount: 0,
    progress: 0,
  });
  
  useEffect(() => {
    listEpicUserStories(epic.id).then((response) => {
      const data = response.data;
      setUserStories(data);
      const userStroyCount = data.length;
      let doneStories = 0;
      data.map((story) => {
        if (story.statut == "DONE") {
          doneStories++;
        }
      });
      const progress =
        userStroyCount > 0 ? (doneStories / userStroyCount) * 100 : 0;
      setEpicData({
        ...epic,
        userStoryCount: userStroyCount,
        progress: progress,
      });
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
    <DialogCard  open={open} handleClose={handleClose} stories={userStories}/>
    <div
      className="bg-white border-l-5 border-indigo-500 p-6 rounded-lg shadow-md"
      onClick={() => console.log(epicData.progress)}
    >
      <div className="flex gap-5 items-center mb-4">
        <AssignmentIcon className="text-indigo-500 mt-[7px]" />
        <span className="text-3xl font-bold">{epicData.titre}</span>
      </div>
      <p className="text-sm my-2.5">{epicData.description}</p>
      <div>
        <div className="flex justify-between font-bold text-gray-700">
          <p>Progress</p>
          <span>{epicData.progress}%</span>
        </div>
        <Slider
          value={epicData.progress}
          defaultValue={epicData.progress}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </div>
      <div className="flex justify-between">
        <span className="py-0 px-2.5 flex items-center bg-indigo-500 text-white rounded-2xl">
          {epicData.userStoryCount} stories
        </span>
        <Button variant="text" onClick={handleClickOpen} endIcon={<KeyboardArrowRightIcon />}>
          show stories
        </Button>
      </div>
    </div>
    </>
  );
}
