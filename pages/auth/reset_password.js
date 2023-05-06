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