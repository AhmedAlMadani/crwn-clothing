import React from 'react';
import './App.css';
import { Route,Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header';
import Authentication from './components/authentication/authentication';
function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component = {HomePage}/>
        <Route exact path='/shop' component = {ShopPage}/>
        <Route exact path='/auth' component = {Authentication}/>

      </Switch>
    </div>
  );
}

export default App;
