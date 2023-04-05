import Head from 'next/head'
// NEW
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";

export default function Home() {

    const {t} = useTranslation();

    return (
        <>
            <p>{t('hello')}</p>
            <p>{t('world')}</p>
            <button onClick={() => {
                i18n.changeLanguage('ar')
            }}>
                AR
            </button>
            <button onClick={() => {
                i18n.changeLanguage('en')
            }}>
                En
            </button>
        </>
    )
}
