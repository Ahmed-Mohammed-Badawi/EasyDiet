import classes from './Meal_Edit.module.scss';
import Image from "next/image";

const MealCardAdmin = () => {
    return (
        <article className={classes.Card}>
            <div className={classes.Image_Container}>
                <Image src={'/images/Auth/dl.beatsnoop.com-3000-H6LQJm7ZRo.png'} alt={'Meal Image'} width={360} height={250} />
            </div>
            <div className={classes.Content_Container}>
                <h2>Pizza Margarita</h2>
                <div className={classes.Info_Container}>
                    <div className={classes.Info_Item}>
                        <h3>Protein</h3>
                        <span>35g</span>
                    </div>
                    <div className={classes.Info_Item}>
                        <h3>vitamins</h3>
                        <span>35g</span>
                    </div>
                    <div className={classes.Info_Item}>
                        <h3>Fat</h3>
                        <span>35g</span>
                    </div>
                    <div className={classes.Info_Item}>
                        <h3>Carbohydrate</h3>
                        <span>35g</span>
                    </div>
                </div>
                <div className={classes.Buttons}>
                    <button>
                        <Image src={'/images/Delete_Icon.svg'} alt={'Delete'} width={18} height={18} />
                    </button>
                    <button>
                        <Image src={'/images/Edit_Icon.svg'} alt={'Edit'} width={18} height={18} />
                    </button>
                </div>
            </div>
        </article>
    )
}
export default MealCardAdmin