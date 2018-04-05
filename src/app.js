import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import Navbar from './components/common/Navbar';
import Register from './components/auth/Register';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
         <main>
           {/* <Navbar /> */}
           <section>
             <Switch>
             <Route path="/" component={Register} />
             <h1>Unstagram</h1>
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
