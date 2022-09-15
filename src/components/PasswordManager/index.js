import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    passwordsList: [],
    searchInput: '',
    showPasswords: false,
  }

  onChangeWebsite = event => {
    this.setState({inputWebsite: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({inputUsername: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {inputWebsite, inputUsername, inputPassword} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    if (inputWebsite !== '' && inputUsername !== '' && inputPassword !== '') {
      const createPassword = {
        id: uuidv4(),
        website: inputWebsite,
        username: inputUsername,
        password: inputPassword,
        initialClassName: initialBackgroundColorClassName,
      }
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, createPassword],
        inputWebsite: '',
        inputUsername: '',
        inputPassword: '',
      }))
    }
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const updatedPasswords = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: updatedPasswords})
  }

  onChangePasswordView = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  getPasswordsList = () => {
    const {passwordsList, searchInput} = this.state
    const filteredPasswordsList = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredPasswordsList
  }

  render() {
    const {
      inputWebsite,
      inputUsername,
      inputPassword,
      showPasswords,
    } = this.state

    const updatedPasswordsList = this.getPasswordsList()
    const passwordsCount = updatedPasswordsList.length

    return (
      <div className="pass-bg-container">
        <div className="pass-app-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="pass-input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="pass-main-img"
            />
            <form
              className="pass-input-element-container"
              onSubmit={this.onAddPassword}
            >
              <h1 className="add-new-text">Add New Password</h1>
              <div className="input-website-container">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="logo"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="input"
                    onChange={this.onChangeWebsite}
                    value={inputWebsite}
                  />
                </div>
              </div>
              <div className="input-website-container">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="logo"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="input"
                    onChange={this.onChangeUsername}
                    value={inputUsername}
                  />
                </div>
              </div>
              <div className="input-website-container">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="logo"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="input"
                    onChange={this.onChangePassword}
                    value={inputPassword}
                  />
                </div>
              </div>
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>

          {/* Next Session */}

          <div className="pass-output-container">
            <div className="top-section">
              <div className="counter-section">
                <h1 className="your-password">Your Passwords</h1>
                <div className="counter">
                  <p className="count">{passwordsCount}</p>
                </div>
              </div>
              <div className="input-website-container search-element">
                <div className="input-logo">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="logo"
                  />
                </div>
                <div className="input-element">
                  <input
                    type="search"
                    className="input"
                    placeholder="Search"
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
            </div>
            <hr className="hr-line" />
            <div className="toggle-view">
              <input
                type="checkbox"
                className="check"
                id="checkBox"
                onChange={this.onChangePasswordView}
                value={showPasswords}
              />
              <label htmlFor="checkBox" className="show-password">
                Show passwords
              </label>
            </div>
            {updatedPasswordsList.length === 0 ? (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-image"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            ) : (
              <ul className="outputs">
                {updatedPasswordsList.map(eachPassword => (
                  <PasswordItem
                    key={eachPassword.id}
                    passwordDetails={eachPassword}
                    initialBackground={initialContainerBackgroundClassNames}
                    showStatus={showPasswords}
                    onDeletePassword={this.onDeletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
