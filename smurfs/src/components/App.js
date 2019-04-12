import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchSmurfs } from "../actions";
import './App.css';
/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own. 
 Just remember, `how do I `connect` my components to redux?`
 `How do I ensure that my component links the state to props?`
 */
class App extends Component {
  state = {
    newSmurf: {
      name: "",
      age: "",
      height: ""
      // don't need id field
    }
  };

  componentDidMount() {
    this.props.fetchSmurfs();
  }

  // input field handleChanges event handler

  // onSubmit event handler


  render() {
    return (
      <div className="App">
        <h1>SMURFS! 2.0 W/ Redux</h1>
        <div>Welcome to your Redux version of Smurfs!</div>
        <div>Start inside of your `src/index.js` file!</div>
        <div>Have fun!</div>
        <div>
          {/* MAP OVER SMURFS */}
        </div>
        <div>
          {/* ADD NEW SMURF FORM */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  smurfs: state.smurfs
})

export default connect(mapStateToProps, { fetchSmurfs })(App);
