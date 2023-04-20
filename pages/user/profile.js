import {useState} from "react";
import classes from '@/styles/pages/user/profile.module.scss'
import Image from "next/image";
//IMPORTS
import Spinner from "@/components/layout/spinner/Spinner";
import {toast} from "react-toastify";
import axios from "axios";
import {useRouter} from "next/router";
// REDUX
import {onInputChange} from "@/redux/slices/user/profile_slice";
import {useDispatch, useSelector} from "react-redux";
//HELPERS
import {extractTokenFromCookie} from "@/helpers/extractToken";

const Profile = () => {
    // ROUTER
    const router = useRouter();

    // STATES
    const [loading, setLoading] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {
        userId,
        firstName,
        lastName,
        phone,
        region,
        street,
        house,
        floor,
        apartment
    } = useSelector(state => state.profile)


    // SUBMIT HANDLER
    const submitHandler = async (e) => {
        // STOP RELOADING
        e.preventDefault();
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);

        //Check the inputs
        // if (!name || !timeOnCard || !realTime || !packagePrice || !numberOfMeals || !numberOfSnacks || !language || packageMeals.length <= 0) {
        //     toast.error(`Please fill All inputs`);
        //     return;
        // }
        // Set the loading state for the spinner
        setLoading(true);

        // const createMeal_Obj = {
        //     bundleName: name,
        //     mealsNumber: numberOfMeals,
        //     breakfast: breakfast ? 'on' : 'off',
        //     lunch: lunch ? 'on' : 'off',
        //     dinner: dinner ? 'on' : 'off',
        //     snacksNumber: numberOfSnacks,
        //     bundlePeriod: realTime,
        //     bundleOffer: offerDays,
        //     fridayOption: fridayIncluded,
        //     bundlePrice: packagePrice,
        //     mealsIds: packageMeals,
        //     lang: language,
        //     timeOnCard: timeOnCard
        // }

        // Send Create Request to the server
        await axios.post(`https://api.easydietkw.com/api/v1/create/bundle`, createMeal_Obj, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.success(res.data.message || `Package Created Successfully`);
                router.push(`/admin/packages`)
                    .then(() => {
                        // Clear the reducer
                        dispatch(clearAll());
                    })
            })
            .catch(err => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.error(err?.response?.data?.message || err?.message);
            })
    }

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <div className={classes.Top}>
                        <h1>Profile</h1>
                        <button className={classes.Status}>
                            <Image src={'/images/Global/Status_Icon.png'} alt={'user status'} width={25} height={25} />
                            <span>Status</span>
                        </button>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'firstname'}>First Name</label>
                                <input
                                    type={'text'}
                                    name={'firstname'}
                                    id={'firstname'}
                                    placeholder={'EX: Ahmed'}
                                    value={firstName}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'firstName',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'lastname'}>Last Name</label>
                                <input
                                    type={'text'}
                                    name={'lastname'}
                                    id={'lastname'}
                                    placeholder={'EX: Mohammed'}
                                    value={lastName}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'lastName',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'phoneNumber'}>Phone Number</label>
                                <input
                                    type={'tel'}
                                    name={'phoneNumber'}
                                    id={'phoneNumber'}
                                    placeholder={'EX: 99995658'}
                                    value={phone}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'phone',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'Region'}>Region</label>
                                <input
                                    type={'text'}
                                    name={'Region'}
                                    id={'Region'}
                                    placeholder={'EX: Hawalli'}
                                    value={region}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'region',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'street'}>Street</label>
                                <input
                                    type={'text'}
                                    name={'street'}
                                    id={'street'}
                                    placeholder={'EX: 15 Mohammed Ali Street'}
                                    value={street}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'street',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'house'}>House</label>
                                <input
                                    type={'number'}
                                    name={'house'}
                                    min={'0'}
                                    id={'house'}
                                    placeholder={'EX: 2'}
                                    value={house}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'house',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'floor'}>Floor</label>
                                <input
                                    type={'number'}
                                    name={'floor'}
                                    min={'0'}
                                    id={'floor'}
                                    placeholder={'EX: 5'}
                                    value={floor}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'floor',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'apartment'}>Apartment</label>
                                <input
                                    type={'number'}
                                    name={'apartment'}
                                    min={'0'}
                                    id={'apartment'}
                                    placeholder={'EX: 2'}
                                    value={apartment}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'apartment',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.NavigationContainer}>
                            <button type={'submit'}>
                                <span>
                                    {loading ? <Spinner size={2} color={`#ffffff`}/> : 'Update'}
                                </span>
                                <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}
export default Profile;

// export const getServerSideProps = async (ctx) => {
//     // GET THE TOKEN FROM THE REQUEST
//     const {token} = ctx.req.cookies;
//
//     let tokenInfo;
//     if (token) {
//         await axios.get(`https://api.easydietkw.com/api/v1/get/verify/token`, {
//             params: {
//                 token: token,
//             }
//         })
//             .then(res => tokenInfo = res.data.decodedToken)
//             .catch(err => console.log(err))
//     }
//
//     if (!tokenInfo || tokenInfo.role !== 'admin' || tokenInfo.active === false) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     }
//
//     return {
//         props: {},
//     };
// };