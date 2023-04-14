import classes from './PackageCard.module.scss';
const PackageAdminCard = ({name, price, time, meals, snacks, fridays, offers}) => {
    return (
        <article className={classes.Card}>
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
export default PackageAdminCard