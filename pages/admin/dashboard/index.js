import {useEffect, useRef, useState} from "react";
import Head from 'next/head'
import classes from '@/styles/pages/admin/dashboard.module.scss';
import {useRouter} from "next/router";
// NEW
import {useTranslation} from "react-i18next";
//TEST
import ProjectsChart from "@/components/pages/dashboard/ProjectsChart";
// IMPORTS
import PackageAdminCard from "@/components/pages/dashboard/Package_card/PackageCard";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";

export default function Dashboard() {
    // ROUTER
    const router = useRouter();

    //STATES
    const [doctors, setDoctors] = useState(0);
    const [meals, setMeals] = useState(0);
    const [packages, setPackages] = useState(0);
    const [topSelling, setTopSelling] = useState([]);
    const [clients, setClients] = useState({
        all: 0,
        active: 0,
        inActive: 0
    })

    // REFS
    const cardContainerRef = useRef();

    const {t} = useTranslation();

    const handleScroll = (event) => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollLeft += event.deltaY;
        }
    };

    //EFFECT TO GET THE DATA OF DASHBOARD
    useEffect(() => {
        const token = extractTokenFromCookie(document.cookie);
        if (token) {
            try {
                // GET THE DASHBOARD DATA
                axios.get(`https://api.easydietkw.com/api/v1/get/stats`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        setPackages(res.data.data.bundlesNumber);
                        setMeals(res.data.data.mealsNumber);
                        setDoctors(res.data.data.specialistsNumber);
                        setTopSelling(res.data.data.bestSeller);
                        setClients({
                            all: res.data.data.clientsStats.all,
                            active: res.data.data.clientsStats.active,
                            inActive: res.data.data.clientsStats.inactive
                        })
                    })
                    .catch(err => console.log(err))
            } catch (e) {
                console.log(e)
            }
        }

    }, [router.asPath])

    return (
        <>
            <div className={classes.Content}>
                <section className={classes.Top}>
                    <div className={classes.Chart}>
                        <ProjectsChart
                            chartsName={"USERS"}
                            data={[{name: 'All', value: clients.all}, {name: 'Active', value: clients.active}, {
                                name: 'Inactive',
                                value: clients.inActive
                            }]}
                            colors={[
                                "#147AD6",
                                "#79D2DE",
                                "#EC6666",
                            ]}
                        />
                    </div>
                    <div className={classes.Reports}>
                        <div className={classes.Report}>
                            <div className={classes.Report_Title}>
                                <p>Packages Number</p>
                            </div>
                            <div className={classes.Report_Number}>
                                <p>{packages}</p>
                            </div>
                        </div>
                        <div className={classes.Report}>
                            <div className={classes.Report_Title}>
                                <p>Meals Number</p>
                            </div>
                            <div className={classes.Report_Number}>
                                <p>{meals}</p>
                            </div>
                        </div>
                        <div className={classes.Report}>
                            <div className={classes.Report_Title}>
                                <p>Number of nutritionists</p>
                            </div>
                            <div className={classes.Report_Number}>
                                <p>{doctors}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={classes.Bottom}>
                    <h2>Best Selling Packages</h2>
                    <div className={classes.Cards_Container} onWheel={handleScroll} ref={cardContainerRef}>
                        {topSelling && topSelling.map((cur) => {
                            return (
                                <PackageAdminCard
                                    key={cur._id}
                                    name={cur.bundleName}
                                    meals={cur.mealsNumber}
                                    price={cur.bundlePrice}
                                    snacks={cur.snacksNumber}
                                    fridays={cur.fridayOption}
                                    offers={cur.bundleOffer}
                                    time={cur.timeOnCard}
                                />
                            )
                        })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}


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
