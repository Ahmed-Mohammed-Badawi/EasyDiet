import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";

//STYLE
import classes from '@/styles/pages/login.module.scss'

import axios from "axios";
import {toast} from "react-toastify";
// Language
import {useTranslation} from "react-i18next";
import Spinner from "@/components/layout/spinner/Spinner";

export default function Login({isAuthenticated, userData}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    // ROUTER
    const router = useRouter();
    // LANGUAGE
    const {t} = useTranslation('login');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // CHECK THE VALIDATION
        if(!username || !password){
            toast.error('Please fill all inputs');
            return;
        }

        setLoading(true)

        await axios.post(
            "https://api.easydietkw.com/api/v1/login",
            {
                username: username,
                password: password,
            }
        )
            .then(res => {
                setLoading(false);
                document.cookie = `token=${res.data.token}; path=/;`;

                // Redirect based on the user's role
                if (res.data.user.role === "admin") {
                    router.push(`/admin/dashboard`)
                        .then(() => router.reload())
                } else if (res.data.user.role === "client") {
                    router.push(`/user/my_subscription`)
                        .then(() => router.reload())
                } else if (res.data.user.role === "manager") {
                    router.push(`/admin/branch`)
                        .then(() => router.reload())
                } else if (res.data.user.role === "diet specialist") {
                    router.push(`/doctor`)
                        .then(() => router.reload())
                }

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
                            <div className={classes.Input_Group}>
                                <div className={classes.InputBorderContainer}>
                                    <input
                                        onChange={(e) => setUsername(e.target.value)}
                                        type={'text'}
                                        id={'email'}
                                        placeholder={t("placeholder1")}
                                        name={'email'}/>
                                </div>
                            </div>
                            <div className={classes.Input_Group}>
                                <div className={classes.InputBorderContainer}>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={'password'}
                                        id={'password'}
                                        placeholder={t("placeholder2")}
                                        name={'password'}/>
                                </div>
                            </div>
                            <div className={classes.Form_buttons}>
                                <div className={classes.Links}>
                                    <Link href={'/auth/register'}>
                                        {t("link1")}
                                    </Link>
                                    <Link href={'/auth/reset_password'}>
                                        {t("link2")}
                                    </Link>
                                </div>
                                <div className={classes.Buttons_Container}>
                                    <button type={'button'} className={classes.Google_button}>
                                        <span><Image src={'/images/Auth/google-icon.svg'} alt={'Create User'} width={30}
                                                     height={30}/></span>
                                    </button>
                                    <button
                                        className={[classes.Create_button].join(' ')}
                                        type={'submit'}>
                                        <span>
                                            {loading ? <Spinner size={2} color={`#A71523`}/> : t("button")}
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
