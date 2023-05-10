import {useEffect, useState} from "react";
import classes from "@/styles/pages/user/my_subscription.module.scss";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/user/daymeals_slice';
import axios from "axios";
import {toast} from "react-toastify";
import DayItem from "@/components/pages/user/DayItem";
import MySubscription from "@/components/pages/user/MySubscription/MySubscription";
import {extractTokenFromCookie} from "@/helpers/extractToken";
// LANGUAGE
import {useTranslation} from "react-i18next";
import Head from "next/head";

const My_Subscription = () => {
    //REDUX
    const dispatch = useDispatch();

    // LANGUAGE
    const {t} = useTranslation('mySubscription');

    //STATES
    const [packageInfo, setPackageInfo] = useState({
        bundleName: '',
        bundleDays: '',
        startDate: '',
        endDate: '',
        remainingDays: ''
    });
    const [packageDays, setPackageDays] = useState([]);

    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);
        // LOGIC
        try {
            axios.get(`https://api.easydietkw.com/api/v1/client/plan/details`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    setPackageInfo({
                        bundleName: res.data.bundleName,
                        bundleDays: res.data.bundleDays,
                        startDate: new Date(res.data.startDate).toLocaleDateString('en-US', {
                            day: "numeric",
                            month: 'long'
                        }),
                        endDate: new Date(res.data.endDate).toLocaleDateString('en-US', {
                            day: "numeric",
                            month: 'long'
                        }),
                        remainingDays: res.data.remainingDays
                    })

                    setPackageDays(res.data.planDays || [])
                })
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }

    }, [dispatch])

    function getDayName(date) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    }

    function isDateAfterTwoDays(date) {
        const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; // Calculate two days in milliseconds
        const now = new Date(); // Get the current date and time
        const targetDate = new Date(date); // Create a new date object from the input date string

        return targetDate.getTime() - now.getTime() >= twoDaysInMilliseconds;
    }


    return (
        <>
            {/*SEO OPTIMIZATION*/}
            <Head>
                <title>EasyDiet | My Subscription</title>
                <meta name="description"
                      content="Discover EasyDiet's healthy meal options that have been satisfying customers for over five years. Our experienced chefs prepare each meal with fresh, locally-sourced ingredients to ensure that you get the best quality and flavor. Choose EasyDiet for convenient and delicious meals that leave you feeling energized and healthy."/>
                <meta name="keywords"
                      content="healthy meals, meal delivery, fresh ingredients, locally-sourced, convenient meal options, energy-boosting, nutritious food, easy ordering, delicious and healthy, meal plans"/>
                <meta name="author" content="EasyDiet"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="robots" content="index, follow"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="language" content="English"/>
                <meta name="revisit-after" content="7 days"/>
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
                    {
                        packageInfo?.bundleName && packageDays.length > 0 ? (
                            <>
                                <div className={classes.Top} data-title={t("title1")}>
                                    <div className={classes.Top_Container}>
                                        <div className={classes.Top_Item}>
                                            <h3>{t("name")}</h3>
                                            <span>{packageInfo.bundleName}</span>
                                        </div>
                                        <div className={classes.Top_Item}>
                                            <h3>{t("time")}</h3>
                                            <span>{packageInfo.bundleDays} {t("days")}</span>
                                        </div>
                                        <div className={classes.Top_Item}>
                                            <h3>{t("start")}</h3>
                                            <span>{packageInfo.startDate}</span>
                                        </div>
                                        <div className={classes.Top_Item}>
                                            <h3>{t("end")}</h3>
                                            <span>{packageInfo.endDate}</span>
                                        </div>
                                        <div className={classes.Top_Item}>
                                            <h3>{t("expires")}</h3>
                                            <span>{packageInfo.remainingDays} {t("days")}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.Bottom} data-title={t("title2")}>
                                    <div className={classes.Days_Container}>
                                        {packageDays && packageDays.map((item) => {
                                            return (
                                                <DayItem key={item._id} ID={item._id} Daydate={item.date}
                                                         title={getDayName(item.date)}
                                                         Editable={isDateAfterTwoDays(item.date)}
                                                         isSelected={item.submitted}
                                                         date={new Date(item.date).toLocaleDateString('en-US', {
                                                             day: 'numeric',
                                                             month: 'long'
                                                         })}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        ) : <MySubscription/>}
                </div>
            </main>
        </>

    )
}

export default My_Subscription;

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

    if (!tokenInfo || tokenInfo.role !== 'client' || tokenInfo.active === false) {
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
