import {useState} from "react";
import classes from '@/styles/pages/admin/create_employee.module.scss'
import Image from "next/image";
import {useRouter} from "next/router";
// IMPORT
import CustomSelectRoleType from "@/components/pages/dashboard/custom-select-userRole";
// HELPERS
import {toast} from "react-toastify";
import axios from "axios";
// REDUX
import {clearAll, onInputChange} from "@/redux/slices/createEmployee-slice";
import {useDispatch, useSelector} from "react-redux";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import {setAll} from "@/redux/slices/editEmployee-slice";

const CreateEmployee = () => {
    // ROUTER
    const router = useRouter()

    // STATES
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {fullName, username, role, password, address, phone} = useSelector(state => state.create_employee)

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
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        //Check the inputs
        if (!selectedImage || !fullName || !username || !role || !password || !address || !phone) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);
        // Create the Data as formData
        const createEmployee_formData = new FormData();
        createEmployee_formData.append("fullName", fullName);
        createEmployee_formData.append("username", username);
        createEmployee_formData.append("role", role);
        createEmployee_formData.append("password", password);
        createEmployee_formData.append("address", address);
        createEmployee_formData.append("phoneNumber", phone);
        createEmployee_formData.append("files", selectedImage);

        // Send Create Request to the server
        await axios.post(`https://api.easydietkw.com/api/v1/create/employee`, createEmployee_formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.success(res.data.message);
                // Clear the reducer
                dispatch(clearAll());
                // Clear the image;
                setSelectedImage('');
                setPreview('')
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
                    <h1>Create Employee</h1>
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
                                    type={'text'}
                                    name={'employee_name'}
                                    id={'employee_name'}
                                    placeholder={'EX: Ahmed Mohammed'}
                                    value={fullName}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'fullName',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'user_role'}>User Role</label>
                                <CustomSelectRoleType
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
                                    type={'text'}
                                    name={'employee_address'}
                                    id={'employee_address'}
                                    placeholder={'EX: 15 Marg Street'}
                                    value={address}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'address',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'employee_phone'}>Mobile</label>
                                <input
                                    type={'tel'}
                                    name={'employee_phone'}
                                    id={'employee_phone'}
                                    placeholder={'EX: 01020985828'}
                                    value={phone}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'phone',
                                            value: event.target.value,
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
                                Create
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default CreateEmployee

export const getServerSideProps = async (ctx) => {
    // GET THE TOKEN FROM THE REQUEST
    const {token} = ctx.req.cookies;

    return {
        props: {},
    };
};