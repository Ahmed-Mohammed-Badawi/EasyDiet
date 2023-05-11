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
// LANGUAGE
import {useTranslation} from "react-i18next";
import Head from "next/head";

const DefaultMeals = ({role}) => {
    //ROUTER
    const router = useRouter();

    // LANGUAGE
    const {t} = useTranslation('defaultMeals');

    // STATES
    const [isOn, setIsOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState(null);
    // PAGINATION STATES
    const [pageNumber, setPageNumber] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);



    // REDUX
    const dispatch = useDispatch();
    const {meals: selectedMeals, selectedDay} = useSelector(state => state.defaultmeals)

    const handleClick = (e) => {
        setIsOn(e.target.checked);
    };

    const checkEmployees = () => {
        setIsOn(true);
    }
    const checkClients = () => {
        setIsOn(false);
    }

    // PAGINATION LOGIC
    const prevPage = () => {
        if (pageNumber === 1) return;

        if (hasPrevPage) {
            setPageNumber(prev => prev - 1);
        }
    }

    const nextPage = () => {
        if (hasNextPage) {
            setPageNumber(prev => prev + 1);
        }
    }


    useEffect(() => {
        const token = extractTokenFromCookie(document.cookie);

        // SET DYNAMIC URL BASED ON THE ROLE
        let url = `https://api.easydietkw.com/api/v1/get/meals`;
        if (role === 'manager') {
            url = `https://api.easydietkw.com/api/v1/manager/get/meals`;
        }

        try {
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    page: pageNumber || 1,
                    lang: isOn ? 'AR' : 'EN',
                }
            })
                .then(res => {
                    setHasNextPage(res.data.data.hasNextPage);
                    setHasPrevPage(res.data.data.hasPreviousPage);
                    setMeals(res.data.data.meals);
                })
        }catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }
    }, [isOn, pageNumber]);

    // SUBMIT HANDLER
    const submitHandler = async () => {
        const token = extractTokenFromCookie(document.cookie);

        // CHECK IF THE USER SELECTED A DAY
        if (!selectedDay) {
            return toast.error(t('selectDay'))
        }

        // CHECK IF THE USER SELECTED MEALS LENGTH IS 0
        if (selectedMeals.length <= 0) {
            return toast.error(t('selectMeals'))
        }

        // SET THE LOADING TO TRUE
        setLoading(true);


        // SET DYNAMIC URL BASED ON THE ROLE
        let url = `https://api.easydietkw.com/api/v1/add/chiff/menu`;
        if (role === 'manager') {
            url = `https://api.easydietkw.com/api/v1/manager/chiff/menu`;
        }

        await axios.post(url, {
            date: selectedDay,
            mealsIds: selectedMeals,
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE LOADING TO FALSE
                setLoading(false);

                // SHOW SUCCESS
                toast.success(res.data?.message || "Data has been added successfully");

                // CLEAR IT
                dispatch(clearAll())
            })
            .catch(err => {
                // SET THE LOADING TO FALSE
                setLoading(false);

                // SHOW ERROR
                toast.error(err.response?.data?.message || err.message)
            })
    }

    return (
        <>
            {/*SEO OPTIMIZATION*/}
            <Head>
                <title>EasyDiet | Default Meals</title>
                <meta name="description" content="Discover EasyDiet's healthy meal options that have been satisfying customers for over five years. Our experienced chefs prepare each meal with fresh, locally-sourced ingredients to ensure that you get the best quality and flavor. Choose EasyDiet for convenient and delicious meals that leave you feeling energized and healthy."/>
                <meta name="keywords" content="healthy meals, meal delivery, fresh ingredients, locally-sourced, convenient meal options, energy-boosting, nutritious food, easy ordering, delicious and healthy, meal plans"/>
                <meta name="author" content="EasyDiet"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="robots" content="index, follow"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="language" content="English"/>
                <meta name="revisit-after" content="7 days"/>
                <meta name="generator" content="EasyDiet"/>
                <meta name="og:title" content="EasyDiet"/>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://easydietkw.com/" />
                <meta property="og:image" content="/images/Auth/logo.svg" />
                <meta property="og:site_name" content="EasyDiet" />
                <meta property="og:description" content="EasyDiet has been offering healthy meal options for over 5 years. With a diverse menu of delicious and locally-sourced ingredients, their experienced chefs provide convenient and energizing meals. Experience a healthier lifestyle with EasyDiet." />
            </Head>
            <main className={classes.Main}>
                <div className={classes.Container}>
                    <div className={classes.Top}>
                        <div className={classes.Toggle_container}>
                            <span onClick={checkClients}>{t("english")}</span>
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
                            <span onClick={checkEmployees}>{t("arabic")}</span>
                        </div>
                        <div className={classes.Day_container}>
                            <label htmlFor={'selectedDay'}>{t("day")}</label>
                            <input
                                id={'selectedDay'}
                                type={'date'}
                                name={'dayMeals'}
                                value={selectedDay}
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
                        {(hasNextPage || hasPrevPage) && (
                            <div className={classes.Table_Pagination}>
                                <button onClick={prevPage} disabled={!hasPrevPage} title={String(pageNumber - 1)}>
                                    <Image src={'/images/Arrow-Left_Icon.svg'} alt={'Arrow Left'} width={15}
                                           height={15}/>
                                </button>
                                <button onClick={nextPage} disabled={!hasNextPage} title={String(pageNumber + 1)}>
                                    <Image src={'/images/Arrow-Right_Icon.svg'} alt={'Arrow Right'} width={15}
                                           height={15}/>
                                </button>
                            </div>
                        )}
                        <button type={'submit'} className={classes.Submit} onClick={submitHandler}>
                            <span>
                                {loading ? <Spinner size={2} color={`#ffffff`}/> : t("button")}
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}
export default DefaultMeals;

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

    if (!tokenInfo || (tokenInfo.role !== 'admin' && tokenInfo.role !== 'manager') || tokenInfo.active === false) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {role: tokenInfo.role}
    };
};
