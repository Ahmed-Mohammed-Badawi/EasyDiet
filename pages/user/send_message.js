import classes from '@/styles/pages/user/send_message.module.scss';
import {useRouter} from "next/router";
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {toast} from "react-toastify";
import Image from "next/image";
import {onInputChange} from "@/redux/slices/user/profile_slice";
import Spinner from "@/components/layout/spinner/Spinner";
const SendMessage = () => {
    // ROUTER
    const router = useRouter();

    // STATES
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState(null);

    //REFS
    const pdfFileRef = useRef();

    // REDUX
    const dispatch = useDispatch();
    const {
        userId,
        nutrition_specialistId,
        subject,
        content
    } = useSelector(state => state.profile)


    // SUBMIT HANDLER
    const submitHandler = async (e) => {
        // STOP RELOADING
        e.preventDefault();
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);

        //Check the inputs
        // if (!name || !timeOnCard || !realTime || !packagePrice || !numberOfMeals || !numberOfSnacks || !language || packageMeals.length <= 0) {
        //     toast.error(`Please fill All inputs`);
        //     return;
        // }
        // Set the loading state for the spinner
        setLoading(true);

        // const createMeal_Obj = {
        //     bundleName: name,
        //     mealsNumber: numberOfMeals,
        //     breakfast: breakfast ? 'on' : 'off',
        //     lunch: lunch ? 'on' : 'off',
        //     dinner: dinner ? 'on' : 'off',
        //     snacksNumber: numberOfSnacks,
        //     bundlePeriod: realTime,
        //     bundleOffer: offerDays,
        //     fridayOption: fridayIncluded,
        //     bundlePrice: packagePrice,
        //     mealsIds: packageMeals,
        //     lang: language,
        //     timeOnCard: timeOnCard
        // }

        // Send Create Request to the server
        await axios.post(`https://api.easydietkw.com/api/v1/create/bundle`, createMeal_Obj, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.success(res.data.message || `Package Created Successfully`);
                router.push(`/admin/packages`)
                    .then(() => {
                        // Clear the reducer
                        dispatch(clearAll());
                    })
            })
            .catch(err => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.error(err?.response?.data?.message || err?.message);
            })
    }

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <div className={classes.Top}>
                        <div className={classes.Left}>
                            <div className={classes.Image}>
                                <Image src={'/images/home_background.png'} alt={'Doctor Image'} width={100} height={100} />
                            </div>
                            <div className={classes.Content}>
                                <h1>Ahmed Mohammed</h1>
                                <p>nutrition specialist</p>
                            </div>
                        </div>
                        <div className={classes.Right}>
                            <button className={classes.Close}>
                                <Image src={'/images/Auth/next-icon.svg'} alt={'go back'} width={25} height={25} />
                            </button>
                        </div>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className={classes.InputsContainer}>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'subject'}>Subject</label>
                                <input
                                    type={'text'}
                                    name={'subject'}
                                    id={'subject'}
                                    placeholder={'EX: Ahmed'}
                                    value={subject}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'subject',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <label htmlFor={'content'}>Content</label>
                                <textarea
                                    name={'content'}
                                    id={'content'}
                                    placeholder={'EX: Talk about your problem here'}
                                    value={content}
                                    onChange={(event) => {
                                        dispatch(onInputChange({
                                            key: 'content',
                                            value: event.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className={classes.InputGroup}>
                                <div className={classes.Image_Uploader}>
                                    <label htmlFor={'pdf_file'}>
                                        <div className={classes.Static}>
                                            <Image src={'/images/Upload_Icon.svg'} alt={'Upload Icon'} width={30} height={30}/>
                                            <span>Upload PDF</span>
                                        </div>
                                    </label>
                                    <input id={'pdf_file'} type={'file'} name={'PDF_File'} ref={pdfFileRef}
                                           accept="application/pdf" onChange={(e) => {
                                        const fileName = e.target.files[0].name;
                                        setFileName(fileName)
                                    }}/>
                                    {fileName && <p className={classes.SelectedFile}>{fileName}</p>}
                                </div>
                            </div>
                        </div>
                        <div className={classes.NavigationContainer}>
                            <button type={'submit'}>
                                <span>
                                    {loading ? <Spinner size={2} color={`#ffffff`}/> : 'Send'}
                                </span>
                                <Image src={'/images/Send_Icon.svg'} alt={'Send'} width={20} height={20}/>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default SendMessage;