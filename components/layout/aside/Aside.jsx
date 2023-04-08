import classes from './Aside.module.scss';
import Link from "next/link";
import Image from "next/image";
// IMPORTS
import i18n from "@/i18n";

// HELPERS
import {useTranslation} from "react-i18next";

const Aside = () => {
    // MULTI LANGUAGES
    const {t} = useTranslation();

    // Helpers Functions
    const toggleLanguage = () => {
        console.log(i18n.language)
        i18n.language.includes('en') ? i18n.changeLanguage('ar') : i18n.changeLanguage('en');
    }

    return (<aside className={classes.Aside} id={`AsideId`}>
        <ul className={classes.Aside_List}>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Home_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>Home</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/About_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>About</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Packages_Icon.svg'} alt={'Icon'} width={20} height={20}/>
                        </span>
                    <span className={classes.Text}>Packages</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Meals_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>Meals</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Users_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>PROFILE</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Subscription_Icon.svg'} alt={'Icon'} width={20} height={20}/>
                        </span>
                    <span className={classes.Text}>My Subscription</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Doctor_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>nutrition specialist</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Users_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>Users</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Reports_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>Reports</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'#'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Logout_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={[classes.Logout_Text, classes.Text].join(' ')}>Logout</span>
                </Link></li>
        </ul>
        <div className={classes.Aside_Options}>
            <button onClick={toggleLanguage}>
                <Image src={'/images/Arabic_Icon.svg'} alt={'Arabic icon'} width={30}
                       height={20}/> ENGLISH
            </button>
        </div>
    </aside>)
}
export default Aside;