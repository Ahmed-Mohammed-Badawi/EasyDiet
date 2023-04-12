import {useState} from "react";
import classes from '@/styles/pages/admin/edit_employee.module.scss'
import Image from "next/image";
// IMPORT
import CustomSelectMealType from "@/components/pages/dashboard/custom-select-userRole";
import {toast} from "react-toastify";
import axios from "axios";
import {clearAll, setAll} from "@/redux/slices/editEmployee-slice";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import wrapper from "@/redux/store";
import {setAll} from "@/redux/slices/editmeal-slice";

const EditEmployee = () => {
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Y1MTlhNzdiMDU0ZDM4OGM5ZGI5ZjkiLCJyb2xlIjoiYWRtaW4iLCJhY3RpdmUiOnRydWUsImlhdCI6MTY4MTI1NzYzOSwiZXhwIjoxNjgxMzQ0MDM5fQ.AVgvwqtT3u8B9w5tRTeAE0pAXK-GSdoKZOqsKU-uOtg`;
    // ROUTER
    const router = useRouter()

    // STATES
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {fullName, username, role, password, address, phone} = useSelector(state => state.edit_employee)

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
        //Check the inputs
        if (!selectedImage || !fullName || !username || !role || !password || !address || !phone) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);
        // Create the Data as formData
        const editEmployee_formData = new FormData();
        editEmployee_formData.append("userId", fullName);
        editEmployee_formData.append("fullName", fullName);
        editEmployee_formData.append("username", username);
        editEmployee_formData.append("role", role);
        editEmployee_formData.append("password", password);
        editEmployee_formData.append("address", address);
        editEmployee_formData.append("phoneNumber", phone);
        editEmployee_formData.append("files", selectedImage);

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
                                <input type={'text'} name={'employee_name'} id={'employee_name'}
                                       placeholder={'EX: Ahmed Mohammed'}/>
                            </div>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'user_role'}>User Role</label>
                                <CustomSelectMealType/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'employee_address'}>Employee Address</label>
                                <input type={'text'} name={'employee_address'} id={'employee_address'}
                                       placeholder={'EX: 15 Marg Street'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'employee_phone'}>Mobile</label>
                                <input type={'tel'} name={'employee_phone'} id={'employee_phone'}
                                       placeholder={'EX: 01020985828'}/>
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
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Y1MTlhNzdiMDU0ZDM4OGM5ZGI5ZjkiLCJyb2xlIjoiYWRtaW4iLCJhY3RpdmUiOnRydWUsImlhdCI6MTY4MTI1NzYzOSwiZXhwIjoxNjgxMzQ0MDM5fQ.AVgvwqtT3u8B9w5tRTeAE0pAXK-GSdoKZOqsKU-uOtg`;
    // GET THE ID OF THE MEAL FROM THE URL
    const {userId} = query;
    console.log(userId)
    // GET THE MEAL FROM THE SERVER
    await axios.get(`https://api.easydietkw.com/api/v1/get/user?userId=${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            // SET THE STATE
            const user = res.data
            console.log(res.data)
            store.dispatch(setAll({
                fullName: "",
                username: "",
                role: "",
                password: "",
                address: '',
                phone: '',
            }))
        })
        .catch(err => {
            // SET THE STATE
            console.log(err)
        })

    // Your code here
});