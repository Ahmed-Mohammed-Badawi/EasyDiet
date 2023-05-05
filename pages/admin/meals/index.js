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