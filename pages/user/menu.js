import classes from '@/styles/pages/user/menu.module.scss'
import {useRouter} from "next/router";
// IMPORTS
import MealCard_User from "@/components/pages/dashboard/Meal_card/MealCard_User";
import Image from "next/image";
import {useEffect, useState} from "react";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/user/menu';
import i18n from "@/i18n";

const Packages = () => {
    // ROUTER
    const router = useRouter();

    // STATES
    const Language = i18n.language;


    //REDUX
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.menu_user);

    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {

        // LOGIC
        try {
            axios.get(`https://api.easydietkw.com/api/v1/client/meals?lang=${'EN'}&page=${1}`)
                .then(res => {
                    console.log(res)
                    dispatch(onInputChange({key: 'menu', value: res.data.data.meals}))
                })
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }

    }, [dispatch])

    return (
        <>
            <div className={classes.Main}>
                <h1>MENU</h1>
                <div className={classes.Bottom}>
                    {menu && menu.map((cur) => {
                        return (
                            <MealCard_User
                                key={cur._id}
                                ID={cur._id}
                                name={cur.mealTitle}
                                calories={cur.calories}
                                carbohydrate={cur.carbohydrates}
                                fats={cur.fats}
                                protein={cur.protine}
                                lang={cur.lang}
                                image={cur.imagePath}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Packages