import classes from '@/styles/pages/user/packages.module.scss'
import {useRouter} from "next/router";
// IMPORTS
import PackageCard from "@/components/pages/dashboard/Package_card/PackageCard_User";
import Image from "next/image";
import {useEffect, useState} from "react";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/user/packages';
import {onInputChange as onInputInSubscriptionChange} from '@/redux/slices/user/subscription_info'
// LANGUAGE
import {useTranslation} from "react-i18next";


const Packages = () => {
    // ROUTER
    const router = useRouter();

    // LANGUAGE
    const {t} = useTranslation('bundles');

    //REDUX
    const dispatch = useDispatch();
    const {packages} = useSelector(state => state.packages_user);

    // States
    const [authenticationStatus, setAuthenticationStatus] = useState({
        isAuthenticated: false,
        hasProfile: false
    })

    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);

        if (token) {
            axios.get(`https://api.easydietkw.com/api/v1/get/verify/token`, {
                params: {
                    token: token,
                }
            })
                .then(res => {
                    console.log(res.data)
                    dispatch(onInputInSubscriptionChange({key: 'userId', value: res.data.decodedToken.userId}))
                    setAuthenticationStatus({
                        isAuthenticated: true,
                        hasProfile: res.data.hasProfile
                    })
                })
                .catch(err => console.log(err))
        }

    }, [dispatch])

    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        // LOGIC
        try {
            axios.get(`https://api.easydietkw.com/api/v1/client/bundles`)
                .then(res => {
                    dispatch(onInputChange({key: 'packages', value: res.data.bundles}))
                })
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }

    }, [dispatch])

    return (
        <>
            <div className={classes.Main}>
                <h1>{t("title")}</h1>

                <div className={classes.Bottom}>
                    {packages && packages.map((cur) => {
                        return (
                            <PackageCard
                                ID={cur._id}
                                key={cur._id}
                                name={cur.bundleName}
                                meals={cur.mealsNumber}
                                price={cur.bundlePrice}
                                snacks={cur.snacksNumber}
                                fridays={cur.fridayOption}
                                offers={cur.bundleOffer}
                                time={cur.timeOnCard}
                                language={cur.lang}
                                authenticationStatus={authenticationStatus}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Packages