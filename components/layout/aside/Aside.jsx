import classes from './Aside.module.scss';
import Link from "next/link";
import Image from "next/image";
// IMPORTS
import i18n from "@/i18n";

// HELPERS
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

const Aside = () => {
    //ROUTER
    const router = useRouter();

    // MULTI LANGUAGES
    const {t} = useTranslation();

    // Helpers Functions
    const toggleLanguage = () => {
        let htmlTag;
        if (document) {
            htmlTag = document.querySelector('html');
        }

        if (i18n.language.includes('en')) {
            if (htmlTag) {
                htmlTag.setAttribute('lang', 'ar')
            }
            i18n.changeLanguage('ar')
        } else {
            if (htmlTag) {
                htmlTag.setAttribute('lang', 'en')
            }
            i18n.changeLanguage('en');
        }
    }

    // LOGOUT HANDLER
    const logoutHandler = (event) => {
        event.preventDefault();
        // Clear the cookie by setting its value to an empty string and an expiry date in the past
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });        // Redirect to another page
        router.push('/auth/login').then(() => {
            window.location.reload()
        })
    }

    return (<aside className={classes.Aside} id={`AsideId`}>
        <ul className={classes.Aside_List}>
            <li className={classes.Aside_List__Item}>
                <Link href={'/'} className={router.pathname === '/' ? classes.Active : ''}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Home_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>Home</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'/user/packages'} className={router.pathname === '/user/packages' ? classes.Active : ''}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Packages_Icon.svg'} alt={'Icon'} width={20} height={20}/>
                        </span>
                    <span className={classes.Text}>Bundles</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'/user/menu'} className={router.pathname === '/user/menu' ? classes.Active : ''}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Meals_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>MENU</span>
                </Link></li>
            {/*<li className={classes.Aside_List__Item}>*/}
            {/*    <Link href={'/about'} className={router.pathname === '/about' ? classes.Active : ''}>*/}
            {/*            <span className={classes.Image_Container}>*/}
            {/*                <Image src={'/images/About_Icon.svg'} alt={'Icon'} width={30} height={20}/>*/}
            {/*            </span>*/}
            {/*        <span className={classes.Text}>About</span>*/}
            {/*    </Link></li>*/}
            {/*<li className={classes.Aside_List__Item}>*/}
            {/*    <Link href={'/user/profile'} className={router.pathname === '/user/profile' ? classes.Active : ''}>*/}
            {/*            <span className={classes.Image_Container}>*/}
            {/*                <Image src={'/images/Users_Icon.svg'} alt={'Icon'} width={30} height={20}/>*/}
            {/*            </span>*/}
            {/*        <span className={classes.Text}>PROFILE</span>*/}
            {/*    </Link></li>*/}
            <li className={classes.Aside_List__Item}>
                <Link href={'/user/my_subscription'}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Subscription_Icon.svg'} alt={'Icon'} width={20} height={20}/>
                        </span>
                    <span className={classes.Text}>My Subscription</span>
                </Link></li>
            {/*<li className={classes.Aside_List__Item}>*/}
            {/*    <Link href={'#'}>*/}
            {/*            <span className={classes.Image_Container}>*/}
            {/*                <Image src={'/images/Doctor_Icon.svg'} alt={'Icon'} width={30} height={20}/>*/}
            {/*            </span>*/}
            {/*        <span className={classes.Text}>nutrition specialist</span>*/}
            {/*    </Link></li>*/}
            <li className={classes.Aside_List__Item}>
                <Link href={'/admin/dashboard'}
                      className={router.pathname === '/admin/dashboard' ? classes.Active : ''}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/dashboard.png'} alt={'Icon'} width={20} height={20}/>
                        </span>
                    <span className={classes.Text}>Dashboard</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'/admin/packages'} className={router.pathname === '/admin/packages' ? classes.Active : ''}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Packages_Icon.svg'} alt={'Icon'} width={20} height={20}/>
                        </span>
                    <span className={classes.Text}>Packages</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'/admin/meals'} className={router.pathname === '/admin/meals' ? classes.Active : ''}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Meals_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>Meals</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'/admin/users'} className={router.pathname === '/admin/users' ? classes.Active : ''}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Users_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>Users</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link href={'/admin/reports'} className={router.pathname === '/admin/reports' ? classes.Active : ''}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Reports_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={classes.Text}>Reports</span>
                </Link></li>
            <li className={classes.Aside_List__Item}>
                <Link onClick={(event) => logoutHandler(event)} href={'/auth/login'} className={classes.ActiveLogout}>
                        <span className={classes.Image_Container}>
                            <Image src={'/images/Logout_Icon.svg'} alt={'Icon'} width={30} height={20}/>
                        </span>
                    <span className={[classes.Logout_Text, classes.Text].join(' ')}>Logout</span>
                </Link></li>
        </ul>
        {/*<div className={classes.Aside_Options}>*/}
        {/*    <button onClick={toggleLanguage}>*/}
        {/*        {i18n?.language && i18n.language.includes('en') ? (*/}
        {/*            <>*/}
        {/*                <Image src={'/images/Arabic_Icon.svg'} alt={'Arabic icon'} width={30} height={20}/>*/}
        {/*                <span style={{fontFamily: `var(--font-almarai)`}}>العربية</span>*/}
        {/*            </>*/}
        {/*        ) : (*/}
        {/*            <>*/}
        {/*                <Image src={'/images/English_Icon.svg'} alt={'Arabic icon'} width={30} height={20}/>*/}
        {/*                <span>ENGLISH</span>*/}
        {/*            </>*/}
        {/*        )}*/}
        {/*    </button>*/}
        {/*</div>*/}
    </aside>)
}
export default Aside;