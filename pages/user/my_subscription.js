import classes from "@/styles/pages/user/my_subscription.module.scss";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/user/daymeals_slice';
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import DayItem from "@/components/pages/user/DayItem";

const My_Subscription = () => {
    //REDUX
    const dispatch = useDispatch();
    const {meals, day, selectedMeals} = useSelector(state => state.daymeals_user);


    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        // LOGIC
        try {
            axios.get(`https://api.easydietkw.com/api/v1/client/bundles`)
                .then(res => {
                    dispatch(onInputChange({key: 'meals', value: res.data.bundles}))
                })
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }

    }, [dispatch])


    return (
        <>
            <main className={classes.Main}>
                <div className={classes.Container}>
                    <div className={classes.Top}>
                        <div className={classes.Top_Container}>
                            <div className={classes.Top_Item}>
                                <h3>NAME</h3>
                                <span>FIT PACKAGE</span>
                            </div>
                            <div className={classes.Top_Item}>
                                <h3>TIME</h3>
                                <span>15 Days</span>
                            </div>
                            <div className={classes.Top_Item}>
                                <h3>START</h3>
                                <span>15 FEB</span>
                            </div>
                            <div className={classes.Top_Item}>
                                <h3>END</h3>
                                <span>02 MAR</span>
                            </div>
                            <div className={classes.Top_Item}>
                                <h3>REMAINING</h3>
                                <span>10 Days</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <div className={classes.Days_Container}>
                            {[0, 0, 0, 0, 0, 0, 0 , 0 ,0 ,0 , 0, 0, 0, 0].map((item, index) => {
                              return (
                                  <DayItem key={index}
                                    title={'Monday'} Editable={false} isSelected={true} date={'15 Feb'}
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