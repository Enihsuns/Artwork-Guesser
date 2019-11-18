import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    color: 'white',
  },
  icon: {
    color: 'white',
  },
  artworkTutorialContainer: {
    position: 'absolute',
    left: '60%',
    top: '20%',
  },
  sliderTutorialContainer: {
    position: 'absolute',
    right: '10%',
    top: '80%',
  },
}));

function TutorialSteps(props) {
  const classes = useStyles();

  switch (props.step) {
    case 0:
      return (
        <div>
          <Typography variant="h4" component="h2" display="inline" className={classes.text}>
            Welcome to Artwork Guesser Game!
          </Typography>
        </div>
      );
    case 1:
      return (
        <div className={classes.artworkTutorialContainer}>
          <ArrowBackIcon display="inline" className={classes.icon} />
          <Typography variant="h4" component="h4" display="inline" className={classes.text}>
            &nbsp; Here is the artwork you are guessing!
          </Typography>
        </div>
      );
    case 2:
      return (
        <div className={classes.sliderTutorialContainer}>
          <ArrowDownwardIcon display="inline" className={classes.icon} />
          <Typography variant="h4" component="h4" display="inline" className={classes.text}>
            &nbsp; You can guess when the artwork was created using this slider!
          </Typography>
        </div>
      );
  }
}

export default function TutorialModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [step, setStep] = React.useState(0);

  const handleClose = () => {
    if (step < 2) {
      setStep(step + 1);
    }
    else {
      setOpen(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <TutorialSteps step={step} />
        </Fade>
      </Modal>
    </div>
  );
}
