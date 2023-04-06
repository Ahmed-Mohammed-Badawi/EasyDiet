import classes from "@/styles/pages/register.module.scss";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
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
                            <h2 className={classes.Heading_2}>LOGIN</h2>
                            <div className={classes.Input_Group}>
                                <label htmlFor={'email'}>EMAIL</label>
                                <input type={'email'} id={'email'} name={'email'}/>
                            </div>
                            <div className={classes.Input_Group}>
                                <label htmlFor={'password'}>PASSWORD</label>
                                <input type={'password'} id={'password'} name={'password'}/>
                            </div>
                            <div className={classes.Form_buttons}>
                                <div className={classes.Links}>
                                    <Link href={'/auth/register'}>
                                        &#8592; have no account? register
                                    </Link>
                                    <Link href={'/auth/reset_password'}>
                                        &#8592; Forgot Password
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
                                        <span>LOGIN</span>
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
        </>

    )
}
export default Login