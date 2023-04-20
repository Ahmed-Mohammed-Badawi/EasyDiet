import {useEffect, useState} from "react";
import classes from "@/styles/pages/user/my_subscription.module.scss";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/user/daymeals_slice';
import axios from "axios";
import {toast} from "react-toastify";
import DayItem from "@/components/pages/user/DayItem";
import {extractTokenFromCookie} from "@/helpers/extractToken";

const My_Subscription = () => {
    //REDUX
    const dispatch = useDispatch();

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
        console.log(date, daysOfWeek[dayIndex], new Date(date).getDay())
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
            <main className={classes.Main}>
                <div className={classes.Container}>
                    <div className={classes.Top}>
                        <div className={classes.Top_Container}>
                            <div className={classes.Top_Item}>
                                <h3>NAME</h3>
                                <span>{packageInfo.bundleName}</span>
                            </div>
                            <div className={classes.Top_Item}>
                                <h3>TIME</h3>
                                <span>{packageInfo.bundleDays} Days</span>
                            </div>
                            <div className={classes.Top_Item}>
                                <h3>START</h3>
                                <span>{packageInfo.startDate}</span>
                            </div>
                            <div className={classes.Top_Item}>
                                <h3>END</h3>
                                <span>{packageInfo.endDate}</span>
                            </div>
                            <div className={classes.Top_Item}>
                                <h3>Expires After</h3>
                                <span>{packageInfo.remainingDays} Days</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <div className={classes.Days_Container}>
                            {packageDays && packageDays.map((item, index) => {
                              return (
                                  <DayItem key={index}
                                    title={getDayName(item.date)} Editable={isDateAfterTwoDays(item.date)} isSelected={item.submitted} date={new Date(item.date).toLocaleDateString('en-US', {day: 'numeric', month: 'long'})}
                                  />
                              )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>

    )
}

export default My_Subscription;