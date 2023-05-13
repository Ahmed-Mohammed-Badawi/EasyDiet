import classes from './Meal_Add.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";
//REDUX
import {onInputChange} from "@/redux/slices/user/daymeals_slice";
import {useSelector, useDispatch} from "react-redux";
// LANGUAGE
import {useTranslation} from "react-i18next";


const MealCardAdmin = ({ID, image, name, protein, calories, fats, carbohydrate, lang}) => {
    // ROUTER
    const router = useRouter();

    //REDUX
    const dispatch = useDispatch();
    const {selectedMeals} = useSelector(state => state.daymeals_user);

    // LANGUAGE
    const {t} = useTranslation('chooseDayMeals');

    // ADD HANDLER
    const addHandler = async () => {

        // Make a copy from the meals
        const mealsCopy = [...selectedMeals];

        // find the meal by index
        const index = mealsCopy.findIndex((meal) => meal.id === ID);

        if(index !== -1){
            // add one
            mealsCopy[index] = {...mealsCopy[index], number: mealsCopy[index].number + 1}
            dispatch(onInputChange({
                key: 'selectedMeals',
                value: mealsCopy
            }))
        }else {
            dispatch(onInputChange({
                key: 'selectedMeals',
                value: [...mealsCopy, {image: image, name: name, id: ID, number: 1}]
            }))
        }
    }

    return (
        <article className={classes.Card}>
            <div className={classes.Image_Container}>
                <Image src={image || '/images/no_image.webp'} alt={'Meal Image'} width={360} height={250}/>
            </div>
            <div className={classes.Content_Container}>
                <h2>{name}</h2>
                <div className={classes.Info_Container}>
                    <div className={classes.Info_Item}>
                        <h3>{t("calories")}</h3>
                        <span>{calories} cal</span>
                    </div>
                    <div className={classes.Info_Item}>
                        <h3>{t("protein")}</h3>
                        <span>{protein} {t("gram")}</span>
                    </div>
                    <div className={classes.Info_Item}>
                        <h3>{t("fat")}</h3>
                        <span>{fats} {t("gram")}</span>
                    </div>
                    <div className={classes.Info_Item}>
                        <h3>{t("carbohydrate")}</h3>
                        <span>{carbohydrate} {t("gram")}</span>
                    </div>
                </div>
                <div className={classes.Buttons}>
                    <button title={'Select'}
                        onClick={() => addHandler(ID)}>
                        <Image src={'/images/Global/Add_Icon.svg'} alt={'Add'} width={18} height={18}/>
                    </button>
                </div>
            </div>
        </article>
    )
}
export default MealCardAdmin