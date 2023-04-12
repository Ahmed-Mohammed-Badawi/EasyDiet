import {useState} from "react";
import classes from '@/styles/pages/admin/edit_package.module.scss'
import Image from "next/image";
import {useRouter} from "next/router";
//IMPORTS
import CustomSelectTime from "@/components/pages/dashboard/custom-select-time";
import CustomSelectLanguage from "@/components/pages/dashboard/custom-select-language";
import Spinner from "@/components/layout/spinner/Spinner";
//REDUX
import {clearAll, onInputChange} from "@/redux/slices/editpackage-slice";
import {useDispatch, useSelector} from "react-redux";
//HELPERS
import {toast} from "react-toastify";
import axios from "axios";

const EditPackage = () => {
    // ROUTER
    const router = useRouter();

    // STATES
    const [loading, setLoading] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {
        name,
        timeOnCard,
        realTime,
        packagePrice,
        numberOfMeals,
        numberOfSnacks,
        offerDays,
        fridayIncluded,
        language,
        packageMeals,
    } = useSelector(state => state.edit_package)


    // SUBMIT HANDLER
    const submitHandler = async (e) => {
        // STOP RELOADING
        e.preventDefault();
        //Check the inputs
        if (!name || !timeOnCard || !realTime || !packagePrice || !numberOfMeals || !numberOfSnacks || !offerDays || !language || packageMeals.left <= 0) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);
        // Create the Data as formData
        const createMeal_formData = new FormData();
        createMeal_formData.append("mealTitle", name);
        createMeal_formData.append("mealTypes", category);
        createMeal_formData.append("protine", protein);
        createMeal_formData.append("carbohydrates", carbohydrate);
        createMeal_formData.append("fats", fat);
        createMeal_formData.append("calories", calories);
        createMeal_formData.append("numberOfSelection", repeatNumber);
        createMeal_formData.append("selectionPeriod", repeatPeriod);
        createMeal_formData.append("files", [selectedImage]);
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
                // Clear the reducer
                dispatch(clearAll());
                // Clear the image;
                setSelectedImage(null);
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
                    <h1>Edit Package</h1>
                    <p>You will edit the (Fit Package)</p>
                    <form onSubmit={submitHandler}>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'package_name'}>Package Name</label>
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
                            <div className={classes.InputGroup}>
                                <label htmlFor={'package_time_onCard'}>PACKAGE time on card</label>
                                <input
                                    type={'text'}
                                    name={'package_time_onCard'}
                                    id={'package_time_onCard'}
                                    placeholder={'EX: 2 Weeks'}
                                    value={timeOnCard}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'timeOnCard',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'package_real_time'}>Package time (Real)</label>
                                <CustomSelectTime
                                    defaultValue={realTime}
                                    changed={(values) => {
                                        // Set the State in Redux
                                        dispatch(onInputChange({
                                            key: 'realTime',
                                            value: values.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'package_price'}>Package Price (NUMBER)</label>
                                <input
                                    type={'number'} step={'.25'}
                                    name={'package_price'}
                                    min={'0'}
                                    id={'package_price'}
                                    placeholder={'EX: 15.5 KWD'}
                                    value={packagePrice}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'packagePrice',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'number_of_meals'}>Number of meals (NUMBER)</label>
                                <input
                                    type={'number'}
                                    name={'number_of_meals'}
                                    min={'0'}
                                    id={'number_of_meals'}
                                    placeholder={'EX: 5'}
                                    value={numberOfMeals}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'numberOfMeals',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'Snacks_meals'}>SNACKS Meals (NUMBER)</label>
                                <input
                                    type={'number'}
                                    name={'Snacks_meals'}
                                    min={'0'}
                                    id={'Snacks_meals'}
                                    placeholder={'EX: 2'}
                                    value={numberOfSnacks}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'numberOfSnacks',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
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
                            <div className={classes.InputGroup}>
                                <label htmlFor={'offers_days'}>Offers Days (NUMBER)</label>
                                <input
                                    type={'number'}
                                    name={'offers_days'}
                                    min={'0'}
                                    id={'offers_days'}
                                    placeholder={'EX: 2'}
                                    value={offerDays}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'offerDays',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <div className={classes.togglerInput}>
                                    <label htmlFor="package_friday_included">Include Fridays</label>
                                    <div className={classes.toggler}>
                                        <input
                                            type="checkbox"
                                            id="package_friday_included"
                                            name="package_friday_included"
                                            checked={fridayIncluded}
                                            onChange={(event) => {
                                                dispatch(onInputChange({
                                                    key: 'fridayIncluded',
                                                    value: event.target.checked
                                                }))
                                            }}
                                        />
                                        <div className={classes.slider}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.NavigationContainer}>
                            <button className={classes.SelectMeals} type={'button'} onClick={() => router.push(`/admin/packages/editpackage_meals`)}>
                                Select Meals
                            </button>
                            <button type={'submit'}>
                                <span>
                                    {loading ? <Spinner size={2} color={`#ffffff`}/> : 'Edit'}
                                </span>
                                <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}
export default EditPackage