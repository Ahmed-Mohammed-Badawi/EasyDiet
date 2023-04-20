import classes from './Meal_Add.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";
//REDUX
import {onInputChange} from "@/redux/slices/user/daymeals_slice";
import {useSelector, useDispatch} from "react-redux";
import selectedMeals from "@/components/pages/user/SelectedMeals";


const MealCardAdmin = ({ID, image, name, protein, calories, fats, carbohydrate, lang}) => {
    // ROUTER
    const router = useRouter();

    //REDUX
    const dispatch = useDispatch();
    const {selectedMeals} = useSelector(state => state.daymeals_user);

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
                        <h3>calories</h3>
                        <span>{calories}g</span>
                    </div>
                    <div className={classes.Info_Item}>
                        <h3>Protein</h3>
                        <span>{protein}g</span>
                    </div>
                    <div className={classes.Info_Item}>
                        <h3>Fat</h3>
                        <span>{fats}g</span>
                    </div>
                    <div className={classes.Info_Item}>
                        <h3>Carbohydrate</h3>
                        <span>{carbohydrate}g</span>
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