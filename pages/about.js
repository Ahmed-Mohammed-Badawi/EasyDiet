import Image from "next/image";
import classes from '@/styles/pages/global/about.module.scss';
import {useRouter} from "next/router";
// LANGUAGE
import {useTranslation} from "react-i18next";


const About = () => {
    const router = useRouter();

    // LANGUAGE
    const {t} = useTranslation('about')


    return (
        <>
            <div className={classes.Container}>
                <main className={classes.Main}>
                    <div className={classes.Top}>
                        <div className={classes.Logo} onClick={() => router.push('/')}>
                            <Image src={'/images/Auth/logo.svg'} alt={'logo'} width={70} height={40}/>
                        </div>
                        <button className={classes.Go_Back} onClick={() => router.push('/')}>
                            <Image src={'/images/Auth/next-icon.svg'} alt={'go back to home'} width={25} height={25}/>
                        </button>
                    </div>
                    <div className={classes.Bottom}>
                        <h1 className={classes.Header}>{t("title")}</h1>
                        <div className={classes.Content}>
                            <div className={classes.Content_Text}>
                                <p>{t("p1")}</p>
                                <p>{t("p2")}</p>
                                <p>{t("p3")}</p>
                            </div>
                            <div className={classes.Content_Social}>
                                <button>
                                    <Image src={'/images/Global/Facebook_Icon.svg'} alt={'facebook account'} width={25} height={25} />
                                </button>
                                <button>
                                    <Image src={'/images/Global/Whatsapp_Icon.svg'} alt={'facebook account'} width={25} height={25} />
                                </button>
                                <button>
                                    <Image src={'/images/Global/Twitter_Icon.svg'} alt={'facebook account'} width={25} height={25} />
                                </button>
                                <button>
                                    <Image src={'/images/Global/Instagram_Icon.svg'} alt={'facebook account'} width={25} height={25} />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default About;