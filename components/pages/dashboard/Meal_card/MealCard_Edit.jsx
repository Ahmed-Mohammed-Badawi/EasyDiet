import classes from './Meal_Edit.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import {toast} from "react-toastify";
//REDUX
import {onInputChange} from "@/redux/slices/Admin/meals-slice";
import {useSelector, useDispatch} from "react-redux";


const MealCardAdmin = ({ID, image, name, protein, calories, fats, carbohydrate, lang}) => {
    // ROUTER
    const router = useRouter();

    //REDUX
    const dispatch = useDispatch();
    const {meals} = useSelector(state => state.meals);

    // DELETE HANDLER
    const deleteHandler = async () => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        if (window.confirm('This Meal Will Be Deleted. Are you sure you want to continue?')) {
            await axios.delete(`https://api.easydietkw.com/api/v1/delete/meal?mealId=${ID}&lang=${lang}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    // Show notification
                    toast.success('Meal Deleted Successfully');
                    // Update the State
                    const updatedItems = meals.filter(item => item._id !== ID);
                    dispatch(onInputChange({key: 'meals', value: updatedItems}))
                })
                .catch(err => {
                    console.log(err)
                })
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
                    <button>
                        <Image src={'/images/Delete_Icon.svg'} onClick={deleteHandler} alt={'Delete'} width={18}
                               height={18}/>
                    </button>
                    <button
                        onClick={() => router.push(`/admin/edit/edit_meal?mealId=${ID}&lang=${lang}&mealName=${name}`)}>
                        <Image src={'/images/Edit_Icon.svg'} alt={'Edit'} width={18} height={18}/>
                    </button>
                </div>
            </div>
        </article>
    )
}
export default MealCardAdmin