import classes from './overlay.module.scss'
import InputsContainer from "@/components/pages/dashboard/ChangeUser_Name/inputsContainer";
const Overlay = ({children , active, clicked}) => {
    return (
        <div onClick={(e) => {
            if(Array.from(e.target.classList).includes(classes.Overlay)){
                clicked()
            }
        }
        } className={[classes.Overlay, active ? classes.Active : ''].join(' ')}>
            {children}
        </div>
    )
}
export default Overlay