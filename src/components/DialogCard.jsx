import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DialogCard({ stories, open, handleClose }) {

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        disableScrollLock
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          User Stories
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {
            stories.map((story) => (
              <div key={story.id} className='flex w-100 justify-between p-3.5 bg-zinc-200 mb-2 rounded-lg'>
                <div>
                  <p className='font-bold text-md'>{story.titre}</p>
                  <span className='text-sm text-gray-700'>{story.priority}</span>
                </div>
                <span className='text-sm py-1 text-white px-2 h-fit font-bold bg-indigo-500 rounded-2xl flex items-center'>{story.statut}</span>
              </div>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
