import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import './assets/sass/app.scss';

const App = (): JSX.Element => (
  <>
    <Game />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
