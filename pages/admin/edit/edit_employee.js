import {useState} from "react";
import classes from '@/styles/pages/admin/edit_employee.module.scss'
import Image from "next/image";
// IMPORT
import CustomSelectMealType from "@/components/pages/dashboard/custom-select-userRole";

const CreateEmployee = () => {
    // STATES
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };


    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>Edit Employee</h1>
                    <form>
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
export default CreateEmployee