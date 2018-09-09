import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company_name: "",
      token_name: "",
      role: "",
      description: "",
      link: "",
      contact: "",
      rewards: "",
      num_tokens: "100",
      formType: "",
      token_info: "",
    };
  }

  update(input) {
    // console.log(this.state);
    return e =>
      this.setState({
        [input]: e.currentTarget.value
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const tokenRequest = Object.assign({}, this.state);
    console.log(tokenRequest);

    axios
      .post("api/sponsors", tokenRequest)
      .then(res => {
        
        console.log(res.data);
        
        this.setState({
            token_info: res.data,
           formType: "done" 
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.formType === "done") {
      return (
        <div className="home">
          <div className="alert">
            your token {this.state.tokenName} has been stamped!
          </div>
          <br/>
          <br/>
          {/* your token info: {Object.values(this.state.token_info)} */}
        </div>
      );
    } else {
      return (
        <div className="home">
          <form
            autoComplete="off"
            spellCheck="true"
            className="login-form"
            onSubmit={this.handleSubmit}
          >
            <div className="field">
              <input
                id="text"
                type="text"
                aria-label="Enter your email"
                name="alias"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="none"
                className="text-field"
                placeholder="Company Name"
                onChange={this.update("company_name")}
              />
              <input
                id="text"
                type="text"
                aria-label="Enter your email"
                name="alias"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="none"
                className="text-field"
                placeholder="Token Name"
                onChange={this.update("token_name")}
              />
              <input
                id="text"
                type="text"
                aria-label="Enter your email"
                name="alias"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="none"
                className="text-field"
                placeholder="Role"
                onChange={this.update("role")}
              />
              <input
                id="text"
                type="text"
                aria-label="Enter your email"
                name="alias"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="none"
                className="text-field"
                placeholder="Description of role"
                onChange={this.update("description")}
              />
              <input
                id="text"
                type="text"
                aria-label="Enter your email"
                name="alias"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="none"
                className="text-field"
                placeholder="Link"
                onChange={this.update("link")}
              />
              <input
                id="text"
                type="text"
                aria-label="Enter your email"
                name="alias"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="none"
                className="text-field"
                placeholder="Contact info"
                onChange={this.update("contact")}
              />
              <input
                id="text"
                type="text"
                aria-label="Enter your email"
                name="alias"
                autoComplete="off"
                spellCheck="false"
                autoCapitalize="none"
                className="text-field"
                placeholder="Rewards"
                onChange={this.update("rewards")}
              />
            </div>

            <div className="alias-submit">
              <div className="submit-button-component ">
                <button
                  type="submit"
                  value="done"
                  aria-label="Request Sign In Code"
                  className="theme-button"
                >
                  Stamp Token
                </button>
                <div className="spinner-container " />
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default App;
