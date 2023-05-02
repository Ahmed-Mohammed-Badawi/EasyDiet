import classes from "@/styles/pages/user/Nutritio_specialist.module.scss";
import DoctorCard from "@/components/pages/user/DoctorCard";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import {onInputChange} from "@/redux/slices/user/nutritionspecialist_slice";
import {toast} from "react-toastify";
import {extractTokenFromCookie} from "@/helpers/extractToken";


const Nutritio_specialist = () => {

    // ROUTER
    const router = useRouter();

    //REDUX
    const dispatch = useDispatch();
    const {specialists} = useSelector(state => state.nutrition_specialist)

    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);

        // LOGIC
        try {
            axios.get(`https://api.easydietkw.com/api/v1/get/specialists`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res)
                    dispatch(onInputChange({key: 'specialists', value: res.data.specialists}))
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
                    {specialists && specialists.map((cur, index) => {
                        return (
                            <DoctorCard
                                key={cur._id}
                                name={cur.fullName}
                                image={cur.userImage}
                                nutrition_specialistId={cur._id}
                                phone={cur.phoneNumber}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Nutritio_specialist;

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
