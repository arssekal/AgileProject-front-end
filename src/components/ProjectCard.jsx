import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {

  let statusClass = "";
  if (project.status === "PLANNED") {
    statusClass = "bg-gray-500";
  } else if (project.status === "IN_PROGRESS") {
    statusClass = "bg-yellow-500";
  } else if (project.status === "COMPLETED") {
    statusClass = "bg-green-500";
  }
  return (
    <div className="group p-3.5 border rounded-lg border-zinc-300 bg-white flex flex-col gap-4 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center">
        <Link to={`/projects/${project.id}`}>
          <p className="font-bold text-lg text-gray-700 cursor-pointer group-hover:text-blue-500">
            {project.nom}
          </p>
        </Link>
        <span className={`flex items-center ${statusClass} px-1.5 rounded-full text-white`}>
          {project.status}
        </span>
      </div>
      <p className="text-sm md:text-shadow-lg">{project.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p>{project.createdAt}</p>
        <Link to={`/projects/${project.id}`}>
          <span className="text-blue-500 sm:text-white group-hover:text-blue-500 transition-colors transition-duration-200 cursor-pointer">
            View <ArrowRightAltIcon />
          </span>
        </Link>
      </div>
    </div>
  );
}
