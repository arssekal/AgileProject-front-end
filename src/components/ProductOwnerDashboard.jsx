import Card from "./Card";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import TimelineIcon from "@mui/icons-material/Timeline";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useEffect, useState } from "react";
import { listEpics } from "../services/productBacklogService";
import { listEpicUserStories } from "../services/epicService";

export default function ProductOwnerDashboard() {
  const [epics, setEpics] = useState([]);
  const cardsData = [
    {
      text: "Total User Stories",
      value: 128,
      icon: <CheckCircleIcon style={{ fontSize: 40, color: "#3f51b5" }} />,
    },
    {
      text: "Delivered Stories",
      value: 5,
      icon: <ChecklistIcon style={{ fontSize: 40, color: "#4caf50" }} />,
    },
    {
      text: "Ready for Sprint",
      value: 23,
      icon: <MarkChatReadIcon style={{ fontSize: 40, color: "#f44336" }} />,
    },
    {
      text: "Total Story Points",
      value: 12,
      icon: <TimelineIcon style={{ fontSize: 40, color: "#ff9800" }} />,
    },
  ];

  useEffect(() => {
    let firstThreeEpics = [];
    listEpics(1).then((response) => {
      let i = 0;
      for (let epic of response.data) {
        if (i++ >= 3) break;
        listEpicUserStories(epic.id).then((resp) => {
          const data = resp.data;
          const userStroyCount = data.length;
          let doneStories = 0;
          data.map((story) => {
            if (story.statut == "DONE") {
              doneStories++;
            }
          });
          const progress =
            userStroyCount > 0 ? (doneStories / userStroyCount) * 100 : 0;
          firstThreeEpics.push({ ...epic, progress: progress });
        });
      }
      console.log("===> "+ firstThreeEpics)
      setEpics(firstThreeEpics);
    });
    setEpics(firstThreeEpics);
  }, []);

  return (
    <div className="mx-auto">
      <div className="mb-5">
        <h1 className="font-bold text-2xl text-gray-700">
          Product Owner Dashboard
        </h1>
        <p className="text-sm">
          Manage your product backlog and sprint planning.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <Card key={index} cardContent={card} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <div className="bg-white py-3 px-5 rounded-xl shadow-md">
          <h4 className="font-bold mb-2.5 text-gray-500">Epic Progress</h4>
          {epics.map((epic) => {
            return (
              <div>
                <div className="flex justify-between font-bold text-gray-700">
                  <p className="font-bold mb-2.5 text-gray-500">Epic title</p>
                  <span>{epic.progress}%</span>
                </div>
                <Slider
                  value={epic.progress}
                  defaultValue={epic.progress}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />
              </div>
            );
          })}
          <Button variant="contained" className="w-full">
            See All Epics
          </Button>
        </div>

        <div className="bg-white py-3 px-5 rounded-xl shadow-md h-fit">
          <h4 className="font-bold mb-2.5 text-gray-500">Recent Activity</h4>
          <div className="flex items-center justify-between gap-2.5 border-b-2 border-gray-300 pb-1.5">
            <MyLocationIcon className="text-blue-500" />
            <div>
              <p>Story completed</p>
              <span>Password reset flow</span>
            </div>
            <span className="text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center justify-between gap-2.5 border-b-2 border-gray-300 pb-1.5">
            <MyLocationIcon className="text-blue-500" />
            <div>
              <p>Story completed</p>
              <span>Password reset flow</span>
            </div>
            <span className="text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center justify-between gap-2.5 border-b-2 border-gray-300 pb-1.5">
            <MyLocationIcon className="text-blue-500" />
            <div>
              <p>Story completed</p>
              <span>Password reset flow</span>
            </div>
            <span className="text-gray-500">2h ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
