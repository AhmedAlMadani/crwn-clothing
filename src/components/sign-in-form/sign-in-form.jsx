import { useState } from "react";

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
 } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input";
import Button from "../button/button";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [ FormFeilds, setFormFields ] = useState(defaultFormFields);
    const { email, password } = FormFeilds;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorrect Password')
                    break;
                case 'auth/user-not-found':
                    alert('No user found')
                    break;
            default: 
                console.log(error);
            }


           console.log(error);
        }
    }

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({ ...FormFeilds, [name]:value });
    };

    const signInWithGoogle = async() =>{
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with Email and Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label='Email'
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />

                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />

                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button 
                        type='button'
                        buttonType={'google'} 
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
                
            </form>
        </div>
    );
};
export default SignInForm; 