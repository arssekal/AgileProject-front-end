import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { listUserStories } from "../services/productBacklogService";
import { useState } from "react";
// table component imports
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import AddStoryCard from "./AddStoryCard";

export default function ProductBacklog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <AddStoryCard  open={open} handleClose={handleClose}/>
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-gray-700">Product Backlog</h1>
          <p className="text-sm">Manage and prioritize user stories.</p>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add Story
        </Button>
      </div>
      <div className="my-8 rounded-lg border-2 border-gray-400 p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-gray-700">User Stories</h3>
          <TextField
            id="filled-basic"
            label="search stories"
            variant="filled"
          />
        </div>
        <CustomizedTables />
      </div>
    </div>
    </>
  );
}

// table component

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CustomizedTables() {
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    listUserStories(1).then((resrponse) => setUserStories(resrponse.data));
  }, []);

  const statusStyle = (status) => {
    switch (status) {
      case 'TO_DO':
        return 'bg-blue-500';
      case 'IN_PROGRESS':
        return 'bg-yellow-500';
      case 'DONE':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Priority</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="left">critère d'acceptation</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userStories.map((row) => (
            <StyledTableRow key={row.priority}>
              <StyledTableCell component="th" scope="row">
                {row.priority}
              </StyledTableCell>
              <StyledTableCell align="left">{row.titre}</StyledTableCell>
              <StyledTableCell align="left">{row.critereAcceptation}</StyledTableCell>
              <StyledTableCell align="left"><span className={`p-2 rounded-xl text-white ${statusStyle(row.statut)}`}>{row.statut}</span></StyledTableCell>
              <StyledTableCell align="left">
                <div className="flex gap-3">
                  <EditSquareIcon className="text-blue-500 cursor-pointer hover:text-blue-700" />
                  <DeleteForeverIcon className="text-red-600 cursor-pointer hover:text-red-800" />
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
