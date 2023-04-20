import classes from '@/styles/pages/user/packages.module.scss'
import {useRouter} from "next/router";
// IMPORTS
import PackageCard from "@/components/pages/dashboard/Package_card/PackageCard_User";
import Image from "next/image";
import {useEffect} from "react";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/user/packages';

const Packages = () => {
    // ROUTER
    const router = useRouter();

    //REDUX
    const dispatch = useDispatch();
    const {packages} = useSelector(state => state.packages_user);

    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        // LOGIC
        try {
            axios.get(`https://api.easydietkw.com/api/v1/client/bundles`)
                .then(res => {
                    console.log(res)
                    dispatch(onInputChange({key: 'packages', value: res.data.bundles}))
                })
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }

    }, [dispatch])

    return (
        <>
            <div className={classes.Main}>
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
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Packages