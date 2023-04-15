import {useEffect, useState} from "react";
import classes from '@/styles/pages/admin/edit_employee.module.scss'
import Image from "next/image";
// IMPORT
import {toast} from "react-toastify";
import axios from "axios";
import {setAll, onInputChange} from "@/redux/slices/editEmployee-slice";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import wrapper from "@/redux/store";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import CustomSelectUserRole from "@/components/pages/dashboard/custom-select-userRole";

const EditEmployee = ({ID, employee}) => {
    // ROUTER
    const router = useRouter()

    // STATES
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {fullName, username, role, password, address, phone} = useSelector(state => state.edit_employee);

    // SET THE EMPLOYEE DATA IF IT'S FOUND
    useEffect(() => {
        if(employee){
            dispatch(setAll({
                fullName: employee.fullName,
                username: employee.username,
                role: employee.role,
                password: "",
                address: employee.address,
                phone: employee.phoneNumber,
            }))
        }
    }, [dispatch, employee])

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Set the Image State
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // SUBMIT HANDLER
    const submitHandler = async (e) => {
        // STOP RELOADING
        e.preventDefault();
        // GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);
        //Check the inputs
        if (!fullName || !username || !role || !address || !phone) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);
        // Create the Data as formData
        const editEmployee_formData = new FormData();
        editEmployee_formData.append("userId", ID);
        editEmployee_formData.append("fullName", fullName);
        editEmployee_formData.append("username", username);
        editEmployee_formData.append("role", role);
        if (password) {
            editEmployee_formData.append("password", password);
        }
        editEmployee_formData.append("address", address);
        editEmployee_formData.append("phoneNumber", phone);
        if (selectedImage) {
            editEmployee_formData.append("files", selectedImage);
        }

        // Send Create Request to the server
        await axios.put(`https://api.easydietkw.com/api/v1/edit/user`, editEmployee_formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                router.push('/admin/users').then(() => {
                    toast.success(res.data.message);
                })
            })
            .catch(err => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.error(err?.response?.data?.message || err?.message);
            })
    }

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>Edit Employee</h1>
                    <form onSubmit={submitHandler}>
                        <div className={classes.Image_Uploader}>
                            <label htmlFor={'meal_image'}>
                                <div className={classes.Static}>
                                    <Image src={'/images/Upload_Icon.svg'} alt={'Upload Icon'} width={30} height={30}/>
                                    <span>Upload Image</span>
                                </div>
                                <div className={classes.ImagePreviewer}>
                                    {preview && <Image src={preview} alt="Preview" width={80} height={50}/>}
                                </div>
                            </label>
                            <input id={'meal_image'} onChange={handleImageChange} type={'file'} name={'Meal_Image'}
                                   accept="image/*"/>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'employee_name'}>Employee Name</label>
                                <input
                                    value={fullName}
                                    type={'text'}
                                    name={'employee_name'}
                                    id={'employee_name'}
                                    placeholder={'EX: Ahmed Mohammed'}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'fullName',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'user_role'}>User Role</label>
                                <CustomSelectUserRole
                                    defaultValue={role}
                                    changed={(values) => {
                                        // Set the State in Redux
                                        dispatch(onInputChange({
                                            key: 'role',
                                            value: values.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'employee_address'}>Employee Address</label>
                                <input
                                    value={address}
                                    type={'text'}
                                    name={'employee_address'}
                                    id={'employee_address'}
                                    placeholder={'EX: 15 Marg Street'}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'address',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'employee_phone'}>Mobile</label>
                                <input
                                    value={phone}
                                    type={'tel'}
                                    name={'employee_phone'}
                                    id={'employee_phone'}
                                    placeholder={'EX: 99994459'}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'phone',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'employee_username'}>Username</label>
                                <input
                                    type={'text'}
                                    name={'employee_username'}
                                    id={'employee_username'}
                                    placeholder={'EX: A7med'}
                                    value={username}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'username',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'employee_password'}>Password</label>
                                <input
                                    type={'password'}
                                    name={'employee_password'}
                                    id={'employee_password'}
                                    placeholder={'EX: *******'}
                                    value={password}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'password',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                Edit
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default EditEmployee


export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res, query}) => {
    // get the Auth
    const cookies = req.headers.cookie;
    const token = cookies.split('=');

    // Check the role
    let tokenInfo;
    if (token) {
        await axios.get(`https://api.easydietkw.com/api/v1/get/verify/token`, {
            params: {
                token: token[1],
            }
        })
            .then(res => tokenInfo = res.data.decodedToken)
            .catch(err => console.log(err))
    }

    if (!tokenInfo || tokenInfo.role !== 'admin' || tokenInfo.active === false) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }


    // GET THE ID OF THE MEAL FROM THE URL
    const {ID} = query;
    let employee;

    if (ID) {
        // GET THE MEAL FROM THE SERVER
        await axios.get(`https://api.easydietkw.com/api/v1/get/user?userId=${ID}`, {
            headers: {
                'Authorization': `Bearer ${token[1]}`
            }
        })
            .then(res => {
                // SET THE STATE
                employee = res.data.user
            })
            .catch(err => {
                // SET THE STATE
                console.log(err)
            })
    }

    // SET THE EMPLOYEE IF EXIST

    let propsObj = {ID};
    if (employee) {
        propsObj = {...propsObj, employee}
    }

    // Your code here
    return {
        props: propsObj
    }
});