import classes from '@/styles/pages/admin/meals.module.scss'
import Image from "next/image";
// IMPORTS
import MealCard from "@/components/pages/dashboard/Meal_card/MealCard_Edit";

const Meals = () => {
    return (
        <>
            <div className={classes.Main}>
                <div className={classes.Top}>
                    <button>
                        <Image src={'/images/Add_Icon.svg'} alt={'Add Icon'} width={18} height={18} />
                        <span>Create Meal</span>
                    </button>
                </div>
                <div className={classes.Bottom}>
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                    <MealCard />
                </div>
            </div>
        </>
    )
}
export default Meals