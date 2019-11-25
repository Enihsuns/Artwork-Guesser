import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Footer from '../Common/Footer';
import ArtAppBar from '../Common/AppBar';
import TutorialModal from '../Common/TutorialModal';
import Score from './Score'

const useStyles = makeStyles(theme => ({
	artworkContainer: {
		position: 'relative',
		marginTop: 30,
		bottom: 0,
		zIndex: -1,
	},
	artwork: {
		position: 'relative',
		height: '75vh',
	},
	sliderContainer: {
		position: 'relative',
		backgroundColor: 'rgba(255,255,255,0.8)',
		marginTop: -40,
		height: 85,
		verticalAlign: 'bottom',
	},
	slider: {
		position: 'relative',
		marginTop: 45,
		width: '94%',
		marginLeft: '3%',
	},
	confirmButton: {
		position: 'relative',
		color: theme.palette.primary,
		display: 'block',
		marginTop: 20,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
}));

const marks = [
	{
		value: -3000,
		label: '3,000 BC',
	},
	{
		value: 1,
		label: 'AD 1',
	},
	{
		value: 2019,
		label: '2019 AD',
	},
];

function valuetext(value) {
	return `${value}°C`;
}

function GuessRect(props) {
	const classes = useStyles();

	const [guessTime, setGuessTime] = React.useState(0);

	const onSliderChange = (event, newValue) => {
		setGuessTime(newValue);
	};

	const onDialogClose = () => {
		props.fetchArtwork();
	};

	return (
		<Container maxWidth="lg" paddingBottom='75%'>
			<main>
				<Grid container justify='center' className={classes.artworkContainer}>
					<img className={classes.artwork} alt="artwork" src={props.artworkCoverUrl}></img>
				</Grid>
				<Container className={classes.sliderContainer}>
					<Slider
						value={guessTime}
						getAriaValueText={valuetext}
						aria-labelledby="discrete-slider-always"
						min={-3000}
						max={2019}
						step={1}
						marks={marks}
						valueLabelDisplay="on"
						className={classes.slider}
						onChange={onSliderChange}
					/>
				</Container>
				<Score guessTime={guessTime} onDialogClose={onDialogClose}/>
			</main>
		</Container>
	);
}

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			artworkCoverUrl: "",
			guessTime: 0,
		};

		this.fetchArtwork = this.fetchArtwork.bind(this);
	}

	componentDidMount() {
		this.fetchArtwork();
	}

	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<TutorialModal />
				<ArtAppBar history={this.props.history} />
				{
					this.state.isLoading ? null :
						<GuessRect
							artworkCoverUrl={this.state.artworkCoverUrl}
							fetchArtwork={this.fetchArtwork}
						/>
				}
				<Footer />
			</React.Fragment>
		);
	}

	/* Data */
	fetchArtwork() {
		this.setState({ isLoading: true });

		fetch('/game/artwork', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then(response => response.json())
			.then(body => {
				if (body.code === 0) {
					// Check if has completed all rounds.
					if (body.data.isEnd) {
						const resultPath = '/game/result';
						this.props.history.push(resultPath);
						return;
					}

					// Current artwork.
					this.setState({ isLoading: false, artworkCoverUrl: body.data.artworkCoverUrl });
				}
			});
	}
}

export default Game;