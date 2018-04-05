import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Register from './components/auth/Register';
import IndexRoute from './components/images/IndexRoute';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
         <main>
           <Navbar />
           <section>
             <Switch>
               <Route path="/images" component={IndexRoute} />
               <Route path="/" component={Register} />
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
