import classes from '@/styles/pages/admin/packages.module.scss'
import {useRouter} from "next/router";
// IMPORTS
import PackageCard_Edit from "@/components/pages/dashboard/Package_card/PackageCard_Edit";
import Image from "next/image";
import {useEffect} from "react";

const Packages = () => {
    // ROUTER
    const router = useRouter();

    // EFFECT TO GET THE PACKAGES WHEN PAGE LOAD
    useEffect(() => {
        // LOGIC
    }, [])

    return (
        <>
            <div className={classes.Main}>
                <div className={classes.Top}>
                    <button onClick={() => router.push(`/admin/create/create_package`)}>
                        <Image src={'/images/Add_Icon.svg'} alt={'Add Icon'} width={18} height={18} />
                        <span>Create Package</span>
                    </button>
                </div>
                <div className={classes.Bottom}>
                    <PackageCard_Edit />
                </div>
            </div>
        </>
    )
}
export default Packages