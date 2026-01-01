import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import TemporaryDrawer from "./TemporaryDrawer";
// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box className="mx-auto grow fixed top-0 left-0 right-0 z-50">
      <TemporaryDrawer open={open} toggleDrawer={toggleDrawer} />
      <AppBar position="static">
        <Toolbar className="bg-linear-to-l flex justify-between from-blue-500 to-blue-600">
          <div className="flex gap-2.5 items-center">
            <div className="lg:hidden">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              SCRUM
            </Typography>
          </div>

          <div className="hidden lg:block">
            <ul className="flex gap-2.5">
              <Link to={"dashboard"}>
                <li className="font-bold p-1.5 cursor-pointer hover:text-zinc-100">
                  Dashboard
                </li>
              </Link>
              <Link to={"/projects"}>
                <li className="font-bold p-1.5 cursor-pointer hover:text-zinc-100">
                  Projects
                </li>
              </Link>
              <Link to={"/"}>
                <li className="font-bold p-1.5 cursor-pointer hover:text-zinc-100">
                  Backlogs
                </li>
              </Link>
            </ul>
          </div>

          <div className="flex gap-2 items-center">
            <AccountCircleIcon />
            <div>
              <p>Arssekal Lhoussaine</p>
              <span>Product Owner</span>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

function SimpleBadge() {
  return (
    <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
}
