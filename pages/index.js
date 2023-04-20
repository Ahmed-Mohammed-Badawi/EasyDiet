import Head from 'next/head'
import classes from '@/styles/pages/global/home.module.scss';
// NEW
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {extractTokenFromCookie} from "@/helpers/extractToken";

export default function Home() {
    // ROUTER
    const router = useRouter();
    const [isThereToken, setIsThereToken] = useState(false);


    const {t} = useTranslation();

    // EFFECT TO SEE IF THERE IS A COOKIE
    useEffect(() => {
        const token = extractTokenFromCookie(document.cookie);

        if(token){
            setIsThereToken(token)
        }

    }, [])


    return (
        <>
            <div className={classes.Container}>
                <div className={classes.Main}>
                    <div className={classes.Right}>
                        <div className={classes.Logo} onClick={() => router.push('/')}>
                            <Image src={'/images/Auth/logo.svg'} alt={'logo'} width={70} height={50}/>
                        </div>
                        <div className={classes.Content}>
                            <h1 className={classes.Header}>EASY DEIT</h1>
                            <p className={classes.Paragraph}>
                                Lorem ipsum dolor sit amet, consetetur.Lorem ipsum dolor sit amet, consetetur.Lorem
                                ipsum
                                dolor sit amet, consetetur.Lorem ipsum dolor sit amet, consetetur.Lorem ipsum dolor sit
                                amet, consetetur.Lorem ipsum dolor sit amet, consetetur.
                            </p>
                            <button className={classes.Button} onClick={() => router.push('/user/packages')}>Packages
                            </button>
                        </div>
                    </div>
                    <div className={classes.Left}>
                        <div className={classes.Buttons}>
                            <button title={'Profile'} onClick={() => {
                                if(isThereToken){
                                    router.push('/user/profile')
                                }else{
                                    router.push('/auth/login')
                                }
                            }}>
                                <Image src={'/images/Global/Login_Icon.svg'} alt={'login'} width={22} height={22}/>
                            </button>
                            <button title={'About us'} onClick={() => router.push('/about')}>
                                <Image src={'/images/Global/About_Icon.svg'} alt={'login'} width={24} height={24}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
