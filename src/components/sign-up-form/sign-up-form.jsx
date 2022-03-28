import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input";
import Button from "../button/button";
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword:''
}

const SignUpForm = () => {
    const [ FormFeilds, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = FormFeilds;

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({ ...FormFeilds, [name]:value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if ( password !== confirmPassword ){
            alert('Passwords did not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use')
            }else if(error.code === 'auth/weak-password'){
                alert('Password should be at least 6 characters long')
            }else{
                console.log('User creation error', error);
            }
        }
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with Email and Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label='Display Name'
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName}
                />

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

                <FormInput 
                    label='Confirm Password'
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword}
                /> 

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};
export default SignUpForm; 