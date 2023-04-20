import classes from './SelectedMeals.module.scss';
import SelectedMealCard from "@/components/pages/user/SelectedMealCard";
import Image from "next/image";
const SelectedMeals = ({isActive, selectedMeals, closeTheOverlay}) => {
    return (
        <>
            <div className={[classes.SelectedMeals, isActive? classes.isActive : ''].join(' ')}>
                <h2>Selected Meals</h2>
                <button className={classes.Close} onClick={closeTheOverlay}>
                    <Image src={'/images/Auth/next-icon.svg'} alt={'Close'} width={20} height={20} />
                </button>
                <div className={classes.Meals_Container}>
                    {
                        selectedMeals?.length > 0 ? selectedMeals.map((meal, index) => {
                            return (
                                <SelectedMealCard ID={meal.id} key={index} number={meal.number}/>
                            )
                        }): (
                            <p>No Meals Selected Yet</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default SelectedMeals;