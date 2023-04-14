import {useEffect, useState} from "react";
import classes from '@/styles/pages/admin/edit_package.module.scss'
import Image from "next/image";
import {useRouter} from "next/router";
//IMPORTS
import CustomSelectTime from "@/components/pages/dashboard/custom-select-time";
import CustomSelectLanguage from "@/components/pages/dashboard/custom-select-language";
import Spinner from "@/components/layout/spinner/Spinner";
//REDUX
import wrapper from "@/redux/store";
import {clearAll, onInputChange, setAll} from "@/redux/slices/editpackage-slice";
import {useDispatch, useSelector} from "react-redux";
//HELPERS
import {toast} from "react-toastify";
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";

const EditPackage = ({bundle}) => {
    // ROUTER
    const router = useRouter();

    // STATES
    const [loading, setLoading] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {
        bundleId,
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
        breakfast,
        lunch,
        dinner
    } = useSelector(state => state.edit_package)

    // SET THE DEFAULT STATE
    // SET THE STATE
    let ArrayOfMealsIds;

    if (bundle?.menu) {
        ArrayOfMealsIds = bundle.menu.map(obj => {
            return obj.mealId
        })
    }
    useEffect(() => {
        if (bundle) {
            dispatch(setAll({
                bundleId: bundle._id,
                name: bundle.bundleName,
                timeOnCard: bundle.timeOnCard,
                realTime: bundle.bundlePeriod,
                packagePrice: bundle.bundlePrice,
                numberOfMeals: bundle.mealsNumber,
                numberOfSnacks: bundle.snacksNumber,
                offerDays: bundle.bundleOffer,
                fridayIncluded: bundle.fridayOption,
                language: bundle.lang,
                packageMeals: ArrayOfMealsIds,
                breakfast: bundle.mealsType.includes('افطار'),
                lunch: bundle.mealsType.includes('غداء'),
                dinner: bundle.mealsType.includes('عشاء'),
            }))
        }
    }, [])

    // SUBMIT HANDLER
    const submitHandler = async (e) => {
        // STOP RELOADING
        e.preventDefault();
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);

        //Check the inputs
        if (!name || !timeOnCard || !realTime || !packagePrice || !numberOfMeals || !numberOfSnacks || !offerDays || !language || packageMeals.length <= 0) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);

        const editMeal_Obj = {
            bundleId: bundleId,
            bundleName: name,
            mealsNumber: numberOfMeals,
            breakfast: breakfast ? 'on' : 'off',
            lunch: lunch ? 'on' : 'off',
            dinner: dinner ? 'on' : 'off',
            snacksNumber: numberOfSnacks,
            bundlePeriod: realTime,
            bundleOffer: offerDays,
            fridayOption: fridayIncluded,
            bundlePrice: packagePrice,
            mealsIds: packageMeals,
            lang: language,
            timeOnCard: timeOnCard
        }

        // Send Create Request to the server
        await axios.put(`https://api.easydietkw.com/api/v1/edit/bundle`, editMeal_Obj, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.success(res.data.message || `Package Updated Successfully`);
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
                    <p>You will edit the ({name})</p>
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
                            <div className={classes.InputGroup}>
                                <div className={classes.checkboxRow}>
                                    <label className={classes.checkbox}>
                                        <input type="checkbox" checked={breakfast}
                                               onChange={(event) => {
                                                   dispatch(onInputChange({
                                                       key: 'breakfast',
                                                       value: event.target.checked
                                                   }))
                                               }}
                                        />
                                        <span className={classes.checkmark}></span>
                                        Breakfast
                                    </label>
                                    <label className={classes.checkbox}>
                                        <input type="checkbox" checked={lunch}
                                               onChange={(event) => {
                                                   dispatch(onInputChange({
                                                       key: 'lunch',
                                                       value: event.target.checked
                                                   }))
                                               }}
                                        />
                                        <span className={classes.checkmark}></span>
                                        Lunch
                                    </label>
                                    <label className={classes.checkbox}>
                                        <input type="checkbox" checked={dinner}
                                               onChange={(event) => {
                                                   dispatch(onInputChange({
                                                       key: 'dinner',
                                                       value: event.target.checked
                                                   }))
                                               }}
                                        />
                                        <span className={classes.checkmark}></span>
                                        Dinner
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className={classes.NavigationContainer}>
                            <button className={classes.SelectMeals} type={'button'}
                                    onClick={() => router.push(`/admin/packages/editpackage_meals`)}>
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

export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res, query}) => {
    // get the Auth
    const cookies = req.headers.cookie;
    const token = cookies.split('=');

    //CHECK THE ROLE
    let tokenInfo;
    console.log(tokenInfo, token)
    if(token) {
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
    const {ID, lang} = query;
    let bundle;

    if (ID && lang) {
        // GET THE MEAL FROM THE SERVER
        await axios.get(`https://api.easydietkw.com/api/v1/get/bundle?bundleId=${ID}&lang=${lang}`, {
            headers: {
                'Authorization': `Bearer ${token[1]}`
            }
        })
            .then(res => {
                bundle = res.data.bundle
            })
            .catch(err => {
                // SET THE STATE
                console.log(err)
            })
    }

    // Your code here
    let propsObj = {};
    if (bundle) {
        propsObj = {bundle}
    }

    return {
        props: propsObj
    }

});