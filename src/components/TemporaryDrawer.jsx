import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// icons
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useWhatToShow } from '../contexts/WhatToShow';

export default function TemporaryDrawer({open, toggleDrawer}) {
  const {show, setShow} = useWhatToShow();

  const handleClick = (item) => {
    setShow(item.toLowerCase());
    console.log("Showing: ", item.toLowerCase());
  }
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[{"text": 'Dashboard', "icon": <PersonalVideoIcon />}, {"text": 'Product Backlog', "icon": <MenuBookIcon />}, {"text": 'Epics', "icon": <FormatListNumberedIcon />}, {"text": 'Reports', "icon": <AssessmentIcon />}].map((item, index) => (
          <ListItem key={item.text} disablePadding onClick={() => handleClick(item.text)}>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Users'].map((text) => (
          <ListItem key={text} disablePadding onClick={() => handleClick("Users")}>
            <ListItemButton>
              <ListItemIcon>
                {<PeopleOutlineIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div> 
      <Drawer open={open} onClose={toggleDrawer(false)} disableScrollLock>
        {DrawerList}
      </Drawer>
    </div>
  );
}
