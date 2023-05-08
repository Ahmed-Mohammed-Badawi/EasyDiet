import {useEffect} from "react";
import classes from '@/styles/pages/admin/meals.module.scss'
import Image from "next/image";
// IMPORTS
import MealCard from "@/components/pages/dashboard/Meal_card/MealCard_Edit";
import axios from "axios";
// REDUX
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/Admin/meals-slice';
import {useRouter} from "next/router";
import {extractTokenFromCookie} from "@/helpers/extractToken";
// LANGUAGE
import {useTranslation} from "react-i18next";
import Head from "next/head";


const Meals = () => {
    //ROUTER
    const router = useRouter();

    // LANGUAGE
    const {t} = useTranslation('managePages')

    // REDUX
    const dispatch = useDispatch();
    const {meals} = useSelector(state => state.meals);

    // EFFECT TO GET THE MEALS WHEN PAGE LOAD
    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        axios.get(`https://api.easydietkw.com/api/v1/get/all/meals`, {
            params: {
                page: 1,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE MEALS IN THE STATE
                dispatch(onInputChange({key: 'meals', value: res.data.data.meals}))
            })
            .catch(err => console.log(err))
    }, [dispatch])


    return (
        <>
            {/*SEO OPTIMIZATION*/}
            <Head>
                <title>EasyDiet | Meals</title>
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
            <div className={classes.Main}>
                <div className={classes.Top}>
                    <button onClick={() => router.push(`/admin/create/create_meal`)}>
                        <Image src={'/images/Add_Icon.svg'} alt={'Add Icon'} width={18} height={18}/>
                        <span>{t("createMeal")}</span>
                    </button>
                </div>
                <div className={classes.Bottom}>
                    {meals.map(item => {
                        return (
                            <MealCard
                                key={item._id}
                                ID={item._id}
                                image={item.imagePath}
                                name={item.mealTitle}
                                calories={item.calories}
                                carbohydrate={item.carbohydrates}
                                protein={item.protine}
                                fats={item.fats}
                                lang={item.lang}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
export default Meals


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

    if (!tokenInfo || tokenInfo.role !== 'admin' || tokenInfo.active === false) {
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