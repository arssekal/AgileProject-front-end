import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

export default function Sprint({ sprint, projectId }) {
  function sprintStatus() {
    const dateDebut = sprint.dateDebut;
    const today = new Date().toISOString().split("T")[0];
    const dateFin = sprint.dateFin;
    if (compareDates(today, dateDebut) < 0) {
      return {
        style: "bg-gray-400 ",
        status: "PLANNED",
      };
    }
    if (compareDates(today, dateFin) > 0) {
      return {
        style: "bg-orange-500",
        status: "COMPLETED",
      };
    }
    return {
      style: "bg-green-500",
      status: "ACTIVE",
    };
  }

  function compareDates(date1, date2) {
    if (date1 < date2) return -1;
    if (date1 > date2) return 1;
    return 0;
  }

  return (
    <div className="group flex flex-col justify-evenly p-5 border rounded-md border-zinc-400 shadow-lg bg-white">
      <div className="flex justify-between">
        <div>
          <h4 className="text-gray-800 text-lg font-semibold">{sprint.nom}</h4>
          <p className="text-sm  md:text-md text-gray-600">
            {sprint.description}
          </p>
        </div>
        <span className={`h-fit ${sprintStatus().style} text-white px-1.5 rounded-full`}>{sprintStatus().status}</span>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-sm text-gray-500 mt-2">
          <span>{sprint.dateDebut}</span>
          <ArrowRightAltIcon className="mx-1 text-gray-400" />
          <span>{sprint.dateFin}</span>
        </div>
        <Link to={`/projects/${projectId}/sprint-backlog/${sprint.id}`}>
          <span className="block sm:hidden text-blue-500 transition-colors transition-duration-200 cursor-pointer group-hover:inline-block">
            Sprint Backlog
            <ArrowRightAltIcon />
          </span>
        </Link>
      </div>
    </div>
  );
}
