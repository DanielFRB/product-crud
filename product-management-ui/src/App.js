import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListProductComponent from './components/ListProductComponent';
import CreateProductComponent from './components/CreateProductComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route exact path = "/" component = { ListProductComponent }></Route>
            <Route path = "/products" component = { ListProductComponent }></Route>
            <Route path = "/add-product" component = { CreateProductComponent }></Route>
            <Route path = "/edit-product/:id" component = { CreateProductComponent }></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
};

export default App;
