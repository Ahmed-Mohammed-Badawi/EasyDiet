import classes from '@/styles/pages/admin/packages.module.scss'
import {useRouter} from "next/router";
// IMPORTS
import PackageCard_Edit from "@/components/pages/dashboard/Package_card/PackageCard_Edit";
import Image from "next/image";
import {useEffect} from "react";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {onInputChange} from '@/redux/slices/Admin/packages-slice';
// LANGUAGE
import {useTranslation} from "react-i18next";


const Packages = () => {
    // ROUTER
    const router = useRouter();

    // LANGUAGE
    const {t} = useTranslation('managePages')

    //REDUX
    const dispatch = useDispatch();
    const {packages} = useSelector(state => state.packages);

    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);
        // LOGIC
        try {
            axios.get(`https://api.easydietkw.com/api/v1/get/bundles`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    dispatch(onInputChange({key: 'packages', value: res.data.bundles}))
                })
        } catch (err) {
            toast.error(err.response?.data?.message || err.message)
        }

    }, [dispatch])

    return (
        <>
            <div className={classes.Main}>
                <div className={classes.Top}>
                    <button onClick={() => router.push(`/admin/create/create_package`)}>
                        <Image src={'/images/Add_Icon.svg'} alt={'Add Icon'} width={18} height={18}/>
                        <span>{t("createPackage")}</span>
                    </button>
                </div>
                <div className={classes.Bottom}>
                    {packages && packages.map((cur) => {
                        return (
                            <PackageCard_Edit
                                ID={cur._id}
                                key={cur._id}
                                name={cur.bundleName}
                                meals={cur.mealsNumber}
                                price={cur.bundlePrice}
                                snacks={cur.snacksNumber}
                                fridays={cur.fridayOption}
                                offers={cur.bundleOffer}
                                time={cur.timeOnCard}
                                language={cur.lang}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Packages


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

    if (!tokenInfo || tokenInfo.role !== 'admin' || tokenInfo.active === false) {
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