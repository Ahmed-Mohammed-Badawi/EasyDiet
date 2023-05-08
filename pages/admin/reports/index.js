import {useState} from "react";
import classes from '@/styles/pages/admin/reports.module.scss'
import Image from "next/image";
// IMPORT
import CustomSelectReports from "@/components/pages/dashboard/custom-select-reports";
import axios from "axios";
// LANGUAGE
import {useTranslation} from "react-i18next";
import Spinner from "@/components/layout/spinner/Spinner";
import Head from "next/head";


const Reports = () => {

    // LANGUAGE
    const {t} = useTranslation('reports')

    // STATES
    const [loading, setLoading] = useState(false);

    return (
        <>
            {/*SEO OPTIMIZATION*/}
            <Head>
                <title>EasyDiet | Reports</title>
                <meta name="description" content="Discover EasyDiet's healthy meal options that have been satisfying customers for over five years. Our experienced chefs prepare each meal with fresh, locally-sourced ingredients to ensure that you get the best quality and flavor. Choose EasyDiet for convenient and delicious meals that leave you feeling energized and healthy."/>
                <meta name="keywords" content="healthy meals, meal delivery, fresh ingredients, locally-sourced, convenient meal options, energy-boosting, nutritious food, easy ordering, delicious and healthy, meal plans"/>
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
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>{t("title")}</h1>
                    <form>
                        <div className={classes.InputsContainer}>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'user_role'}>{t("type")}</label>
                                <CustomSelectReports/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'report_start_date'}>{t("start")}</label>
                                <input type={'date'} name={'report_start_date'} id={'report_start_date'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'report_end_date'}>{t("end")}</label>
                                <input type={'date'} name={'report_end_date'} id={'report_end_date'}/>
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                {loading ? <Spinner size={2} color={`#ffffff`}/> : t("button")}
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default Reports;

export const getServerSideProps = async (ctx) => {
    // GET THE TOKEN FROM THE REQUEST
    const {token} = ctx.req.cookies;

    let tokenInfo;
    if (token) {
        await axios.get(`https://api.easydietkw.com/api/v1/get/verify/token`, {
            params: {
                token: token,
            }
        })
            .then(res => tokenInfo = res.data.decodedToken)
            .catch(err => console.log(err))
    }

    if (!tokenInfo || (tokenInfo.role !== 'admin' && tokenInfo.role !== 'manager') || tokenInfo.active === false) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    };
};
