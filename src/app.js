import React from 'react';
import ReactDOM from 'react-dom';

import ReactFilestack from 'react-filestack'
import 'bulma';
import './assets/scss/style.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import IndexRoute from './components/images/IndexRoute';
import ShowRoute from './components/images/ShowRoute';
import NewRoute from './components/images/NewRoute';
import EditRoute from './components/images/EditRoute';
import TelV from './components/images/TelV';

import ProfileRoute from './components/users/ProfileRoute';
import LikedRoute from './components/users/LikedRoute';

import Auth from './lib/Auth';
import User from './lib/User';

import axios from 'axios';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
         <main>
           <Navbar />
           <section>
             <Switch>
               <Route path="/users/:id" component={ProfileRoute} />
               <Route path="/images/:id/edit" component={EditRoute} />
               <Route path="/images/new" component={NewRoute} />
               <Route path="/images/:id" component={ShowRoute} />
               <Route path="/images/liked" component={LikedRoute} />
               <Route path="/images" component={IndexRoute} />
               <Route path="/tv" component={TelV} />
               <Route path="/login" component={Login} />
               <Route path="/register" component={Register} />
           </Switch>
           </section>
         </main>
      </BrowserRouter>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
