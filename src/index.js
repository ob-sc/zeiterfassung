import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './components/App';
import Provider from './components/Provider';

ReactDOM.render(
  <Provider>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
);
