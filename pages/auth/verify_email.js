import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";

//STYLE
import classes from '@/styles/pages/verify_email.module.scss'

import axios from "axios";
import {toast} from "react-toastify";
// Language
import {useTranslation} from "react-i18next";
import Spinner from "@/components/layout/spinner/Spinner";

export default function VerifyEmail({isAuthenticated, userData}) {
    // STATES
    const [loading, setLoading] = useState(false);


    // ROUTER
    const router = useRouter();
    // LANGUAGE
    const {t} = useTranslation('verifyEmail');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)

        await axios.post("https://api.easydietkw.com/api/v1/login")
            .then(res => {
                setLoading(false);

                // Show success message
                toast.success(res.data.message);
            })
            .catch(err => {
                setLoading(false)
                // Show error message
                toast.error(err.response?.data?.message || err.message || "Invalid username or password");
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
                            <button type={'button'} className={classes.Resend_Code}>
                                {t("resendButton")}
                            </button>
                            <div className={classes.Input_Group}>
                                <div className={classes.InputBorderContainer}>
                                    <input type={'text'} id={'CODE'} name={'CODE'} placeholder={t("placeholder1")}/>
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
