import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ArtAppBar from '../Common/ArtAppBar'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

/* View */

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Artwork Guesser
            </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          How Well Do You Know Art History?
            </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
                Main call to action
                  </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Secondary action
                  </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}

function GameList(props) {
  const classes = useStyles();
  const games = props.data;

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {games.map(game => (
          <Grid item key={game.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={game.coverUrl}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {game.title}
                    </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the content.
                    </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Play
                    </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Footer
        </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
        </Typography>
      <Copyright />
    </footer>
  );
}

/**function popup() {
  
  return (
    <Popup trigger = {<button>show score</button> }>
      content = "score"
      on = click
    </Popup>

  )
} **/

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Home extends React.Component {
  state = {
    isLoading: true,
    games: []
  };

  componentDidMount() {
    this.initFetch();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ArtAppBar />
        <main>
          <Banner />
          {this.state.isLoading ? null : <GameList data={this.state.games} />}
        </main>
        <Footer />
        <popup />
      </React.Fragment>
    );
  }

  /* Data */
  initFetch = () => {
    fetch('/home')
      .then(response => response.json())
      .then(body => this.setState({ games: body, isLoading: false }))
  }
}

export default Home;