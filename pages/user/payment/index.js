import {useState} from "react";
import classes from '@/styles/pages/admin/paymentMethod.module.scss'
import Image from "next/image";
// IMPORT
import CustomSelectReports from "@/components/pages/dashboard/custom-select-payment";
import Spinner from "@/components/layout/spinner/Spinner";
import axios from "axios";

const Reports = () => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>Payment Method</h1>
                    <form>
                        <div className={classes.InputsContainer}>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'payment_method'}>Method</label>
                                <CustomSelectReports/>
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                {loading ? <Spinner size={2} color={`#ffffff`}/> : 'Confirm'}
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default Reports;

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

    if (!tokenInfo || (tokenInfo.role !== 'admin' && tokenInfo.role !== 'manager') || tokenInfo.active === false) {
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
