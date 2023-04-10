import classes from '@/styles/pages/admin/create_package.module.scss'
import Image from "next/image";

const CreatePackage = () => {
    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>Create Package</h1>
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
                            <div className={classes.InputGroup}>
                                <label htmlFor={'package_real_time'}>PACKAGE REAL TIME (NUMBER)</label>
                                <input type={'number'} name={'package_real_time'} id={'package_real_time'}
                                       placeholder={'EX: 15 DAYS'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'package_price'}>Package Price (NUMBER)</label>
                                <input type={'number'} step={'.25'} name={'package_price'} id={'package_price'}
                                       placeholder={'EX: 15.5 KWD'}/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'Breakfast_meals'}>Breakfast Meals (NUMBER)</label>
                                <input type={'number'} name={'Breakfast_meals'} id={'Breakfast_meals'}
                                       placeholder={'EX: 2'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'Lunch_meals'}>LUNCH Meals (NUMBER)</label>
                                <input type={'number'} name={'Lunch_meals'} id={'Lunch_meals'}
                                       placeholder={'EX: 2'}/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'Dinner_meals'}>Dinner Meals (NUMBER)</label>
                                <input type={'number'} name={'Dinner_meals'} id={'Dinner_meals'}
                                       placeholder={'EX: 2'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'Snacks_meals'}>SNACKS Meals (NUMBER)</label>
                                <input type={'number'} name={'Snacks_meals'} id={'Snacks_meals'}
                                       placeholder={'EX: 2'}/>
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                Create
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default CreatePackage