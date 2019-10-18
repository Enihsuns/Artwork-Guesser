import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Game from '../Game/Game';
import Result from '../Game/Result';
import SignInSide from '../Login/SignInSide'
import SignUp from '../Login/SignUp'

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/game" component={Game} />
						<Route exact path="/game/result" component={Result} />
						<Route exact path="/SignInSide" component={SignInSide} />
						<Route exact path="/SignUp" component={SignUp} />
						<Route
              render={function() {
                return <p>Not Found</p>;
              }}
            />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
