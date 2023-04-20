import classes from "./DayItem.module.scss";
import Image from "next/image";
import {useRouter} from "next/router";

const DayItem = ({title, date, isSelected, Editable}) => {

    //ROUTER
    const router = useRouter();

    return (
        <>
            <div className={classes.DayItem}>
                <div className={classes.Content}>
                    <h4>{title}</h4>
                    <span>{date}</span>
                </div>
                <div className={classes.Icons}>
                    {!Editable && <span className={classes.Icon_Container}>
                        <Image src={(isSelected)? '/images/Global/Check_Icon.svg' : '/images/Global/UnSelected_Icon.svg'}
                               alt={'Check icon'} width={20} height={20}/>
                    </span>}
                    {Editable && <span onClick={() => router.push(`/user/choose_day_meals`)} className={[classes.Icon_Container, classes.Edit].join(' ')}>
                    <Image src={'/images/Edit_Icon.svg'} alt={'Edit icon'} width={20} height={20}/>
                    </span>}
                </div>
                {Editable && <span className={classes.Icon_Container}>
                    <Image src={isSelected ? '/images/Global/Check_Icon.svg' : '/images/Global/UnSelected_Icon.svg'}
                           alt={'Unselected icon'} width={20} height={20}/>
                </span>}
            </div>
        </>
    )
}

export default DayItem;