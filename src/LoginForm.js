import React, { Component, useState } from 'react';
import './LoginForm.css';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    if(errors.length > 0)
    valid = false;
    return valid;
}


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            errors: {
                email: '',
                password: '',
                strength: ''
            },
            entry: {
                email: '',
                password: ''
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
            case 'email': 
                errors.email = 
                validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                value.length < 8
                ? 'Password must contain atleast 8 characters '
                : '';
                // errors.strength = (8 <= value.length < 10) ? 'Password Strength: 3(Weak)' : 'Password Strength: 5(Not Weak)';
                // if((value.toUpperCase() !== value) && (value.toLowerCase() !== value) && (value.length > 8))
                // errors.strength = 'Password Strength: 7(Little Bit Strong)';
                // if((value.toUpperCase() !== value) && (value.toLowerCase() !== value) && (/\d/.test(value)) && (value.length > 8))
                // errors.strength = 'Password Strength: 8(Strong)';
                // if((value.toUpperCase() !== value) && (value.toLowerCase() !== value) && (/\d/.test(value)) && (/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value)) && (value.length > 8))
                // errors.strength = 'Password Strength: 10(Very Strong)';
                const hasNumber = value => {
                    return new RegExp(/[0-9]/).test(value);
                }
                
                const hasMixed = value => {
                    return new RegExp(/[a-z]/).test(value) && 
                            new RegExp(/[A-Z]/).test(value);
                }
                
                const hasSpecial = value => {
                    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
                }
                const strengthIndicator = value => {
                    let strengths = 0;
                
                    if (value.length > 0)
                        strengths++;
                
                    if (value.length > 7)
                        strengths++;
                
                    if (hasNumber(value))
                        strengths++;
                
                    if (hasSpecial(value))
                        strengths++;
                
                    if (hasMixed(value))
                        strengths++;
                
                    return strengths;
                }
                if(strengthIndicator(value) === 1)
                errors.strength = "1 (Weak)";
                else if(strengthIndicator(value) === 2)
                errors.strength = "2 (Not Weak)";
                else if(strengthIndicator(value) === 3)
                errors.strength = "3 (Little Strong)";
                else if(strengthIndicator(value) === 4)
                errors.strength = "4 (Strong)";
                else if(strengthIndicator(value) === 5)
                errors.strength = "5 (Very Strong)";
                else if(strengthIndicator(value) === 0)
                errors.strength = '';
                break;
                default:
                break;
        }

        this.setState({errors, [name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let entry = this.state.entry;
        if(validateForm(this.state.errors.password)) {
            entry.email = this.state.email;
            entry.password = this.state.password;
            console.log(this.state.entry.email);
        }else{
            entry.email = 'Not Valid';
        }
        this.setState({entry, [name]: value});
    }

    render(){
        const {errors, entry} = this.state;
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className='email'>
                            <label htmlFor="email">Email</label>
                            <input type='email' name='email' onChange={this.handleChange} noValidate />
                            <br />
                            {errors.email.length > 0 && 
                            <span className='error'>{errors.email}</span>}
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' onChange={this.handleChange} noValidate />
                            <br />
                            <span className="strength">{errors.strength}</span>
                            {errors.password.length > 0 && 
                            <span className='error'>{errors.password}</span>}
                        </div>
                        <div className='submit'>
                            <button type="submit">LOGIN</button>
                        </div>
                    </form>
                    <div className="data">
                        <span className="message">{entry.email} </span>
                    </div>
                    <br />
                    <div className="data">
                        <span className="message">{entry.password}</span>
                    </div>
                </div>
            </div>
      )
    }
}

export default LoginForm;