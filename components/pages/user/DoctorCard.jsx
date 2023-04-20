import classes from './DoctorCard.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";
import {onInputChange} from '@/redux/slices/user/nutritionspecialist_slice'
import {useDispatch, useSelector} from "react-redux";

const DoctorCard = ({userId, nutrition_specialistId}) => {

    //ROUTER
    const router = useRouter();

    //REDUX
    const dispatch = useDispatch();
    const {} = useSelector(state => state.nutrition_specialist)

    return (
        <>
            <article className={classes.DoctorCard}>
                <Image src={'/images/home_background.png'} alt={'Doctor Image'} width={280} height={280} />
                <div className={classes.Overlay}>
                    <div className={classes.Top}>
                        <button>
                            <Image src={'/images/Global/Whatsapp_Icon.svg'} alt={'WhatsApp'} height={22} width={22} />
                        </button>
                        <button
                            onClick={() => {
                                dispatch(onInputChange({key: 'nutrition_specialistId', value: nutrition_specialistId}));
                                router.push(`/user/send_message`)
                            }}
                        >
                            <Image src={'/images/Global/Chat_Icon.svg'} alt={'WhatsApp'} height={22} width={22} />
                        </button>
                    </div>
                    <div className={classes.Bottom}>
                        <h4>Ahmed Mohammed</h4>
                    </div>
                </div>
            </article>
        </>
    )
}

export default DoctorCard;