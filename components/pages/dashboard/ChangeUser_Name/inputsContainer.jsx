// ChangeNameForm.js
import { useState } from 'react';
import classes from './inputsContainer.module.scss';
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {toast} from "react-toastify";

const ChangeNameForm = ({clientId}) => {
    const [firstName, setFirstName] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the new first name and last name
        const token = extractTokenFromCookie(document.cookie);

        if(!firstName){
            toast.error('Please Enter Valid Name');
            return;
        }

        try {
            // GET THE EMPLOYEES
            axios.put(`https://api.easydietkw.com/api/v1/add/client/name`, {
                clientNameEn: firstName,
                clientId: clientId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    // SET THE USERS IN REDUX
                    console.log(res);
                    setFirstName('')
                })
                .catch(err => console.log(err))
        }catch (e) {
            console.log(e)
        }
    };

    return (
        <form className={classes.change_name_form} onSubmit={handleSubmit}>
            <div className={classes.InputGroup}>
                <label htmlFor="first-name-input">Full Name: (ENGLISH)</label>
                <input type="text" id="first-name-input" value={firstName} onChange={handleFirstNameChange} />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default ChangeNameForm;
