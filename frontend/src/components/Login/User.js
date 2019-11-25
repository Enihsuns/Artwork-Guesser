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
					User Information
                </Typography>

			</Container>
		</div>
	);
}

function PlayList(props) {
	const classes = useStyles();
	const plays = props.data;

	const handlePlayClick = (game) => {
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
					props.history.push(gamePath);
				}
			});
	}

	return (
		<Container className={classes.cardGrid} maxWidth="md">
			{plays && (
				<Grid container spacing={4}>
					{plays.map(play => (
						<Grid item key={play.id} xs={12} sm={6} md={4}>
							<Card className={classes.card}>
								<CardMedia
									className={classes.cardMedia}
									image={play.game.coverUrl}
									title="Image title"
								/>
								<CardContent className={classes.cardContent}>
									<div>
										<Typography gutterBottom variant="h5" component="h2">
											{play.game.title}
										</Typography>
										<Typography gutterBottom>
											{play.game.description}
										</Typography>
									</div>
									<div>
										<Typography display="inline" variant="subtitle1">Last Play &nbsp;</Typography>
										<Typography display="inline" color="secondary" variant="subtitle1">{play.score}</Typography>
										<Typography display="inline" variant="subtitle1">/{play.fullScore}</Typography>
									</div>
									<div>
										<Typography variant="subtitle2">{play.startTime}</Typography>
									</div>
								</CardContent>
								<CardActions>
									<Button size="small" color="primary" onClick={() => handlePlayClick(play.game)}>
										Play Again
                	</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
		</Container>
	);
}

class User extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			plays: []
		};

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
					{this.state.isLoading ? null : <PlayList data={this.state.plays} history={this.props.history}/>}
				</main>
				<Footer />
				<popup />
			</React.Fragment>
		);
	}

	initFetch = () => {
		fetch('/user', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(response => response.json())
			.then(body => this.setState({ plays: body.data, isLoading: false }));
	}

}

export default User;