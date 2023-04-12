import Head from 'next/head'
import classes from '@/styles/pages/admin/dashboard.module.scss';
// NEW
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";

export default function Home() {

    const {t} = useTranslation();

    return (
        <>
            <div className={classes.Content}>

            </div>
        </>
    )
}
