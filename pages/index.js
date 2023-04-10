import Head from 'next/head'
import classes from '@/styles/pages/admin/dashboard.module.scss';
// NEW
import {useTranslation} from "react-i18next";
import i18n from "@/i18n";
//TEST
import ProjectsChart from "@/components/pages/dashboard/ProjectsChart";

export default function Home() {

    const {t} = useTranslation();

    return (
        <>
            <div className={classes.Content}>

            </div>
            <ProjectsChart
                chartsName={"Users"}
                data={[{name: 'All', value: 280}, {name: 'Active', value: 180}, {name: 'Inactive', value: 100}]}
                colors={[
                    "#147AD6",
                    "#79D2DE",
                    "#EC6666",
                ]}
            />
        </>
    )
}
