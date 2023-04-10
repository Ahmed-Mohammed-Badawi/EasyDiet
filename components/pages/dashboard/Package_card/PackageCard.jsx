import classes from './PackageCard.module.scss';
const PackageAdminCard = () => {
    return (
        <article className={classes.Card}>
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
                    <p>BREAKFAST</p>
                    <span>1</span>
                </div>
                <div>
                    <p>BREAKFAST</p>
                    <span>1</span>
                </div>
                <div>
                    <p>BREAKFAST</p>
                    <span>1</span>
                </div>
            </div>
        </article>
    )
}
export default PackageAdminCard