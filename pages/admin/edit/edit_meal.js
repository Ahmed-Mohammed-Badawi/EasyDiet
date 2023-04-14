import {useState} from "react";
import classes from '@/styles/pages/admin/edit_meal.module.scss'
import Image from "next/image";
import {useRouter} from "next/router";
// IMPORT
import CustomSelectMealType from "@/components/pages/dashboard/custom-select-mealTypeEdit";
import CustomSelectLanguage from "@/components/pages/dashboard/custom-select-language";
import Spinner from "@/components/layout/spinner/Spinner";
// REDUX
import wrapper from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange, clearAll, setAll} from '@/redux/slices/editmeal-slice';
// HELPERS
import {toast} from "react-toastify";
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";

const EditMeal = () => {
    // ROUTER
    const router = useRouter();
    //GET THE QUERIES
    const {mealName} = router.query;
    // STATES
    const [preview, setPreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {
        mealId,
        name,
        category,
        carbohydrate,
        protein,
        calories,
        fat,
        repeatPeriod,
        repeatNumber,
        blocked,
        language
    } = useSelector(state => state.edit_meal);

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
        if (!name || !category || !carbohydrate || !protein || !calories || !fat || !repeatPeriod || !repeatNumber || !language) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);
        // Create the Data as formData
        const editMeal_formData = new FormData();
        editMeal_formData.append("mealId", mealId);
        editMeal_formData.append("mealTitle", name);
        editMeal_formData.append("mealType", category);
        editMeal_formData.append("protine", protein);
        editMeal_formData.append("carbohydrates", carbohydrate);
        editMeal_formData.append("fats", fat);
        editMeal_formData.append("calories", calories);
        editMeal_formData.append("numberOfSelection", repeatNumber);
        editMeal_formData.append("selectionPeriod", repeatPeriod);
        if (selectedImage) {
            editMeal_formData.append("files", selectedImage);
        }
        editMeal_formData.append("mealBlocked", blocked);
        editMeal_formData.append("lang", language);

        // Send Create Request to the server
        await axios.put(`https://api.easydietkw.com/api/v1/edit/meal`, editMeal_formData, {
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
                setSelectedImage(null);
                setPreview('');
                // REDIRECT TO MEALS PAGE
                // router.push(`/admin/meals`)
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
                    <h1>Edit Meal</h1>
                    <p>You will edit the ({mealName}) Meal</p>
                    <form onSubmit={submitHandler}>
                        <div className={classes.Image_Uploader}>
                            <label htmlFor={'meal_image'}>
                                <div className={classes.Static}>
                                    <Image src={'/images/Upload_Icon.svg'} alt={'Upload Icon'} width={30} height={30}/>
                                    <span>Update Image</span>
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
                                <label htmlFor={'package_name'}>Meal Name</label>
                                <input
                                    type={'text'}
                                    name={'package_name'}
                                    id={'package_name'}
                                    placeholder={'EX: FIT PACKAGE'}
                                    value={name}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'name',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'meal_category'}>Meal Category</label>
                                <CustomSelectMealType
                                    defaultValue={category}
                                    changed={(values) => {
                                        // Set the State in Redux
                                        dispatch(onInputChange({
                                            key: 'category',
                                            value: values.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'meal_carbohydrate'}>carbohydrate (Grams)</label>
                                <input
                                    type={'number'}
                                    name={'meal_carbohydrate'}
                                    min={'0'}
                                    id={'meal_carbohydrate'}
                                    placeholder={'EX: 15'}
                                    value={carbohydrate}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'carbohydrate',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'meal_fat'}>FAT (Grams)</label>
                                <input
                                    type={'number'}
                                    name={'meal_fat'}
                                    min={'0'}
                                    id={'meal_fat'}
                                    placeholder={'EX: 15'}
                                    value={fat}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'fat',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'meal_calories'}>Calories (Number)</label>
                                <input
                                    type={'number'}
                                    name={'meal_calories'}
                                    min={'0'}
                                    id={'meal_calories'}
                                    placeholder={'EX: 15'}
                                    value={calories}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'calories',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'meal_protein'}>protein (Grams)</label>
                                <input
                                    type={'number'}
                                    name={'meal_protein'}
                                    min={'0'}
                                    id={'meal_protein'}
                                    placeholder={'EX: 15'}
                                    value={protein}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'protein',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'recurrence_period'}>recurrence period (number)</label>
                                <input
                                    type={'number'}
                                    name={'recurrence_period'}
                                    min={'0'}
                                    id={'recurrence_period'}
                                    placeholder={'EX: 7'}
                                    value={repeatPeriod}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'repeatPeriod',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'number_of_repetitions'}>number of repetitions (number)</label>
                                <input
                                    type={'number'}
                                    name={'number_of_repetitions'}
                                    min={'0'}
                                    id={'number_of_repetitions'}
                                    placeholder={'EX: 3'}
                                    value={repeatNumber}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'repeatNumber',
                                            value: event.target.value
                                        }))
                                    }}
                                />
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
                                            checked={blocked}
                                            onChange={(event) => {
                                                // Dispatch
                                                dispatch(onInputChange({
                                                    key: 'blocked',
                                                    value: event.target.checked
                                                }))
                                            }}
                                        />
                                        <div className={classes.slider}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'package_real_time'}>Package Language</label>
                                <CustomSelectLanguage
                                    defaultValue={language}
                                    changed={(values) => {
                                        // Set the State in Redux
                                        dispatch(onInputChange({
                                            key: 'language',
                                            value: values.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                {loading ? <Spinner size={2} color={`#ffffff`}/> : 'Edit'}
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default EditMeal;

export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res, query}) => {
    // get the Auth
    const cookies = req.headers.cookie;
    const token = cookies.split('=');

    //CHECK THE ROLE
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
    const {mealId, lang} = query;

    if (mealId, lang) {
        // GET THE MEAL FROM THE SERVER
        await axios.get(`https://api.easydietkw.com/api/v1/get/meal?mealId=${mealId}&lang=${lang}`, {
            headers: {
                'Authorization': `Bearer ${token[1]}`
            }
        })
            .then(res => {
                // SET THE STATE
                const meal = res.data.meal
                console.log(res.data.meal)
                store.dispatch(setAll({
                    mealId: meal._id,
                    name: meal.mealTitle,
                    category: [meal.mealType],
                    carbohydrate: meal.carbohydrates,
                    protein: meal.protine,
                    calories: meal.calories,
                    fat: meal.fats,
                    repeatPeriod: meal.selectionRule.period,
                    repeatNumber: meal.selectionRule.redundancy,
                    blocked: meal.mealBlocked,
                    language: meal.lang
                }))
            })
            .catch(err => {
                // SET THE STATE
                console.log(err)
            })
    }

    // Your code here
});