import Head from 'next/head'
// NEW
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {extractTokenFromCookie} from "@/helpers/extractToken";

//STYLE
import classes from '@/styles/pages/global/home.module.scss'

export default function Home({isAuthenticated, userData}) {
    console.log(isAuthenticated, userData)

    // ROUTER
    const router = useRouter();
    const [language, setLanguage] = useState('EN')

    const {t} = useTranslation('home');

    return (
        <>
            <div className={classes?.Container}>
                <div className={classes?.Main}>
                    <div className={classes?.Right}>
                        <div className={classes?.Logo} onClick={() => router.push('/')}>
                            <Image src={'/images/Auth/logo.svg'} alt={'logo'} width={70} height={50}/>
                        </div>
                        <div className={classes?.Content}>
                            <h1 className={classes?.Header}>{t('title')}</h1>
                            <p className={classes?.Paragraph}>
                                {t('paragraph')}
                            </p>
                            <button className={classes?.Button} onClick={() => router.push('/user/packages')}>
                                {t('button')}
                            </button>
                        </div>
                    </div>
                    <div className={classes?.Left}>
                        <div className={classes?.Buttons}>
                            <button title={t('login')} onClick={() => {
                                if (isAuthenticated && userData?.decodedToken?.role === 'admin') {
                                    router.push('/admin/dashboard')
                                } else if (isAuthenticated && userData?.decodedToken?.role === 'manager') {
                                    router.push('/admin/branch')
                                } else if (isAuthenticated && userData?.decodedToken?.role === 'diet specialist') {
                                    router.push('/doctor')
                                } else if (isAuthenticated && userData?.decodedToken?.role === 'client') {
                                    router.push('/user/my_subscription')
                                } else {
                                    router.push('/auth/login')
                                }
                            }}>
                                <Image src={'/images/Global/Login_Icon.svg'} alt={'login'} width={22} height={22}/>
                            </button>
                            <button title={t('aboutTitle')} onClick={() => router.push('/about')}>
                                <Image src={'/images/Global/About_Icon.svg'} alt={'login'} width={24} height={24}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
