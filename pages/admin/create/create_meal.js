import {useState} from "react";
import classes from '@/styles/pages/admin/create_meal.module.scss'
import Image from "next/image";
// IMPORT
import CustomSelectMealType from "@/components/pages/dashboard/custom-select-mealType";
import CustomSelectLanguage from "@/components/pages/dashboard/custom-select-language";
import Spinner from "@/components/layout/spinner/Spinner";
// REDUX
import {useDispatch, useSelector} from "react-redux";
import {onInputChange, clearAll} from '@/redux/slices/Admin/createmeal-slice';
// HELPERS
import {toast} from "react-toastify";
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import {useRouter} from "next/router";

const CreatePackage = () => {
    //ROUTER
    const router = useRouter();

    // STATES
    const [selectedImage, setSelectedImage] = useState('');
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {
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
    } = useSelector(state => state.create_meal);

    // HELPERS
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
        if (!selectedImage || !name || !category || !carbohydrate || !protein || !calories || !fat || !repeatPeriod || !repeatNumber || !language) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);
        // Create the Data as formData
        const createMeal_formData = new FormData();
        createMeal_formData.append("mealTitle", name);
        for (let i = 0; i < category.length; i++) {
            createMeal_formData.append('mealTypes[]', category[i]);
        }
        createMeal_formData.append("protine", protein);
        createMeal_formData.append("carbohydrates", carbohydrate);
        createMeal_formData.append("fats", fat);
        createMeal_formData.append("calories", calories);
        createMeal_formData.append("numberOfSelection", repeatNumber);
        createMeal_formData.append("selectionPeriod", repeatPeriod);
        createMeal_formData.append("files", selectedImage);
        createMeal_formData.append("mealBlocked", blocked);
        createMeal_formData.append("lang", language);

        // Send Create Request to the server
        await axios.post(`https://api.easydietkw.com/api/v1/create/meal`, createMeal_formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.success(res.data.message);
                router.push(`/admin/meals`)
                    .then(() => {
                        // Clear the reducer
                        dispatch(clearAll());
                        // Clear the image;
                        setSelectedImage('');
                        setPreview('')
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
                    <h1>Create Meal</h1>
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
                                <label htmlFor={'meal_name'}>Meal Name</label>
                                <input
                                    type={'text'}
                                    name={'meal_name'}
                                    id={'meal_name'}
                                    placeholder={'EX: PIZZA'}
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
                                        const arrayOfCategories = [];
                                        // Get the Values from the Array of objects
                                        if (values) {
                                            values.forEach((cur) => {
                                                arrayOfCategories.push(cur.value)
                                            });
                                        }
                                        // Set the State in Redux
                                        dispatch(onInputChange({
                                            key: 'category',
                                            value: arrayOfCategories
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
                                    min={'0'}
                                    name={'meal_carbohydrate'}
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
                                    min={'0'}
                                    name={'meal_fat'}
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
                                    min={'0'}
                                    name={'meal_calories'}
                                    id={'meal_calories'}
                                    placeholder={'EX: 125'}
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
                                    min={'0'}
                                    name={'meal_protein'}
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
                                    min={'0'}
                                    name={'recurrence_period'}
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
                                    min={'0'}
                                    name={'number_of_repetitions'}
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
                                {loading ? <Spinner size={2} color={`#ffffff`}/> : 'Create'}
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


export const getServerSideProps = async (ctx) => {
    // GET THE TOKEN FROM THE REQUEST
    const {token} = ctx.req.cookies;

    let tokenInfo;
    if (token) {
        await axios.get(`https://api.easydietkw.com/api/v1/get/verify/token`, {
            params: {
                token: token,
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

    return {
        props: {},
    };
};