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
            {/*SEO OPTIMIZATION*/}
            <Head>
                <title>EasyDiet</title>
                <meta name="description" content="EasyDiet has been offering healthy meal options for over 5 years. With a diverse menu of delicious and locally-sourced ingredients, their experienced chefs provide convenient and energizing meals. Experience a healthier lifestyle with EasyDiet."/>
                <meta name="keywords" content="healthy meals, meal delivery, fresh ingredients, locally-sourced, convenient meal options, energy-boosting, nutritious food, easy ordering, delicious and healthy, meal plans, EasyDiet, Easy Diet, EasyDiet Dubai, EasyDiet UAE, EasyDiet Abu Dhabi, EasyDiet Sharjah, EasyDiet Ajman, EasyDiet Fujairah, EasyDiet Ras Al Khaimah, EasyDiet Umm Al Quwain, EasyDiet Al Ain, EasyDiet Al Gharbia, EasyDiet Al Dhafra, EasyDiet Al Ruwais, EasyDiet Al Wathba, EasyDiet Al Khazna, EasyDiet Al Khatim, EasyDiet Al Mirfa, EasyDiet Al Sila, EasyDietKw, EasyDiet-kw, EasyDiet-kw.com, easydietkw.com"/>
                <meta name="author" content="EasyDiet"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="robots" content="index, follow"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="language" content="English"/>
                <meta name="revisit-after" content="7 days"/>
                <meta name="generator" content="EasyDiet"/>
                <meta name="og:title" content="EasyDiet"/>
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://easydietkw.com/" />
                <meta property="og:image" content="/images/Auth/logo.svg" />
                <meta property="og:site_name" content="EasyDiet" />
                <meta property="og:description" content="EasyDiet has been offering healthy meal options for over 5 years. With a diverse menu of delicious and locally-sourced ingredients, their experienced chefs provide convenient and energizing meals. Experience a healthier lifestyle with EasyDiet." />
            </Head>
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
