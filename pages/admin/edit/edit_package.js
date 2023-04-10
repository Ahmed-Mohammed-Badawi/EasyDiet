import classes from '@/styles/pages/admin/edit_package.module.scss'
import Image from "next/image";
import CustomSelectTime from "@/components/pages/dashboard/custom-select-time";
import CustomSelectLanguage from "@/components/pages/dashboard/custom-select-language";
import {useState} from "react";

const EditPackage = () => {

    // STATES
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };


    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>Edit Package</h1>
                    <p>You will edit the (Fit Package)</p>
                    <form>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'package_name'}>Package Name</label>
                                <input type={'text'} name={'package_name'} id={'package_name'}
                                       placeholder={'EX: FIT PACKAGE'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'package_time_onCard'}>PACKAGE time on card</label>
                                <input type={'text'} name={'package_time_onCard'} id={'package_time_onCard'}
                                       placeholder={'EX: 2 Weeks'}/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'package_real_time'}>Package time (Real)</label>
                                <CustomSelectTime/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'package_price'}>Package Price (NUMBER)</label>
                                <input type={'number'} step={'.25'} name={'package_price'} id={'package_price'}
                                       placeholder={'EX: 15.5 KWD'}/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'number_of_meals'}>Number of meals (NUMBER)</label>
                                <input type={'number'} name={'number_of_meals'} id={'number_of_meals'}
                                       placeholder={'EX: 5'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'Snacks_meals'}>SNACKS Meals (NUMBER)</label>
                                <input type={'number'} name={'Snacks_meals'} id={'Snacks_meals'}
                                       placeholder={'EX: 2'}/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'package_real_time'}>Package Language</label>
                                <CustomSelectLanguage/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'offers_days'}>Offers Days (NUMBER)</label>
                                <input type={'number'} name={'offers_days'} id={'offers_days'}
                                       placeholder={'EX: 2'}/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <div className={classes.togglerInput}>
                                    <label htmlFor="package_friday_included">Include Fridays</label>
                                    <div className={classes.toggler}>
                                        <input
                                            type="checkbox"
                                            id="package_friday_included"
                                            name="package_friday_included"
                                            checked={isChecked}
                                            onChange={handleToggle}
                                        />
                                        <div className={classes.slider}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                Edit
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default EditPackage