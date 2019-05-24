import React, {Component} from 'react';
import './App.css';
import Routes from './components/Routes';
import './css/jumbotron-narrow.css';
import {IntlProvider} from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale="en">
          <div className="container-customized">
            <Routes/>
          </div>
        </IntlProvider>
      </Provider>
    );
  }
}

export default App;
