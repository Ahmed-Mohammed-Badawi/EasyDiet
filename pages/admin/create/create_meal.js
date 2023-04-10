import {useState} from "react";
import classes from '@/styles/pages/admin/create_meal.module.scss'
import Image from "next/image";
// IMPORT
import CustomSelectMealType from "@/components/pages/dashboard/custom-select-mealType";
import CustomSelectLanguage from "@/components/pages/dashboard/custom-select-language";

const CreatePackage = () => {
    // STATES
    const [preview, setPreview] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

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

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };




    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>Create Meal</h1>
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
                                <label htmlFor={'meal_name'}>Meal Name</label>
                                <input type={'text'} name={'meal_name'} id={'meal_name'}
                                       placeholder={'EX: PIZZA'}/>
                            </div>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'meal_category'}>Meal Category</label>
                                <CustomSelectMealType/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'meal_carbohydrate'}>carbohydrate (Grams)</label>
                                <input type={'number'} name={'meal_carbohydrate'} id={'meal_carbohydrate'}
                                       placeholder={'EX: 15'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'meal_fat'}>FAT (Grams)</label>
                                <input type={'number'} name={'meal_fat'} id={'meal_fat'}
                                       placeholder={'EX: 15'}/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'meal_calories'}>Calories (Number)</label>
                                <input type={'number'} name={'meal_calories'} id={'meal_calories'}
                                       placeholder={'EX: 125'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'meal_protein'}>protein (Grams)</label>
                                <input type={'number'} name={'meal_protein'} id={'meal_protein'}
                                       placeholder={'EX: 15'}/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'recurrence_period'}>recurrence period (number)</label>
                                <input type={'number'} name={'recurrence_period'} id={'recurrence_period'}
                                       placeholder={'EX: 7'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'number_of_repetitions'}>number of repetitions (number)</label>
                                <input type={'number'} name={'number_of_repetitions'} id={'number_of_repetitions'}
                                       placeholder={'EX: 3'}/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <div className={classes.togglerInput}>
                                    <label htmlFor="package_friday_included">Block Meal</label>
                                    <div className={classes.toggler}>
                                        <input
                                            type="checkbox"
                                            id="package_friday_included"
                                            name="package_friday_included"
                                            checked={isChecked}
                                            onChange={handleToggle}
                                        />
                                        <div className={classes.slider}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'package_real_time'}>Package Language</label>
                                <CustomSelectLanguage/>
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
export default CreatePackage