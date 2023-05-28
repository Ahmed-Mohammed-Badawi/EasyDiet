import {useEffect, useState} from "react";
import classes from "@/styles/pages/user/choose_day_meals.module.scss";
import Head from "next/head";
import Image from "next/image";
import {useRouter} from "next/router";
// COMPONENTS
import Overlay from "@/components/pages/dashboard/ChangeUser_Name/overlay";
import MealCard_User from "@/components/pages/user/MealCard_Add";
import SelectedMeals from "@/components/pages/user/SelectedMeals";
// REDUX
import {useDispatch, useSelector} from "react-redux";
import {onInputChange, resetSelectedMeals} from '@/redux/slices/user/daymeals_slice';
// HELPERS
import axios from "axios";
import {toast} from "react-toastify";
import {extractTokenFromCookie} from "@/helpers/extractToken";
// LANGUAGE
import {useTranslation} from "react-i18next";

const Choose_Day_Meals = () => {
    //ROUTER
    const router = useRouter();

    // LANGUAGE
    const {t} = useTranslation('chooseDayMeals');

    //STATES
    const [overlay, setOverlay] = useState(false);
    const [mealType, setMealType] = useState('الكل');
    const [availableMeals, setAvailableMeals] = useState('');
    const [availableSnacks, setAvailableSnacks] = useState('');
    const [dateIdFromURL, setDateIdFromURL] = useState('');

    //REDUX
    const dispatch = useDispatch();
    const {meals, date, dateId, selectedMeals} = useSelector(state => state.daymeals_user);

    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);

        // GET THE DATE ID FROM THE URL
        const {dateId: dateIdQuery} = router.query;
        setDateIdFromURL(dateIdQuery);

        if (dateIdQuery || dateId) {
            // LOGIC
            try {
                axios.get(`https://api.easydietkw.com/api/v1/filter/menu/meals`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        mealType: mealType,
                        dateId: dateId || dateIdQuery
                    }
                })
                    .then(res => {
                        dispatch(onInputChange({key: 'meals', value: res.data.filter}));
                        setAvailableMeals(res.data.numberOfMeals);
                        setAvailableSnacks(res.data.numberOfSnacks)
                    })
                    .catch(err => {
                        toast.error(err.response?.data?.message || err.message)
                    })
            } catch (err) {
                toast.error(err.response?.data?.message || err.message)
            }
        }

    }, [dispatch, mealType, dateId, router])

    // HIDE OVERLAY
    const hideOverlay = () => {
        setOverlay(false)
    }

    //RESET MEALS HANDLER
    const resetMealsHandler = () => {
        dispatch(onInputChange({key: 'selectedMeals', value: []}))
    }

    //SUBMIT HANDLER
    const submitHandler = (event) => {
        //STOP RELOADING
        event.preventDefault();

        if(!dateId && !dateIdFromURL) {
            return toast.error('Date Id is not defined')
        }

        const ArrayOfMeals = selectedMeals.map(item => {
            return item.id
        })

        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);
        // LOGIC
        let requestBody = {
            dateId: dateId || dateIdFromURL,
            meals: ArrayOfMeals,
        }

        if (availableMeals === 0 && availableSnacks === 0) {
            requestBody = {
                ...requestBody,
                flag: 'edit'
            }
        }

        try {
            if (availableMeals === 0 && availableSnacks === 0 && window.confirm('Please Note that by choosing new meals the previous day meals will by Deleted.')) {
                axios.post(`https://api.easydietkw.com/api/v1/client/select/meal`, requestBody, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(_ => {
                        router.push('/user/my_subscription').then(() => {
                            toast.success('The Meals of the Day Updated Successfully')
                            //Clear the Reducer
                            dispatch(resetSelectedMeals());
                        })
                    })
                    .catch(err => {
                        toast.error(err.response?.data?.message || err.message)
                    })
            } else {
                axios.post(`https://api.easydietkw.com/api/v1/client/select/meal`, requestBody, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(_ => {
                        router.push('/user/my_subscription').then(() => {
                            toast.success('The Meals of the Day Updated Successfully')
                            //Clear the Reducer
                            dispatch(resetSelectedMeals());
                        })
                    })
                    .catch(err => {
                        toast.error(err.response?.data?.message || err.message)
                    })
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }
    }

    return (
        <>
            {/*SEO OPTIMIZATION*/}
            <Head>
                <title>EasyDiet | Choose Day Meals</title>
                <meta name="description"
                      content="Discover EasyDiet's healthy meal options that have been satisfying customers for over five years. Our experienced chefs prepare each meal with fresh, locally-sourced ingredients to ensure that you get the best quality and flavor. Choose EasyDiet for convenient and delicious meals that leave you feeling energized and healthy."/>
                <meta name="keywords"
                      content="healthy meals, meal delivery, fresh ingredients, locally-sourced, convenient meal options, energy-boosting, nutritious food, easy ordering, delicious and healthy, meal plans"/>
                <meta name="author" content="EasyDiet"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="robots" content="index, follow"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="language" content="English"/>
                <meta name="revisit-after" content="2 days"/>
                <meta name="generator" content="EasyDiet"/>
                <meta name="og:title" content="EasyDiet"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://easydietkw.com/"/>
                <meta property="og:image" content="/images/Auth/logo.svg"/>
                <meta property="og:site_name" content="EasyDiet"/>
                <meta property="og:description"
                      content="EasyDiet has been offering healthy meal options for over 5 years. With a diverse menu of delicious and locally-sourced ingredients, their experienced chefs provide convenient and energizing meals. Experience a healthier lifestyle with EasyDiet."/>
            </Head>
            <main className={classes.Main}>
                <div className={classes.Container}>
                    <div className={classes.Top}>
                        <div className={classes.Top_Container}>
                            <div className={classes.Navigation} data-word={t("filter")}>
                                <ul>
                                    <li className={mealType === 'افطار' ? classes.Active : ''} onClick={() => setMealType('افطار')}>
                                        <span onClick={() => setMealType('افطار')}>{t("breakfast")}</span>
                                        {mealType === 'افطار' && <span className={classes.Check_Icon}>
                                            <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                                   height={18}/>
                                        </span>}
                                    </li>
                                    <li className={mealType === 'غداء' ? classes.Active : ''} onClick={() => setMealType('غداء')}>
                                        <span onClick={() => setMealType('غداء')}>{t("lunch")}</span>
                                        {mealType === 'غداء' && <span className={classes.Check_Icon}>
                                            <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                                   height={18}/>
                                        </span>}
                                    </li>
                                    <li className={mealType === 'عشاء' ? classes.Active : ''} onClick={() => setMealType('عشاء')}>
                                        <span onClick={() => setMealType('عشاء')}>{t("dinner")}</span>
                                        {mealType === 'عشاء' && <span className={classes.Check_Icon}>
                                            <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                                   height={18}/>
                                        </span>}
                                    </li>
                                    <li className={mealType === 'سناك' ? classes.Active : ''} onClick={() => setMealType('سناك')}>
                                        <span onClick={() => setMealType('سناك')}>{t("snacks")}</span>
                                        {mealType === 'سناك' && <span className={classes.Check_Icon}>
                                            <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                                   height={18}/>
                                        </span>}
                                    </li>
                                </ul>
                                <span title={'All Meals'} onClick={() => setMealType('الكل')} className={mealType === 'الكل' ? classes.Active : ''}>
                                    {t("all")}
                                    {mealType === 'الكل' &&
                                        <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                               height={18}/>}
                                </span>
                            </div>
                            <div className={classes.Buttons}>
                                <button title={'Selected Meals'} onClick={() => {
                                    resetMealsHandler()
                                    router.push('/user/my_subscription');
                                }}>
                                    <Image style={{transform: 'rotate(180deg)'}} src={'/images/Auth/next-icon.svg'}
                                           alt={'Selected Meals'}
                                           width={20} height={20}/>
                                    <span>{t("back")}</span>
                                </button>
                                <button title={'Selected Meals'} onClick={() => setOverlay(true)}>
                                    <Image src={'/images/Global/SelectedMeals_Icon.svg'} alt={'Selected Meals'}
                                           width={20} height={20}/>
                                    <span>{t("selected")}</span>
                                </button>
                                <button title={'Reset All Meals'} onClick={resetMealsHandler}>
                                    <Image src={'/images/Global/ResetMeals_Icon.svg'} alt={'Selected Meals'} width={20}
                                           height={20}/>
                                    <span>{t("reset")}</span>
                                </button>
                            </div>
                            <div className={classes.AvailableMeals}
                                 data-day={new Date(date).toLocaleDateString('en-US', {
                                     day: 'numeric',
                                     month: 'long',
                                     year: 'numeric'
                                 })}>
                                <p>{t("availableMeals")} <span>{availableMeals}</span></p>
                                <p>{t("availableSnacks")} <span>{availableSnacks}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <div className={classes.Cards}>
                            {meals && meals.map((cur) => {
                                if (cur?.mealId?._id && cur?.mealId?.lang && cur?.mealId?.mealTitle && cur?.mealId?.imagePath && cur?.mealId?.calories && cur?.mealId?.carbohydrates && cur?.mealId?.protine && cur?.mealId?.fats)
                                    return (
                                        <MealCard_User
                                            key={cur?.mealId?._id}
                                            ID={cur?.mealId?._id}
                                            image={cur?.mealId?.imagePath}
                                            carbohydrate={cur?.mealId?.carbohydrates}
                                            protein={cur?.mealId?.protine}
                                            fats={cur?.mealId?.fats}
                                            calories={cur?.mealId?.calories}
                                            name={cur?.mealId?.mealTitle}
                                            lang={cur?.mealId?.lang}
                                            availableMeals={availableMeals}
                                            availableSnacks={availableSnacks}
                                        />
                                    )
                            })}
                        </div>
                        <button
                            className={[classes.Create_button].join(' ')}
                            type={'submit'}
                            onClick={submitHandler}
                        >
                            <span style={{marginLeft: '-5rem'}}>{t("button")}</span>
                            <span className={classes.Next_Span}><Image src={'/images/Auth/next-icon.svg'}
                                                                       alt={'Choose Day Meals'} width={20}
                                                                       height={20}/></span>
                        </button>
                        <button
                            className={[classes.Back_button].join(' ')}
                            type={'button'} onClick={() => {
                            resetMealsHandler()
                            router.push('/user/my_subscription');
                        }}>
                            <span className={classes.Next_Span}><Image src={'/images/Auth/next-icon.svg'}
                                                                       alt={'GO BACK'} width={20}
                                                                       height={20}/></span>
                        </button>
                    </div>
                </div>
            </main>
            <Overlay active={overlay} clicked={hideOverlay}>
                <SelectedMeals text1={t("selectedMeals")} text2={t("noMeals")} isActive={overlay}
                               selectedMeals={selectedMeals} closeTheOverlay={hideOverlay}/>
            </Overlay>
        </>

    )
}

export default Choose_Day_Meals;