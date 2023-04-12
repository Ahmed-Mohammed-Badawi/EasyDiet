import {useEffect} from "react";
import classes from '@/styles/pages/admin/meals.module.scss'
import Image from "next/image";
// IMPORTS
import MealCard from "@/components/pages/dashboard/Meal_card/MealCard_Edit";
import axios from "axios";
// REDUX
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/meals-slice';
import {useRouter} from "next/router";

const Meals = () => {

    //ROUTER
    const router = useRouter();

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Y1MTlhNzdiMDU0ZDM4OGM5ZGI5ZjkiLCJyb2xlIjoiYWRtaW4iLCJhY3RpdmUiOnRydWUsImlhdCI6MTY4MTI1NzYzOSwiZXhwIjoxNjgxMzQ0MDM5fQ.AVgvwqtT3u8B9w5tRTeAE0pAXK-GSdoKZOqsKU-uOtg`;

    // REDUX
    const dispatch = useDispatch();
    const {meals} = useSelector(state => state.meals);

    // EFFECT TO GET THE MEALS WHEN PAGE LOAD
    useEffect(() => {
        axios.get(`https://api.easydietkw.com/api/v1/get/all/meals`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                page: 1,
            }
        })
            .then(res => {
                // SET THE MEALS IN THE STATE
                dispatch(onInputChange({key: 'meals', value: res.data.data.meals}))
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <>
            <div className={classes.Main}>
                <div className={classes.Top}>
                    <button onClick={() => router.push(`/admin/create/create_meal`)}>
                        <Image src={'/images/Add_Icon.svg'} alt={'Add Icon'} width={18} height={18}/>
                        <span>Create Meal</span>
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