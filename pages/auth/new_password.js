import classes from "@/styles/pages/new_password.module.scss";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/layout/spinner/Spinner";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {toast} from "react-toastify";
// REDUX
import {useSelector, useDispatch} from "react-redux";
import {onInputChange} from '@/redux/slices/Auth/resetPasswordSlice';

const NewPassword = () => {

    // ROUTER
    const router = useRouter();
    // LANGUAGE
    const {t} = useTranslation('newPassword');
    // STATES
    const [loading, setLoading] = useState(false);

    // REDUX
    const dispatch = useDispatch();
    const {email, password, newPassword} = useSelector(state => state.resetPassword);


    useEffect(()=> {

        if(!email){
            router.push('/auth/reset_password');
        }

    }, [email, router])


    const handleFormSubmit = async (e) => {
        e.preventDefault();


        if(!password || !newPassword){
            toast.error('Please fill all fields');
            return
        }

        if(password !== newPassword){
            toast.error('Password and confirm is not the same');
            return
        }

        setLoading(true)

        await axios.post("https://api.easydietkw.com/api/v1/reset/password", {
            email: email,
            password: password,
            confirmPassword: newPassword
        })
            .then(res => {
                setLoading(false);

                // Show success message
                toast.success(res.data.message);
                //ROUTER REDIRECT
                router.push('/auth/login');
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
                                        type={'password'}
                                        id={'new_password'}
                                        name={'new_password'}
                                        placeholder={t("placeholder1")}
                                        onChange={event => {
                                            dispatch(onInputChange({key: 'password', value: event.target.value}))
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={classes.Input_Group}>
                                <div className={classes.InputBorderContainer}>
                                    <input
                                        type={'password'}
                                        id={'confirm_password'}
                                        name={'confirm_password'}
                                        placeholder={t("placeholder2")}
                                        onChange={event => {
                                            dispatch(onInputChange({key: 'newPassword', value: event.target.value}))
                                        }}
                                    />
                                </div>
                            </div>

                            <div className={classes.Form_buttons}>
                                <div className={classes.Links}>
                                    <Link href={'/auth/login'}>
                                        {t("link1")}
                                    </Link>
                                </div>
                                <div className={classes.Buttons_Container}>
                                    <button
                                        className={[classes.Create_button].join(' ')}
                                        type={'submit'}>
                                        <span>{loading ? <Spinner size={2} color={`#A71523`}/> : t("createButton")}</span>
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
export default NewPassword