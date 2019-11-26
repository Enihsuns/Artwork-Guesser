import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function UserMenuItems(auth) {
	const loginItems = [{
		title: 'Profile',
		path: '/user'
	}, {
		title: 'Logout',
		path: '/logout'
	}];
	const logoutItems = [{
		title: 'Sign In',
		path: '/login',
	}, {
		title: 'Sign Up',
		path: '/signup',
		}];

	return auth ? loginItems : logoutItems;
}

export default function ArtAppBar(props) {
	const classes = useStyles();
	const [auth, setAuth] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [email, setEmail] = React.useState({});

	function handleChange(event) {
		setAuth(event.target.checked);
	}

	function handleMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	function handleMenuItemClick(item) {
		props.history.push(item.path);
	}

	function handleTitleClick() {
		const homePath = '/';
		props.history.push(homePath);
	}

	async function fetchData() {
		fetch('/check', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then(response => response.json())
			.then(body => {
				if (body.code === 10003) {
					setAuth(false);
				} else {
					setAuth(true);
					setEmail(body.data);
				}
			});
	}

	useEffect(() => {
		fetchData()
	}, []);


	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={handleTitleClick}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Artwork Guesser
          </Typography>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={open}
							onClose={handleClose}
						>
							{UserMenuItems(auth).map(item => (
								<MenuItem onClick={() => handleMenuItemClick(item)}>{item.title}</MenuItem>
							))}
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}