import {useState} from "react";
import classes from '@/styles/pages/admin/create_user.module.scss'
import Image from "next/image";
import {useRouter} from "next/router";
import Head from "next/head";
// IMPORT
import CustomSelect from "@/components/pages/register/custom-select";
import PackageSelect from "@/components/pages/dashboard/packageSelect/packageSelect";
import Overlay from "@/components/layout/overlay";
import CopyClientData from "@/components/pages/dashboard/copyClientDta/copyClientData";
import Spinner from "@/components/layout/spinner/Spinner";
// HELPERS
import {toast} from "react-toastify";
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";
// REDUX
import {clearAll, onInputChange} from "@/redux/slices/Admin/createUser-slice";
import {useDispatch, useSelector} from "react-redux";
// LANGUAGE
import {useTranslation} from "react-i18next";

const CreateUser = () => {
    // ROUTER
    const router = useRouter();

    // LANGUAGE
    const {t} = useTranslation('createClient')

    // STATES
    const [loading, setLoading] = useState(false);
    const [showUserModel, setShowUserModel] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {fullName, email, gender, password, phone, region, street, house, floor, apartment, selectedPackage, payment} = useSelector(state => state.create_user)

    // SUBMIT HANDLER
    const submitHandler = async (e) => {
        // STOP RELOADING
        e.preventDefault();
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        //Check the inputs
        if (!fullName || !email || !gender || !password || !phone || !region || !street || !house || !floor || !apartment || !selectedPackage) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);
        // Create the Data as formData
        const createEmployee_formData = new FormData();

        // Send Create Request to the server
        await axios.post(`https://api.easydietkw.com/api/v1/create/employee`, createEmployee_formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.success(res.data.message);
                router.push(`/admin/users`)
                    .then(() => {
                        // Clear the reducer
                        dispatch(clearAll());
                        // Clear the image;
                        setSelectedImage('');
                        setPreview('')
                    })
            })
            .catch(err => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.error(err?.response?.data?.message || err?.message);
            })
    }


    const handleEmailBlur = () => {
        if (!email.endsWith('@easydeit.com')) {
            dispatch(onInputChange({key: 'email', value: email + '@easydeit.com'}));
        }
    };

    const closeHandler = () => {
        setShowUserModel(false)
    }

    return (
        <>
            {/*SEO OPTIMIZATION*/}
            <Head>
                <title>EasyDiet | Create User</title>
                <meta name="description" content="Discover EasyDiet's healthy meal options that have been satisfying customers for over five years. Our experienced chefs prepare each meal with fresh, locally-sourced ingredients to ensure that you get the best quality and flavor. Choose EasyDiet for convenient and delicious meals that leave you feeling energized and healthy."/>
                <meta name="keywords" content="healthy meals, meal delivery, fresh ingredients, locally-sourced, convenient meal options, energy-boosting, nutritious food, easy ordering, delicious and healthy, meal plans"/>
                <meta name="author" content="EasyDiet"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="robots" content="index, follow"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="language" content="English"/>
                <meta name="revisit-after" content="2 days"/>
                <meta name="generator" content="EasyDiet"/>
                <meta name="og:title" content="EasyDiet"/>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://easydietkw.com/" />
                <meta property="og:image" content="/images/Auth/logo.svg" />
                <meta property="og:site_name" content="EasyDiet" />
                <meta property="og:description" content="EasyDiet has been offering healthy meal options for over 5 years. With a diverse menu of delicious and locally-sourced ingredients, their experienced chefs provide convenient and energizing meals. Experience a healthier lifestyle with EasyDiet." />
            </Head>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>{t("title")}</h1>
                    <form onSubmit={submitHandler}>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'fullName'}>{t("fullName")}</label>
                                <input
                                    type={'text'}
                                    name={'fullName'}
                                    id={'fullName'}
                                    placeholder={'EX: Ahmed Mohammed'}
                                    value={fullName}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'fullName',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'phone'}>{t("mobile")}</label>
                                <input
                                    type={'tel'}
                                    name={'phone'}
                                    id={'phone'}
                                    placeholder={'EX: 99995555'}
                                    value={phone}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'phone',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <PackageSelect
                                    labelSelect={t("package")}
                                    defaultValue={selectedPackage || ''}
                                    changed={(values) => {
                                        dispatch(onInputChange({key: 'selectedPackage', value: values?.value}))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'gender'}>{t("gender")}</label>
                                <CustomSelect defaultValue={gender || ''} changed={(values) => {
                                    dispatch(onInputChange({key: 'gender', value: values?.value}))
                                }} />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'email'}>{t("email")}</label>
                                <input
                                    type={'email'}
                                    name={'email'}
                                    id={'email'}
                                    placeholder={'EX: ahmed2001'}
                                    value={email}
                                    onBlur={handleEmailBlur}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'email',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'password'}>{t("password")}</label>
                                <input
                                    type={'password'}
                                    name={'password'}
                                    id={'password'}
                                    placeholder={'EX: *******'}
                                    value={password}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'password',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'region'}>{t("region")}</label>
                                <input
                                    type={'text'}
                                    name={'region'}
                                    id={'region'}
                                    placeholder={'EX: ....'}
                                    value={region}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'region',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'street'}>{t("street")}</label>
                                <input
                                    type={'text'}
                                    name={'street'}
                                    id={'street'}
                                    placeholder={'EX: ....'}
                                    value={street}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'street',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'house'}>{t("house")}</label>
                                <input
                                    type={'text'}
                                    name={'house'}
                                    id={'house'}
                                    placeholder={'EX: ......'}
                                    value={house}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'house',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'floor'}>{t("floor")}</label>
                                <input
                                    type={'text'}
                                    name={'floor'}
                                    id={'floor'}
                                    placeholder={'EX: ......'}
                                    value={floor}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'floor',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <div className={classes.togglerInput}>
                                    <label htmlFor="payment">{t("payment")}</label>
                                    <div className={classes.toggler}>
                                        <input
                                            type="checkbox"
                                            id="payment"
                                            name="payment"
                                            checked={payment}
                                            onChange={(event) => {
                                                dispatch(onInputChange({
                                                    key: 'payment',
                                                    value: event.target.checked
                                                }))
                                            }}
                                        />
                                        <div className={classes.slider}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'apartment'}>{t("apartment")}</label>
                                <input
                                    type={'text'}
                                    name={'apartment'}
                                    id={'apartment'}
                                    placeholder={'EX: ......'}
                                    value={apartment}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'apartment',
                                            value: event.target.value,
                                        }))
                                    }}
                                />
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                {loading ? <Spinner size={2} color={`#ffffff`}/> : t("button")}
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
            <Overlay active={showUserModel}>
                <CopyClientData
                    input1Value={'Ahmed'}
                    input2Value={'Mohammed'}
                    closeHandler={closeHandler}
                />
            </Overlay>
        </>
    )

}

export default CreateUser;

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

    if (!tokenInfo || tokenInfo.role !== 'admin' || tokenInfo.active === false) {
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