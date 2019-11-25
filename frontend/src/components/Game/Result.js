import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArtAppBar from '../Common/AppBar'
import Footer from '../Common/Footer';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    marginTop: 60,
  },
  card: {
    maxWidth: 345,
  },
}));

function ScoreRect(props) {
  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.container}>
      <Typography variant="h2" component="h2" display="inline" color="secondary">
        {props.data.score}
      </Typography>
      <Typography variant="h2" component="h2" display="inline">
        /{props.data.fullScore}
      </Typography>
    </Grid>
  );
}

/* View */
export default class Result extends React.Component {
  /* Lifecycle */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: {},
    };

    this.fetchScore = this.fetchScore.bind(this);
  }

	componentDidMount() {
		this.fetchScore();
	}

  /* Data */
  fetchScore() {
    fetch('/game/result', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(body => {
        if (body.code === 0) {
          this.setState({ isLoading: false, data: body.data });
        }
      });
  }

  render() {
    return (
      <React.Fragment>
        <ArtAppBar history={this.props.history} s/>
        {this.state.isLoading ? null : <ScoreRect data={this.state.data} />}
        <Footer />
      </React.Fragment>
    );
  }
}