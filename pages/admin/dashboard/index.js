import {useRef} from "react";
import Head from 'next/head'
import classes from '@/styles/pages/admin/dashboard.module.scss';
// NEW
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";
//TEST
import ProjectsChart from "@/components/pages/dashboard/ProjectsChart";
// IMPORTS
import PackageAdminCard from "@/components/pages/dashboard/Package_card/PackageCard";

export default function Dashboard() {

    // REFS
    const cardContainerRef = useRef();

    const {t} = useTranslation();


    const handleScroll = (event) => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollLeft += event.deltaY;
        }
    };

    return (
        <>
            <div className={classes.Content}>
                <section className={classes.Top}>
                    <div className={classes.Chart}>
                        <ProjectsChart
                            chartsName={"USERS"}
                            data={[{name: 'All', value: 280}, {name: 'Active', value: 180}, {
                                name: 'Inactive',
                                value: 100
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
                                <p>50</p>
                            </div>
                        </div>
                        <div className={classes.Report}>
                            <div className={classes.Report_Title}>
                                <p>Meals Number</p>
                            </div>
                            <div className={classes.Report_Number}>
                                <p>999</p>
                            </div>
                        </div>
                        <div className={classes.Report}>
                            <div className={classes.Report_Title}>
                                <p>Number of nutritionists</p>
                            </div>
                            <div className={classes.Report_Number}>
                                <p>33</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={classes.Bottom}>
                    <h2>Best Selling Packages</h2>
                    <div className={classes.Cards_Container} onWheel={handleScroll} ref={cardContainerRef}>
                        <PackageAdminCard/>
                        <PackageAdminCard/>
                        <PackageAdminCard/>
                        <PackageAdminCard/>
                    </div>
                </section>
            </div>
        </>
    )
}
