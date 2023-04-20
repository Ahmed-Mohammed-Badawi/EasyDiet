import classes from './PackageCard_User.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";

const PackageCard_User = ({ID, name, price, time, meals, snacks, fridays, offers, language}) => {

    const router = useRouter();

    return (
        <article className={classes.Card}>
            <div className={classes.Buttons}>
                <button onClick={() => {
                    router.push(`/admin/edit/edit_package?ID=${ID}&lang=${language}`)
                }}>
                    <Image src={'/images/Global/Buy_Icon.svg'} alt={'Edit'} width={18} height={18} />
                </button>
            </div>
            <p className={classes.Price}>{price} KWD</p>
            <div className={classes.Top}>
                <div className={classes.Info}>
                    <p>{name}</p>
                    <span>{time}</span>
                    <span>{meals}</span>
                </div>
            </div>
            <div className={classes.Bottom}>
                <div>
                    <p>MEALS</p>
                    <span>{meals}</span>
                </div>
                <div>
                    <p>SNACKS</p>
                    <span>{snacks}</span>
                </div>
                <div>
                    <p>FRIDAYS</p>
                    <span>{fridays ? <span>&#10003;</span> : <span>&#10006;</span>}</span>
                </div>
                <div>
                    <p>OFFER DAYS</p>
                    <span>{offers > 0 ? <span>&#10003;</span> : <span>&#10006;</span>}</span>
                </div>
            </div>
        </article>
    )
}
export default PackageCard_User