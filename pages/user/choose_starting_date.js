import classes from '@/styles/pages/user/choose_starting_date.module.scss';
import Image from "next/image";
import CustomSelectDays from "@/components/pages/user/custom-select-days";
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const Choose_Starting_Date = () => {

    //REDUX
    const dispatch = useDispatch();
    const {userId, package: {id, friday, language}, selectedDay, selectedMonth} = useSelector(state => state.subscription_user)

    // LANGUAGE
    const {t} = useTranslation('chooseStartingDate');

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
                    <h1>{t("title")}</h1>
                    <form onSubmit={submitHandler}>
                        <div className={classes.InputsContainer}>
                            <div className={[classes.InputGroup].join(' ')}>
                                <CustomSelectDays dayText={t("startingDay")} monthText={t("startingMonth")}  />
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                {t("button")}
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

export const getServerSideProps = async (ctx) => {
    // GET THE TOKEN FROM THE REQUEST
    const {token} = ctx.req.cookies;

    let tokenInfo;
    if (token) {
        await axios.get(`https://api.easydietkw.com/api/v1/get/verify/token`, {
            params: {
                token: token,
            }
        })
            .then(res => tokenInfo = res.data.decodedToken)
            .catch(err => console.log(err))
    }

    if (!tokenInfo || tokenInfo.role !== 'client' || tokenInfo.active === false) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    };
};
