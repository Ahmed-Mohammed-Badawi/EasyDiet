import {useState} from "react";
import classes from "@/styles/pages/login.module.scss";
import Link from "next/link";
import Image from "next/image";
import {toast} from "react-toastify";
import axios from "axios";
import {useRouter} from "next/router";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://api.easydietkw.com/api/v1/login",
                {
                    username: username,
                    password: password,
                }
            )

            document.cookie = `token=${response.data.token}; path=/;`;

            // Redirect based on the user's role
            if (response.data.user.role === "admin") {
                router.push(`/admin/dashboard`);
            } else if (response.data.user.role === "user") {
                router.push(`/user/dashboard?token=${'asdasd'}`);
            }

            // Show success message
            toast.success(response.data.message);
        } catch (error) {
            // Show error message
            toast.error("Invalid username or password");
        }
    };


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
                        <form className={classes.Form} onSubmit={handleFormSubmit}>
                            <h2 className={classes.Heading_2}>LOGIN</h2>
                            <div className={classes.Input_Group}>
                                <label htmlFor={'email'}>USERNAME || EMAIL</label>
                                <input onChange={(e) => setUsername(e.target.value)} type={'username'} id={'email'} name={'email'}/>
                            </div>
                            <div className={classes.Input_Group}>
                                <label htmlFor={'password'}>PASSWORD</label>
                                <input onChange={(e) => setPassword(e.target.value)} type={'password'} id={'password'} name={'password'}/>
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
                                        <span className={classes.Next_Span}><Image src={'/images/Auth/next-icon.svg'} alt={'Create User'} width={20}
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