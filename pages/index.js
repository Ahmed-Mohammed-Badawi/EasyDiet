import Head from 'next/head'
import classes from '@/styles/pages/admin/dashboard.module.scss';
// NEW
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Home() {
    // ROUTER
    const router = useRouter();


    const {t} = useTranslation();

    return (
        <>
            {/*<div className={classes.Content}>*/}
            <div>
                <h1>WELCOME IN EASYDEIT</h1>
                <p>This Page is under Development please go to another page</p>
                <p><Link href={'/auth/login'}>Login</Link></p>
                <p><Link href={'/admin/dashboard'}>Dashboard</Link></p>
            </div>
        </>
    )
}
