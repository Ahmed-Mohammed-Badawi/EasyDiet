import classes from './MySubscription.module.scss';
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

const MySubscription = () => {

    // ROUTER
    const router = useRouter();

    // LANGUAGE
    const {t} = useTranslation('mySubscription');

    return (
        <>
            <div className={classes.MySubscription} data-title={t("title1")}>
                <p>{t("notLoadedMessage")}</p>
                <button onClick={() => router.push('/user/packages')}>{t("button")}</button>
            </div>
        </>
    )
}

export default MySubscription;