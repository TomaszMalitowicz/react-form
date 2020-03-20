import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    accept: false,
    message: '',

    errors: {
      username: false,
      email: false,
      password: false,
      accept: false
    }
  }


  messages = {
    username_incorrect: ' username must have at least 10 alphanumeric characters and cannot contain space',
    email_incrrect: " There is no @ in the mail",
    password_incorrect: " Password must halve alt least 8 characters",
    accept_incorrect: " You must accept privet policy"
  }

  handleChange = (e) => {

    const name = e.target.name;
    const type = e.target.type;

    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;
      this.setState({
        [name]: value
      })
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const validation = this.formValidation()
    console.log(validation)

    console.log('działa')
    if (validation.correct) {
      this.setState({
        username: '',
        email: '',
        password: '',
        accept: false,
        message: 'You signed Pact with the Devli, you dont have soul anymore!',

        errors: {
          username: false,
          email: false,
          password: false,
          accept: false
        }
      })
      console.log("form send")

    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          password: !validation.password,
          accept: !validation.accept
        }
      })
    }
  }

  formValidation = () => {
    //true -ok
    //false - bad
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    if (this.state.username.length > 10 && this.state.username.indexOf(' ') === -1) {
      username = true;
    }

    if (this.state.email.indexOf('@') !== -1) {
      email = true;
    }
    if (this.state.password.length >= 10) {
      password = true;
    }
    if (this.state.accept) {
      accept = true;
    }

    if (username && email && password && accept) {
      correct = true;
    }
    return ({
      correct,
      username,
      email,
      password,
      accept,
    })
  }


  componentDidUpdate() {
    if (this.state.message !== '') {
      setTimeout(() =>
        this.setState({
          message: ''
        }), 3000)
    }
  }

  render() {
    return (
      <div className="App" >
        <p>Come, join the dark side and make the best evil loking app in the web <span role="img" arial-lable="Devil">😈</span></p>

        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">Your name:
         <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} />
            {this.state.errors.username && <span>{this.messages.username_incorrect}</span>}
          </label>

          <label htmlFor="email">Email adress:
         <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
            {this.state.errors.email && <span>{this.messages.email_incrrect}</span>}
          </label>

          <label htmlFor="password">Password:
         <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
            {this.state.errors.password && <span>{this.messages.password_incorrect}</span>}
          </label>
          <label htmlFor="accept">
            <input className="checkmark" type="checkbox" id="accept" name="accept" checked={this.state.accept} onChange={this.handleChange} /> I’ve read and agree the privacy policy of the EvilCorp inc.
          </label>
          {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}
          <br />
          <button>Sign yourself</button>
        </form>
        <div className="logo"><h1>E</h1><p>e corp</p></div>
        {this.state.message && <h2>{this.state.message}</h2>}
      </div>
    );
  }
}

export default App;
