import classes from '@/styles/pages/admin/reports.module.scss'
import Image from "next/image";
// IMPORT
import CustomSelectReports from "@/components/pages/dashboard/custom-select-reports";

const Reports = () => {

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <h1>Reports</h1>
                    <form>
                        <div className={classes.InputsContainer}>
                            <div className={[classes.InputGroup, classes.MultiSelect].join(' ')}>
                                <label htmlFor={'user_role'}>Report Type</label>
                                <CustomSelectReports/>
                            </div>
                        </div>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'report_start_date'}>Start Date</label>
                                <input type={'date'} name={'report_start_date'} id={'report_start_date'}/>
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'report_end_date'}>End Date</label>
                                <input type={'date'} name={'report_end_date'} id={'report_end_date'}/>
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
export default Reports