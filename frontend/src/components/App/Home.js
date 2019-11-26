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
import ArtAppBar from '../Common/AppBar';
import Footer from '../Common/Footer';

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
      </Container>
    </div>
  );
}

function GameList(props) {
  const classes = useStyles();
  const games = props.data;
  const handlePlayClick = props.handlePlayClick;

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
                  {game.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handlePlayClick(game)}>
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

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      games: []
    };

    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  componentDidMount() {
    this.initFetch();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ArtAppBar history={this.props.history} />
        <main>
          <Banner />
          {this.state.isLoading ? null : <GameList data={this.state.games} handlePlayClick={this.handlePlayClick} />}
        </main>
        <Footer />
        <popup />
      </React.Fragment>
    );
  }

  /* Data */
  initFetch = () => {
    fetch('/home/games')
      .then(response => response.json())
      .then(body => this.setState({ games: body.data, isLoading: false }));
  }

  /* Play Game Click */
  handlePlayClick(game) {
    fetch('/game/start', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameId: game.id,
      })
    }).then(response => response.json())
      .then(body => {
        if (body.code === 0) {
          const gamePath = 'game';
          this.props.history.push(gamePath);
        }
      });
  }
}

export default Home;