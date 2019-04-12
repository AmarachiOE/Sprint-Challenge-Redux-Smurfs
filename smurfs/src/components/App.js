import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSmurfs, addSmurf } from "../actions";
import Loader from 'react-loader-spinner';
import "./App.css";

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
    // clear form after submit
    this.setState({
      newSmurf: {
        name: "",
        age: "",
        height: ""
      }
    }); 
  };

  // onClick event handler -- invoke deleteSmurf function here

  render() {
    // conditional rendering if fetchingSmurfs is true
    if (this.props.fetchingSmurfs) {
      return (
        // <Loader type="ThreeDots" color="blue" height={100} width={100} />
        <div className="fetching-state-container">
        <h1 className="fetching-animation">.</h1>
        <h1 className="fetching-text">One moment please...</h1>
        </div>
      );
    }
    return (
      <div className="App">
        <div className="container Smurfs-container">
          <h1>SMURF VILLAGE</h1>
          <div className="smurf-list">
            {this.props.smurfs.map((smurf, index) => {
              return (
                <div key={index} className="each-smurf">
                  <h3>
                    {smurf.name}, {smurf.age}
                    <i class="fas fa-trash-alt delete-icon" />
                  </h3>
                  <p>{smurf.height} short</p>

                </div>
              );
            })}
          </div>
        </div>
        {/* Add Smurf Form could be a different page. If so, need Route and Link components */}
        <div className="container SmurfForm-container">
          <h2>Add a New Smurf</h2>
          <form className="SmurfForm" onSubmit={this.submitForm}>
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
            <button className="form-btn">Add Smurf</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  smurfs: state.smurfs,
  fetchingSmurfs: state.fetchingSmurfs
});

export default connect(
  mapStateToProps,
  { fetchSmurfs, addSmurf }
)(App);
