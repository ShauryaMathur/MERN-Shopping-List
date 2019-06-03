import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/navbar';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import  ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal';
import {Container} from 'reactstrap';
import {loadUser} from './actions/authactions';


class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar/> 
           <Container>
              <ItemModal/>
              <ShoppingList/>
          </Container>
        </div>
      </Provider>
  );
}
}

export default App;
