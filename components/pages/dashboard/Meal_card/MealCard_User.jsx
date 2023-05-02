import classes from './Meal_User.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import {toast} from "react-toastify";
//REDUX
import {onInputChange} from "@/redux/slices/Admin/meals-slice";
import {useSelector, useDispatch} from "react-redux";


const MealCardAdmin = ({ID, image, name, protein, calories, fats, carbohydrate, lang}) => {

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
            </div>
        </article>
    )
}
export default MealCardAdmin