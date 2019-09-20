import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import ArtAppBar from '../Common/ArtAppBar';

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
	footer: {
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(8),
		padding: theme.spacing(6, 0),
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

function valuetext(value) {
	return `${value}°C`;
}

export default function Game() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<ArtAppBar />
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
					<Button variant="outlined" className={classes.confirmButton}>
						Guess
          </Button>
				</main>
			</Container>
			{/* Footer */}
			<footer className={classes.footer}>
				<Container maxWidth="lg">
					<Typography variant="h6" align="center" gutterBottom>
						Footer
          </Typography>
					<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
						Something here to give the footer a purpose!
          </Typography>
					<Copyright />
				</Container>
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}