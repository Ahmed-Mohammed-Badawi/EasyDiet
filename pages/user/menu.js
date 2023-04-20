import classes from '@/styles/pages/user/menu.module.scss'
import {useRouter} from "next/router";
// IMPORTS
import MealCard_User from "@/components/pages/dashboard/Meal_card/MealCard_User";
import Image from "next/image";
import {useEffect} from "react";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/user/menu';

const Packages = () => {
    // ROUTER
    const router = useRouter();

    //REDUX
    const dispatch = useDispatch();
    const {menu} = useSelector(state => state.menu_user);

    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        // LOGIC
        try {
            axios.get(`https://api.easydietkw.com/api/v1/client/bundles`)
                .then(res => {
                    console.log(res)
                    dispatch(onInputChange({key: 'menu', value: res.data.bundles}))
                })
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }

    }, [dispatch])

    return (
        <>
            <div className={classes.Main}>
                <div className={classes.Bottom}>
                    {menu && menu.map((cur) => {
                        return (
                            <MealCard_User />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Packages