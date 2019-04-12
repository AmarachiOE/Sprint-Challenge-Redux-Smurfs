import React, { Component } from 'react';
import { connect } from "react-redux";

import { fetchSmurfs, addSmurf } from "../actions";
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
    // invoke fetchSmurfs function here
    this.props.fetchSmurfs();
  }

  // invoking the addSmurf function and pass in this.state.newSmurf. That's the connection between this component state and the redux store state.  

  // input field handleChanges event handler
  handleChanges = e => {
    this.setState({
      newSmurf: {
        ...this.state.newSmurf,
        [e.target.name]: e.target.value
      }
    });
  };

  // onSubmit event handler -- invoke addSmurf function here
  submitForm = e => {
    e.preventDefault();
    this.props.addSmurf(this.state.newSmurf);
    this.setState({
      newSmurf: {
        name: "",
        age: "",
        height: ""
    }
  })
}



  render() {
    // conditional rendering if fetchingSmurfs is true
    if (this.props.fetchingSmurfs) {
      return (
        <div>
          <h1>One moment please...</h1>
        </div>
      );
    }
    return (
      <div className="App">
        <h1>SMURFS! 2.0 W/ Redux</h1>
        <div>Welcome to your Redux version of Smurfs!</div>
        <div>Start inside of your `src/index.js` file!</div>
        <div>Have fun!</div>
        
          {this.props.smurfs.map( smurf => {
            return (
              <div>
                <h3>{smurf.name}, {smurf.age}</h3>
                <p>{smurf.height} short</p>
              </div>
            )
          } )}
        {/* Add Smurf Form could be a different page. If so, need Route and Link components */}
        <div>
          <h3>Add a New Smurf to the Village Here:</h3>
          <form onSubmit={this.submitForm}>
            <input 
              type="string"
              name="name"
              value={this.state.newSmurf.name}
              placeholder="What's their name?"
              onChange={this.handleChanges}
            />
            <input 
              type="number"
              name="age"
              value={this.state.newSmurf.age}
              placeholder="How old are they?"
              onChange={this.handleChanges}
            />
            <input 
              type="string"
              name="height"
              value={this.state.newSmurf.height}
              placeholder="How short are they?"
              onChange={this.handleChanges}
            />
            <button>Add Smurf</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  smurfs: state.smurfs,
  fetchingSmurfs: state.fetchingSmurfs,
})

export default connect(mapStateToProps, { fetchSmurfs, addSmurf })(App);
