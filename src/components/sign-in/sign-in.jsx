import React from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password : ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({email:'',password: ''});
    }

    handleChange = event =>{
        const {name, value} = event.target;

        this.setState ( {[name] : value} );
    }

    logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    render(){
        return(
            <div className="sign-in">
                <h1>Sign in page</h1>
                <button onClick={this.logGoogleUser}>Sign in with google</button>
            </div>
        )
    }
}
export default SignIn;
