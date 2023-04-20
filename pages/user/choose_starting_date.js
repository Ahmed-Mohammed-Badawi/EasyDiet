import classes from '@/styles/pages/user/choose_starting_date.module.scss';
import Image from "next/image";
import CustomSelectDays from "@/components/pages/user/custom-select-days";

const Choose_Starting_Date = () => {

    // HANDLERS
    const submitHandler = async (event) => {
        // STOP RELOADING
        event.preventDefault();

    }

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>CHOOSE STARTING DATE</h1>
                    <form onSubmit={submitHandler}>
                        <div className={classes.InputsContainer}>
                            <div className={[classes.InputGroup].join(' ')}>
                                <CustomSelectDays />
                            </div>
                        </div>
                        <button type={'submit'}>
                            <span>
                                Continue
                            </span>
                            <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Choose_Starting_Date;