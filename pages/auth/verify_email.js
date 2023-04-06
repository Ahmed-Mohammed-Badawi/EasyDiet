import classes from "@/styles/pages/verify_email.module.scss";
import Link from "next/link";
import Image from "next/image";

const VerifyEmail = () => {
    return (
        <>
            <main className={classes.Main}>
                <div className={classes.Content}>
                    <div>
                        <Link href={'/'} passHref>
                            <Image src={'/images/Auth/logo.svg'} alt={'logo'} width={100} height={100}/>
                        </Link>
                    </div>
                    <div className={classes.Container}>
                        <div className={classes.Container_Text}>
                            <h1>EASY DIET</h1>
                            <p>BE ONE OF US</p>
                        </div>
                        <form className={classes.Form}>
                            <h2 className={classes.Heading_2}>Verify Email</h2>
                            <button type={'button'} className={classes.Resend_Code}>
                                RESEND CODE
                            </button>
                            <div className={classes.Input_Group}>
                                <label htmlFor={'CODE'}>CODE</label>
                                <input type={'text'} id={'CODE'} name={'CODE'}/>
                            </div>

                            <div className={classes.Form_buttons}>
                                <div className={classes.Links}>
                                    <Link href={'/auth/login'}>
                                        &#8592; Back to login
                                    </Link>
                                </div>
                                <div className={classes.Buttons_Container}>
                                    <button
                                        className={[classes.Create_button].join(' ')}
                                        type={'submit'}>
                                        <span>CONFIRM</span>
                                        <span><Image src={'/images/Auth/next-icon.svg'} alt={'Create User'} width={20}
                                                     height={20}/></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Link href={'/'} passHref>
                    <button className={classes.Home_Button}>
                        <span><Image src={'/images/Auth/home-icon.svg'} alt={'home icon'} width={30}
                                     height={30}/></span>
                    </button>
                </Link>
            </main>
        </>)
}
export default VerifyEmail