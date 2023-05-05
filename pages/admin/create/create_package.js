import {useState} from "react";
import classes from '@/styles/pages/admin/create_package.module.scss'
import Image from "next/image";
//IMPORTS
import CustomSelectTime from "@/components/pages/dashboard/custom-select-time";
import CustomSelectLanguage from "@/components/pages/dashboard/custom-select-language";
import Spinner from "@/components/layout/spinner/Spinner";
import {toast} from "react-toastify";
import axios from "axios";
import {useRouter} from "next/router";
// REDUX
import {onInputChange, clearAll} from "@/redux/slices/Admin/createpackage-slice";
import {useDispatch, useSelector} from "react-redux";
//HELPERS
import {extractTokenFromCookie} from "@/helpers/extractToken";
// LANGUAGE
import {useTranslation} from "react-i18next";

const CreatePackage = () => {
    // ROUTER
    const router = useRouter();

    // LANGUAGE
    const {t} = useTranslation('createPackage');

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
        breakfast,
        lunch,
        dinner
    } = useSelector(state => state.create_package)


    // SUBMIT HANDLER
    const submitHandler = async (e) => {
        // STOP RELOADING
        e.preventDefault();
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);

        //Check the inputs
        if (!name || !timeOnCard || !realTime || !packagePrice || !numberOfMeals || !numberOfSnacks || !language || packageMeals.length <= 0) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);

        const createMeal_Obj = {
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
        await axios.post(`https://api.easydietkw.com/api/v1/create/bundle`, createMeal_Obj, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.success(res.data.message || `Package Created Successfully`);
                router.push(`/admin/packages`)
                    .then(() => {
                        // Clear the reducer
                        dispatch(clearAll());
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
                    <h1>{t("title")}</h1>
                    <form onSubmit={submitHandler}>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'package_name'}>{t("name")}</label>
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
                                <label htmlFor={'package_time_onCard'}>{t("timeCard")}</label>
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
                                <label htmlFor={'package_real_time'}>{t("timeReal")}</label>
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
                                <label htmlFor={'package_price'}>{t("price")}</label>
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
                                <label htmlFor={'number_of_meals'}>{t("numberOfMeals")}</label>
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
                                <label htmlFor={'Snacks_meals'}>{t("numberOfSnacks")}</label>
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
                                <label htmlFor={'package_real_time'}>{t("language")}</label>
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
                                <label htmlFor={'offers_days'}>{t("offer")}</label>
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
                                    <label htmlFor="package_friday_included">{t("fridays")}</label>
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
                                        {t("breakfast")}
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
                                        {t("lunch")}
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
                                        {t("dinner")}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={classes.NavigationContainer}>
                            <button className={classes.SelectMeals} type={'button'}
                                    onClick={() => router.push(`/admin/packages/package_meals`)}>
                                {t("select")}
                            </button>
                            <button type={'submit'}>
                                <span>
                                    {loading ? <Spinner size={2} color={`#ffffff`}/> : t("create")}
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
export default CreatePackage;

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