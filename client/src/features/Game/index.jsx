import { Route, Switch, useRouteMatch } from 'react-router-dom';

import GameMain from './pages/GameMain';
import NotFound from 'components/NotFound';
import PropTypes from 'prop-types';
import React from 'react';

Game.propTypes = {
    
};

function Game(props) {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}`} component={GameMain} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Game;