import classes from '@/styles/pages/admin/packages.module.scss'
// IMPORTS
import PackageCard_Edit from "@/components/pages/dashboard/Package_card/PackageCard_Edit";
import {Arima} from "@next/font/google";
import Image from "next/image";

const Packages = () => {
    return (
        <>
            <div className={classes.Main}>
                <div className={classes.Top}>
                    <button>
                        <Image src={'/images/Add_Icon.svg'} alt={'Add Icon'} width={18} height={18} />
                        <span>Create Package</span>
                    </button>
                </div>
                <div className={classes.Bottom}>
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                    <PackageCard_Edit />
                </div>
            </div>
        </>
    )
}
export default Packages