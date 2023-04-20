// ChangeNameForm.js
import {useState} from 'react';
import classes from './inputsContainer.module.scss';
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {toast} from "react-toastify";
//REDUX
import {useDispatch, useSelector} from "react-redux";
import {setUsers} from '@/redux/slices/Admin/users-slice';

const ChangeNameForm = ({clientId, clicked}) => {
    const [firstName, setFirstName] = useState('');

    //REDUX
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.users)

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    // CHANGE NAME IN UI HANDLER
    function changeNameUI(){
        const usersCopy = [...users];

        const index = usersCopy.findIndex(item => item._id === clientId);

        if (index !== -1) {
            const objectCopy = {...usersCopy[index]}
            objectCopy.clientNameEn = firstName;
            usersCopy[index] = objectCopy
        }

        dispatch(setUsers({users: usersCopy, usersType: 'clients'}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the new first name and last name
        const token = extractTokenFromCookie(document.cookie);

        if (!firstName) {
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
                    setFirstName('');
                    // CHANGE THE NAME OF CLIENT IN THE UI
                    changeNameUI();
                    // HIDE THE OVERLAY AND MODEL
                    clicked();
                    // SHOW A NOTIFICATION
                    toast.success(`Client Name Changed Successfully`);
                })
                .catch(err => {
                    toast.error(err.response?.data?.message || err.message);
                })
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <form className={classes.change_name_form} onSubmit={handleSubmit}>
            <div className={classes.InputGroup}>
                <label htmlFor="first-name-input">Full Name: (ENGLISH)</label>
                <input type="text" id="first-name-input" value={firstName} onChange={handleFirstNameChange}/>
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default ChangeNameForm;
