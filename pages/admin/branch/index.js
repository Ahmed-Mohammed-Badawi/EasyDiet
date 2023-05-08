import {useRef, useState} from "react";
import classes from '@/styles/pages/admin/branch_manager.module.scss';
import Image from "next/image";
import Head from "next/head";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {setUsers} from "@/redux/slices/Admin/users-slice";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {onCheck} from '@/redux/slices/Admin/branchManager-slice';
// LANGUAGE
import {useTranslation} from "react-i18next";

const Branch_Manager = () => {
    //STATES
    const [users, setUsers] = useState([]);

    // LANGUAGE
    const {t} = useTranslation('branch')

    const user = {
        clientName: 'Ahmed Mohammed',
        subscriptionId: '012844154512',
        _id: '15245463515634',
        phoneNumber: '01020985828'
    }

    //REF
    const searchInputRef = useRef();

    //REDUX
    const dispatch = useDispatch();
    const {meals, checks: {All, Breakfast, Lunch, Dinner, Snacks}} = useSelector(state => state.branch);

    async function handleSearch() {
        const token = extractTokenFromCookie(document.cookie);

        // GET THE EMPLOYEES
        axios.get(`https://api.easydietkw.com/api/v1/find/client?searchTerm=${searchInputRef.current.value}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE USERS IN REDUX
                dispatch(setUsers({users: res.data.clients, usersType: 'clients'}))
            })
            .catch(err => {
                toast.error(err.response?.data?.message || err.message);
            })
    }

    async function handleSuccess(mealId) {
        const token = extractTokenFromCookie(document.cookie);

        // GET THE EMPLOYEES
        axios.get(`https://api.easydietkw.com/api/v1/find/client?searchTerm=${searchInputRef.current.value}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE USERS IN REDUX
                dispatch(setUsers({users: res.data.clients, usersType: 'clients'}))
            })
            .catch(err => {
                toast.error(err.response?.data?.message || err.message);
            })
    }

    async function handleFail(mealId) {
        const token = extractTokenFromCookie(document.cookie);

        // GET THE EMPLOYEES
        axios.get(`https://api.easydietkw.com/api/v1/find/client?searchTerm=${searchInputRef.current.value}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE USERS IN REDUX
                dispatch(setUsers({users: res.data.clients, usersType: 'clients'}))
            })
            .catch(err => {
                toast.error(err.response?.data?.message || err.message);
            })
    }

    return (
        <>
            {/*SEO OPTIMIZATION*/}
            <Head>
                <title>EasyDiet | Branch</title>
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
                        <div className={classes.Filter}>
                            <div className={classes.container}>
                                <div className={classes.checkboxGroup}>
                                    <input onChange={() => {}} checked={All} type="checkbox" id="All" className={classes.checkbox} onClick={(event) => {
                                        dispatch(onCheck({
                                            key: 'All',
                                            value: true
                                        }))
                                    }} />
                                    <label htmlFor="All" className={classes.label}>
                                        <span className={classes.labelText}>{t("all")}</span>
                                    </label>
                                </div>
                                <div className={classes.checkboxGroup}>
                                    <input onChange={() => {}} checked={Breakfast} type="checkbox" id="breakfast" className={classes.checkbox} onClick={(event) => {
                                        dispatch(onCheck({
                                            key: 'Breakfast',
                                            value: true
                                        }))
                                    }} />
                                    <label htmlFor="breakfast" className={classes.label}>
                                        <span className={classes.labelText}>{t("breakfast")}</span>
                                    </label>
                                </div>
                                <div className={classes.checkboxGroup}>
                                    <input onChange={() => {}} checked={Lunch} type="checkbox" id="lunch" className={classes.checkbox} onClick={(event) => {
                                        dispatch(onCheck({
                                            key: 'Lunch',
                                            value: true
                                        }))
                                    }} />
                                    <label htmlFor="lunch" className={classes.label}>
                                        <span className={classes.labelText}>{t("lunch")}</span>
                                    </label>
                                </div>
                                <div className={classes.checkboxGroup}>
                                    <input onChange={() => {}} checked={Dinner} type="checkbox" id="dinner" className={classes.checkbox} onClick={(event) => {
                                        dispatch(onCheck({
                                            key: 'Dinner',
                                            value: true
                                        }))
                                    }} />
                                    <label htmlFor="dinner" className={classes.label}>
                                        <span className={classes.labelText}>{t("dinner")}</span>
                                    </label>
                                </div>
                                <div className={classes.checkboxGroup}>
                                    <input onChange={() => {}} checked={Snacks} type="checkbox" id="snacks" className={classes.checkbox} onClick={(event) => {
                                        dispatch(onCheck({
                                            key: 'Snacks',
                                            value: true
                                        }))
                                    }} />
                                    <label htmlFor="snacks" className={classes.label}>
                                        <span className={classes.labelText}>{t("snacks")}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={classes.Search}>
                            <button onClick={handleSearch}>
                                <Image src={'/images/Search_Icon.svg'} alt={'Add Icon'} width={18} height={18}/>
                            </button>
                            <input ref={searchInputRef} type={'text'} alt={'search'} placeholder={'search'}/>
                        </div>

                    </div>
                    <div className={classes.Bottom}>
                        <table className={classes.table}>
                            <thead>
                            <tr>
                                <th>USER ID</th>
                                <th>USER NAME</th>
                                <th>MOBILE</th>
                                <th>TYPE</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/*{users && users.map((user) => {*/}
                            {/*    return (*/}
                                    <tr className={classes.row} key={user._id}>
                                        <td>{user.subscriptionId}</td>
                                        <td className={classes.ClientName}>{user?.clientNameEn || user.clientName}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td><span
                                            className={[classes.SubscriptionButton]}>{'BREAKFAST'}</span>
                                        </td>
                                        <td className={classes.Actions}>
                                            <button className={classes.Freeze}
                                                    onClick={() => {

                                                    }}>
                                                {t("unable")}
                                            </button>
                                            <button className={classes.Delete}
                                                    onClick={() => handleDelete(user._id)}>
                                                {t("arrived")}
                                            </button>
                                        </td>
                                    </tr>
                                {/*)*/}
                            {/*})}*/}
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.Table_Pagination}>
                        <button>
                            <Image src={'/images/Arrow-Left_Icon.svg'} alt={'Arrow Left'} width={15} height={15}/>
                        </button>
                        <button>
                            <Image src={'/images/Arrow-Right_Icon.svg'} alt={'Arrow Right'} width={15} height={15}/>
                        </button>
                    </div>
                </div>
            </main>
        </>

    )
}

export default Branch_Manager;

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
        props: {},
    };
};
