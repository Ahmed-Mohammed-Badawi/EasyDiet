import classes from './SelectedMealCard.module.scss'
import Image from "next/image";
import {onInputChange} from "@/redux/slices/user/daymeals_slice";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

const SelectedMeal = ({ID, image, name, number}) => {
    // ROUTER
    const router = useRouter();

    //REDUX
    const dispatch = useDispatch();
    const {selectedMeals} = useSelector(state => state.daymeals_user);


    // Delete Handler
    const deleteHandler = () => {
        // Make a copy from the meals
        const mealsCopy = [...selectedMeals];

        // find the meal by index
        const index = mealsCopy.findIndex((meal) => meal.id === ID);

        if (index !== -1 && mealsCopy[index].number > 1) {
            // add one
            mealsCopy[index] = {...mealsCopy[index], number: mealsCopy[index].number - 1}
            dispatch(onInputChange({
                key: 'selectedMeals',
                value: mealsCopy
            }))
        } else {
            mealsCopy.splice(index, 1);

            dispatch(onInputChange({
                key: 'selectedMeals',
                value: mealsCopy
            }))
        }

    }


    return (
        <>
            <div className={classes.SelectedMeal}>
                <div className={classes.Top}>
                    <div className={classes.Image}>
                        <Image src={image || '/images/no_image.webp'} alt={'Meal Image'} width={360} height={250}/>
                    </div>
                    <button onClick={deleteHandler}>
                        <Image src={'/images/Delete_Icon.svg'} alt={'delete'} width={20} height={20}/>
                    </button>
                </div>
                <div className={classes.Bottom}>
                    <h3>Meal Name</h3>
                    <span>{number}</span>
                </div>
            </div>
        </>
    )
}

export default SelectedMeal;