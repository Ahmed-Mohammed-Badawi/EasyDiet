import {useEffect, useState} from "react";
import classes from '@/styles/pages/admin/defaultmeals.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";
// IMPORTS
import MealCheckbox from "@/components/pages/dashboard/Meal_checkbox/MealCheckbox_defaultMeals";
import Spinner from "@/components/layout/spinner/Spinner";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import {toast} from "react-toastify";
import axios from "axios";
// REDUX
import {useSelector, useDispatch} from "react-redux";
import {onInputChange, clearAll} from '@/redux/slices/Admin/defaultmeals_slice';

const Users = () => {
    //ROUTER
    const router = useRouter();

    // STATES
    const [isOn, setIsOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [meals, setMeals] = useState(null);

    // REDUX
    const dispatch = useDispatch();
    const {meals: selectedMeals} = useSelector(state => state.defaultmeals)

    const handleClick = (e) => {
        setIsOn(e.target.checked);
    };

    const checkEmployees = () => {
        setIsOn(true);
    }
    const checkClients = () => {
        setIsOn(false);
    }
    
    useEffect(() => {
        const token = extractTokenFromCookie(document.cookie);
        
        try {
            axios.get(`https://api.easydietkw.com/api/v1/get/meals`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    page: currentPage,
                    lang: isOn ? 'AR' : 'EN',
                }
            })
                .then(res => {
                    console.log(res);
                    setMeals(res.data.data.meals);
                })
        }catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }
    }, [isOn, currentPage]);

    // SUBMIT HANDLER
    const submitHandler = async () => {
        const token = extractTokenFromCookie(document.cookie);

        await axios.put(``)
            .then(res => {
                // CLEAR IT
                dispatch(clearAll())
            })
            .catch(err => {
                toast.error(err.response?.data?.message || err.message)
            })
    }

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.Container}>
                    <div className={classes.Top}>
                        <div className={classes.Toggle_container}>
                            <span onClick={checkClients}>ENGLISH</span>
                            <div className={classes.UserToggler}>
                                <label htmlFor={'users_type'}
                                       className={[classes.toggle_container, isOn ? classes.Employees : ''].join(' ')}>
                                </label>
                                <input
                                    id={'users_type'}
                                    type="checkbox"
                                    name="toggle"
                                    checked={isOn}
                                    onChange={handleClick}
                                />
                            </div>
                            <span onClick={checkEmployees}>ARABIC</span>
                        </div>
                        <div className={classes.Day_container}>
                            <label htmlFor={'selectedDay'}>Selected Day: </label>
                            <input
                                id={'selectedDay'}
                                type={'date'}
                                name={'dayMeals'}
                                onChange={(event) => {
                                    dispatch(onInputChange({key: 'selectedDay', value: event.target.value}))
                                }}
                            />
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <table className={classes.table}>
                            <thead>
                            <tr>
                                <th>IMAGE</th>
                                <th>MEAL NAME</th>
                                <th>CATEGORIES</th>
                                <th>LANGUAGE</th>
                                <th>SELECT</th>
                            </tr>
                            </thead>
                            <tbody>
                            {meals && meals.map((cur) => {
                                return (
                                    <tr key={cur._id} className={classes.row}>
                                        <td>
                                            <div className={classes.UserImage}>
                                                <Image src={cur.imagePath}
                                                       alt={'User Image'} width={40} height={40}/>
                                            </div>
                                        </td>
                                        <td>{cur.mealTitle}</td>
                                        <td>{cur.mealType}</td>
                                        <td><span
                                            className={classes.SubscriptionButton}>{cur.lang}</span>
                                        </td>
                                        <td className={classes.Actions}>
                                            <MealCheckbox id={cur._id}/>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.Buttons_Container}>
                        <div className={classes.Table_Pagination}>
                            <button>
                                <Image src={'/images/Arrow-Left_Icon.svg'} alt={'Arrow Left'} width={15} height={15}/>
                            </button>
                            <button>
                                <Image src={'/images/Arrow-Right_Icon.svg'} alt={'Arrow Right'} width={15} height={15}/>
                            </button>
                        </div>
                        <button type={'submit'} className={classes.Submit} onClick={() => router.push(`/admin/create/create_package`)}>
                            <span>
                                {loading ? <Spinner size={2} color={`#ffffff`}/> : 'CONFIRM'}
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Users