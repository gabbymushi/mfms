import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class EnsureLoggedInContainer extends React.Component {
    componentDidMount() {
        //const { dispatch, currentURL } = this.props
        if (!localStorage.getItem('token')) {
            let path = `/login`;
            this.props.history.push(path);
        }

        // if (!isLoggedIn) {
        //     // set the current url/path for future redirection (we use a Redux action)
        //     // then redirect (we use a React Router method)
        //     dispatch(setRedirectUrl(currentURL))
        //     browserHistory.replace("/login")
        // }
    }
    // logout() {
    //     // e.preventDefault();
    //     console.log('mm');
    //     localStorage.clear();
    //     window.location.href = '/';
    // }
    render() {
        // if (localStorage.getItem('token')) {
            return   this.props.children
        // } else {
        //     return null
        // }
    }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
// function mapStateToProps(state, ownProps) {
//     return {
//         isLoggedIn: state.loggedIn,
//         currentURL: ownProps.location.pathname
//     }
// }

export default withRouter(EnsureLoggedInContainer);