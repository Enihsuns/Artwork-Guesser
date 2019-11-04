import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import { Typography } from "@material-ui/core";

/** CSS */
const useStyles = makeStyles(theme => ({
  guessBtnContainer: {
    fontFamily: "sans-serif",
    textAlign: "center",
    position: 'relative',
    display: 'block',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dialogTitle: {
    textAlign: "center",
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  artworkInfoContainer: {
    position: 'relative',
    top: 10,
    overflow: 'hidden',
  },
  artworkImage: {
    position: 'relative',
    width: 128,
    borderRadius: 15,
  },
}));

/** Animation */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/** Export */
export default function Score(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  /** Data */
  const fetchScore = (guessTime) => {
    fetch('/game/score', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guessTime: guessTime
      })
    }).then(response => response.json())
      .then(body => {
        if (body.code === 0) {
          setData(body.data);
        }
      });
  }

  /** Event */
  const handleClickOpen = () => {
    setOpen(true);
    fetchScore(props.guessTime);
  };

  const handleClose = () => {
    setOpen(false);
    props.onDialogClose();
  };

  /** UI */
  return (
    <Grid container className={classes.guessBtnContainer} justify='center'>
      <Button onClick={handleClickOpen} variant="outlined" >Guess</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        scroll="body"
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <div>
            <Typography variant="h2" component="h2" display="inline" color="secondary">
              {data.roundScore}
            </Typography>
            <Typography variant="h2" component="h2" display="inline">
              /{data.roundFullScore}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" color="textSecondary" display="inline">You Guessed: &nbsp;</Typography>
            <Typography variant="subtitle1" color="secondary" display="inline">{data.guessTime} &nbsp;</Typography>
            <Typography variant="subtitle1" color="textSecondary" display="inline">Answer: &nbsp;</Typography>
            <Typography variant="subtitle1" color="textSecondary" display="inline">
              {data.objectBeginDate}-{data.objectEndDate}
            </Typography>
          </div>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent className={classes.artworkInfoContainer}>
          <Grid container spacing={4}>
            <Grid item>
              <ButtonBase>
                <img className={classes.artworkImage} alt={data.title} src={data.artworkCoverUrl}></img>
              </ButtonBase>
            </Grid>
            <Grid
              item
              xs={12}
              sm
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              spacing={1}>
              <Grid item>
                <Typography variant="h5" display="inline">{data.title} &nbsp;</Typography>
                <Typography variant="h6" color="textSecondary" display="inline">
                  {data.objectDate}
                </Typography>
                <Typography variant="subtitle1">
                  {data.artist}
                </Typography>
                <Typography variant="body2">
                  {data.displayPosition}
                </Typography>
              </Grid>
              <Grid item>
                <div>
                  <Typography variant="body2" display="inline">Medium: &nbsp;</Typography>
                  <Typography variant="body2" display="inline" color="textSecondary">
                    {data.medium}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body2" display="inline">Classification: &nbsp;</Typography>
                  <Typography variant="body2" display="inline" color="textSecondary">
                    {data.classification}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Next Round
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );

}