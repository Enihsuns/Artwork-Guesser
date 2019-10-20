import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Footer from '../Common/Footer';
import ArtAppBar from '../Common/ArtAppBar';
import Score from './Score'

const useStyles = makeStyles(theme => ({
	mainArtwork: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginTop: 30,
		bottom: 0,
		width: '100%',
		maxHeight: '100%',
		paddingBottom: '75%',
		backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		zIndex: -1,
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

function GuessRect() {
	const classes = useStyles();
	
	return (
		<Container maxWidth="lg" paddingBottom='75%'>
			<main>
				<Box className={classes.mainArtwork} />
				<Container className={classes.sliderContainer}>
					<Slider
						defaultValue={0}
						getAriaValueText={valuetext}
						aria-labelledby="discrete-slider-always"
						min={-3000}
						max={2019}
						step={1}
						marks={marks}
						valueLabelDisplay="on"
						className={classes.slider}
					/>
				</Container>
				<Score />
			</main>
		</Container>
	);
}

class Game extends React.Component {
	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<ArtAppBar />
				<GuessRect />
				<Footer />
			</React.Fragment>
		);
	}

	fetchArtwork() {
		
	}
}

export default Game;