import classes from './PackageCard_Edit.module.scss';
import Image from "next/image";
const PackageAdminCard = () => {
    return (
        <article className={classes.Card}>
            <div className={classes.Buttons}>
                <button>
                    <Image src={'/images/Edit_Icon.svg'} alt={'Edit'} width={18} height={18} />
                </button>
                <button>
                    <Image src={'/images/Delete_Icon.svg'} alt={'Delete'} width={18} height={18} />
                </button>
            </div>
            <p className={classes.Price}>52 KWD</p>
            <div className={classes.Top}>
                <div className={classes.Info}>
                    <p>Fit Package</p>
                    <span>2 Weeks</span>
                    <span>5</span>
                </div>
            </div>
            <div className={classes.Bottom}>
                <div>
                    <p>BREAKFAST</p>
                    <span>1</span>
                </div>
                <div>
                    <p>LUNCH</p>
                    <span>1</span>
                </div>
                <div>
                    <p>DINNER</p>
                    <span>1</span>
                </div>
                <div>
                    <p>SNACKS</p>
                    <span>1</span>
                </div>
            </div>
        </article>
    )
}
export default PackageAdminCard