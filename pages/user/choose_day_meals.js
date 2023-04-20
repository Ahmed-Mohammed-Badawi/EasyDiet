import classes from "@/styles/pages/user/choose_day_meals.module.scss";
import Image from "next/image";
import Overlay from "@/components/pages/dashboard/ChangeUser_Name/overlay";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/user/daymeals_slice';
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import MealCard_User from "@/components/pages/user/MealCard_Add";
import SelectedMeals from "@/components/pages/user/SelectedMeals";
import {extractTokenFromCookie} from "@/helpers/extractToken";

const Choose_Day_Meals = () => {

    //STATES
    const [overlay, setOverlay] = useState(false);

    //REDUX
    const dispatch = useDispatch();
    const {meals, day, selectedMeals} = useSelector(state => state.daymeals_user);


    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);
        // LOGIC
        try {
            axios.get(`https://api.easydietkw.com/api/v1/menu/meals`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    dispatch(onInputChange({key: 'meals', value: res.data.menu}))
                })
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }

    }, [dispatch])

    // HIDE OVERLAY
    const hideOverlay = () => {
        setOverlay(false)
    }

    //RESET MEALS HANDLER
    const resetMealsHandler = () => {
        dispatch(onInputChange({key: 'selectedMeals', value: []}))
    }

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.Container}>
                    <div className={classes.Top}>
                        <div className={classes.Top_Container}>
                            <div className={classes.Navigation}>
                                <ul>
                                    <li>
                                        <span>BREAKFAST</span>
                                        <span className={classes.Check_Icon}>
                                            <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                                   height={18}/>
                                        </span>
                                    </li>
                                    <li>
                                        <span>LUNCH</span>
                                        <span className={classes.Check_Icon}>
                                            <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                                   height={18}/>
                                        </span>
                                    </li>
                                    <li>
                                        <span>DINNER</span>
                                        <span className={classes.Check_Icon}>
                                            <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                                   height={18}/>
                                        </span>
                                    </li>
                                    <li>
                                        <span>SNACKS</span>
                                        <span className={classes.Check_Icon}>
                                            <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                                   height={18}/>
                                        </span>
                                    </li>
                                </ul>
                                <span title={'All Meals'}>
                                    ALL
                                            <Image src={'/images/Global/Check_Icon.svg'} alt={'check icon'} width={18}
                                                   height={18}/>
                                </span>
                            </div>
                            <div className={classes.Buttons}>
                                <button title={'Selected Meals'} onClick={() => console.log('GO BACK')}>
                                    <Image style={{transform: 'rotate(180deg)'}} src={'/images/Auth/next-icon.svg'}
                                           alt={'Selected Meals'}
                                           width={20} height={20}/>
                                </button>
                                <button title={'Selected Meals'} onClick={() => setOverlay(true)}>
                                    <Image src={'/images/Global/SelectedMeals_Icon.svg'} alt={'Selected Meals'}
                                           width={20} height={20}/>
                                </button>
                                <button title={'Reset All Meals'} onClick={resetMealsHandler}>
                                    <Image src={'/images/Global/ResetMeals_Icon.svg'} alt={'Selected Meals'} width={20}
                                           height={20}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <div className={classes.Cards}>
                            {meals && meals.map((cur) => {
                                return (
                                    <MealCard_User
                                        key={cur.mealId._id}
                                        ID={cur.mealId._id}
                                        image={cur.mealId.imagePath}
                                        carbohydrate={cur.mealId.carbohydrates}
                                        protein={cur.mealId.protine}
                                        fats={cur.mealId.fats}
                                        calories={cur.mealId.calories}
                                        name={cur.mealId.mealTitle}
                                        lang={cur.mealId.lang}
                                    />
                                )
                            })}
                        </div>
                        <button
                            className={[classes.Create_button].join(' ')}
                            type={'submit'}>
                            <span style={{marginLeft: '-5rem'}}>CONFIRM</span>
                            <span className={classes.Next_Span}><Image src={'/images/Auth/next-icon.svg'}
                                                                       alt={'Create User'} width={20}
                                                                       height={20}/></span>
                        </button>
                        <button
                            className={[classes.Back_button].join(' ')}
                            type={'button'}>
                            <span className={classes.Next_Span}><Image src={'/images/Auth/next-icon.svg'}
                                                                       alt={'GO BACK'} width={20}
                                                                       height={20}/></span>
                        </button>
                    </div>
                </div>
            </main>
            <Overlay active={overlay} clicked={hideOverlay}>
                <SelectedMeals isActive={overlay} selectedMeals={selectedMeals} closeTheOverlay={hideOverlay}/>
            </Overlay>
        </>

    )
}

export default Choose_Day_Meals;