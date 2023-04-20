import classes from "@/styles/pages/user/Nutritio_specialist.module.scss";
import DoctorCard from "@/components/pages/user/DoctorCard";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {onInputChange} from "@/redux/slices/user/packages";
import {toast} from "react-toastify";


const Nutritio_specialist = () => {

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
                <h1>nutrition specialist</h1>
                <div className={classes.Bottom}>
                    {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((cur, index) => {
                        return (
                            <DoctorCard key={index} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Nutritio_specialist;