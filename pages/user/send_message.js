import classes from '@/styles/pages/user/send_message.module.scss';
import {useRouter} from "next/router";
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import {toast} from "react-toastify";
import Image from "next/image";
import {onInputChange, clearAll} from "@/redux/slices/user/nutritionspecialist_slice";
import Spinner from "@/components/layout/spinner/Spinner";

const SendMessage = ({ID, fullName, userImage}) => {
    // ROUTER
    const router = useRouter();

    // STATES
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState(null);

    //REFS
    const pdfFileRef = useRef();

    // REDUX
    const dispatch = useDispatch();
    const {
        userId,
        nutrition_specialistId,
        subject,
        content
    } = useSelector(state => state.nutrition_specialist)


    // SUBMIT HANDLER
    const submitHandler = async (e) => {
        // STOP RELOADING
        e.preventDefault();
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie);

        //Check the inputs
        if (!ID || !subject || !content) {
            toast.error(`Please fill All inputs`);
            return;
        }
        // Set the loading state for the spinner
        setLoading(true);

        // Create the Data as formData
        const sendMessage_formData = new FormData();
        sendMessage_formData.append("title", subject);
        sendMessage_formData.append("body", content);
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                sendMessage_formData.append('files', files[i]);
            }
        }

        // Send Create Request to the server
        await axios.post(`https://api.easydietkw.com/api/v1/send/message`, sendMessage_formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                setLoading(false);
                // DO WHAT I WANT
                toast.success(res.data.message || `Message Sent Successfully`);
                router.push(`/user/nutrition_specialist`)
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
                                <Image src={userImage || '/images/no_image.webp'} alt={'Doctor Image'} width={100}
                                       height={100}/>
                            </div>
                            <div className={classes.Content}>
                                <h1>{fullName}</h1>
                                <p>nutrition specialist</p>
                            </div>
                        </div>
                        <div className={classes.Right}>
                            <button className={classes.Close}>
                                <Image src={'/images/Auth/next-icon.svg'} alt={'go back'} width={25} height={25}/>
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
                                            <Image src={'/images/Upload_Icon.svg'} alt={'Upload Icon'} width={30}
                                                   height={30}/>
                                            <span>Upload PDF</span>
                                        </div>
                                    </label>
                                    <input id={'pdf_file'} type={'file'} name={'PDF_File'} ref={pdfFileRef} multiple
                                           accept="application/pdf" onChange={(e) => {
                                        setFiles(Array.from(e.target.files))
                                    }}/>
                                    {files && files.map((file, i) => {
                                        return (
                                            <p key={i} className={classes.SelectedFile}>{file.name}</p>
                                        )
                                    })}
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

export const getServerSideProps = async (ctx) => {
    // GET THE TOKEN FROM THE REQUEST
    const {token} = ctx.req.cookies;

    let tokenInfo;
    if (token) {
        await axios.get(`https://api.easydietkw.com/api/v1/get/verify/token`, {
            params: {
                token: token,
            }
        })
            .then(res => tokenInfo = res.data.decodedToken)
            .catch(err => console.log(err))
    }

    if (!tokenInfo) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }


    // GET THE ID OF THE MEAL FROM THE URL
    const {ID} = ctx.query;
    let specialist;

    if (ID) {
        // GET THE MEAL FROM THE SERVER
        await axios.get(`https://api.easydietkw.com/api/v1/get/specialist?userId=${ID}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE STATE
                console.log(res.data.user)
                specialist = res.data.user
            })
            .catch(err => {
                // SET THE STATE
                console.log(err)
            })
    }

    // SET THE EMPLOYEE IF EXIST
    let propObj = {};
    if(specialist){
        propObj = {
            ID,
            ...specialist
        }
    }

    return {
        props: propObj,
    };
};
