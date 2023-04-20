import classes from '@/styles/pages/user/choose_starting_date.module.scss';
import Image from "next/image";
import CustomSelectDays from "@/components/pages/user/custom-select-days";
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const Choose_Starting_Date = () => {

    //REDUX
    const dispatch = useDispatch();
    const {userId, package: {id, friday, language}, selectedDay, selectedMonth} = useSelector(state => state.subscription_user)

    // HANDLERS
    const submitHandler = async (event) => {
        // STOP RELOADING
        event.preventDefault();
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);

        try {
            axios.post(`https://api.easydietkw.com/api/v1/bundle/subscripe`,
            {
                clientId: userId,
                bundleId: id,
                startingAt: createDate(selectedDay?.value, selectedMonth?.value),
                renewFlag: false,
                lang: language
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data)
                })
        }catch (e) {
            toast.error(e.response?.data?.message || e.message)
        }
    }

    function createDate(day, month) {
        const year = new Date().getFullYear(); // get current year
        return new Date(year, month - 1, day);
    }


    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>CHOOSE STARTING DATE</h1>
                    <form onSubmit={submitHandler}>
                        <div className={classes.InputsContainer}>
                            <div className={[classes.InputGroup].join(' ')}>
                                <CustomSelectDays />
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                Continue
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Choose_Starting_Date;