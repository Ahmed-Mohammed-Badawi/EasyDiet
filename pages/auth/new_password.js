import classes from "@/styles/pages/new_password.module.scss";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/layout/spinner/Spinner";
import {useState} from "react";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {toast} from "react-toastify";

const NewPassword = () => {

    // ROUTER
    const router = useRouter();
    // LANGUAGE
    const {t} = useTranslation('newPassword');
    // STATES
    const [loading, setLoading] = useState(false);

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
                            <div className={classes.Input_Group}>
                                <div className={classes.InputBorderContainer}>
                                    <input type={'password'} id={'new_password'} name={'new_password'} placeholder={t("placeholder1")}/>
                                </div>
                            </div>
                            <div className={classes.Input_Group}>
                                <div className={classes.InputBorderContainer}>
                                    <input type={'password'} id={'confirm_password'} name={'confirm_password'} placeholder={t("placeholder2")}/>
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