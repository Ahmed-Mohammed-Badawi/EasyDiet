import classes from "@/styles/pages/reset_password.module.scss";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/layout/spinner/Spinner";
import {useState} from "react";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {toast} from "react-toastify";
// REDUX
import {useSelector, useDispatch} from "react-redux";
import {onInputChange} from '@/redux/slices/Auth/resetPasswordSlice';
import Head from "next/head";

const ResetPassword = () => {

    const [loading, setLoading] = useState(false);


    // ROUTER
    const router = useRouter();
    // LANGUAGE
    const {t} = useTranslation('resetPassword');

    // REDUX
    const dispatch = useDispatch();
    const {email} = useSelector(state => state.resetPassword)

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!regex.test(email)){
            toast.error('Please enter a valid email');
            return;
        }

        setLoading(true)

        await axios.post("https://api.easydietkw.com/api/v1/forgot/password", {
            email: email
        })
            .then(res => {
                setLoading(false);
                // Show success message
                toast.success(res.data.message);
                // REDIRECT TO CODE PAGE
                router.push('/auth/verify_email')
            })
            .catch(err => {
                setLoading(false)
                // Show error message
                toast.error(err.response?.data?.message || err.message || "Something went wrong");
            })
    };


    return (
        <>
            {/*SEO OPTIMIZATION*/}
            <Head>
                <title>EasyDiet | Reset Password</title>
                <meta name="description" content="Reset your Password in to EasyDiet and access our diverse menu of delicious, healthy meals that are perfect for people who are looking to maintain a healthy lifestyle. Our team of experienced chefs use fresh, locally-sourced ingredients to prepare each meal. Join our community of satisfied customers who have reported feeling more energized and healthier after consuming our meals. EasyDiet: Providing Healthy Meals for Over 5 Years "/>
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
            <div className={classes?.Container}>
                <div className={classes?.Main}>
                    <div className={classes?.Right}>
                        <div className={classes?.Logo} onClick={() => router.push('/')}>
                            <Image src={'/images/Auth/logo.svg'} alt={'logo'} width={70} height={50}/>
                        </div>
                        <form className={classes.Form} onSubmit={handleFormSubmit}>
                            <h2 className={classes.Heading_2}>{t("title")}</h2>
                            <div className={classes.Input_Group}>
                                <div className={classes.InputBorderContainer}>
                                    <input
                                        onChange={(e) => {
                                            dispatch(onInputChange({key: 'email', value: e.target.value}))
                                        }}
                                        type={'email'}
                                        id={'email'}
                                        placeholder={t("placeholder1")}
                                        name={'email'}/>
                                </div>
                            </div>
                            <div className={classes.Form_buttons}>
                                <div className={classes.Links}>
                                    <Link href={'/auth/login'}>
                                        {t("link1")}
                                    </Link>
                                </div>
                                <div className={classes.Buttons_Container}>
                                    {/*<button type={'button'} className={classes.Google_button}>*/}
                                    {/*    <span><Image src={'/images/Auth/google-icon.svg'} alt={'Create User'} width={30}*/}
                                    {/*                 height={30}/></span>*/}
                                    {/*</button>*/}
                                    <button
                                        className={[classes.Create_button].join(' ')}
                                        type={'submit'}>
                                        <span>
                                            {loading ? <Spinner size={2} color={`#A71523`}/> : t("createButton")}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={classes?.Left}>
                        <p>EASYDEIT</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPassword