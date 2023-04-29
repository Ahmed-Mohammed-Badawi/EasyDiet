import classes from '@/styles/pages/doctor/doctor.module.scss';
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
// IMPORTS
import Spinner from "@/components/layout/spinner/Spinner";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";
import Link from "next/link";

const Doctor = () => {

    //STATES
    const [messages, setMessages] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeUser, setActiveUser] = useState({
        messageId: '',
        userId: '',
        userImage: '/images/no_image.webp',
        userName: '',
        userTopic: ''
    });
    const [showActiveUser, setShowActiveUser] = useState(false);

    //REFS
    const heightRef = useRef();
    const weightRef = useRef();
    const messageRef = useRef();

    //HELPERS
    function getObjectIndexById(array, id) {
        for (let i = 0; i < array.length; i++) {
            if (array[i]._id === id) {
                return i;
            }
        }
        // if no object with matching ID was found, return -1
        return -1;
    }

    //HANDLERS
    const submitHandler = (event) => {
        event.preventDefault();
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        // GET THE REFS VALUE
        const height = heightRef.current.value;
        const weight = weightRef.current.value;
        const message = messageRef.current.value;

        if (!activeUser.messageId || !activeUser?.userId) {
            toast.error('The User ID || Message ID => is not found');
            return
        }

        if(!height && !weight && !message){
            toast.error('There are no inputs');
            return
        }

        // SET THE LOADING STATE
        setLoading(true)

        // LOGIC
        axios.post(`https://api.easydietkw.com/api/v1/message/reply`, {
                messageId: activeUser?.messageId,
                reply: message,
                clientId: activeUser?.userId,
                wieght: weight,
                tall: height
            }
            , {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                // LOGIC
                setLoading(false)
                // SET THE RESPONSE IN THE STATE
                const messages_copy = [...userMessages];
                const messageIndex = getObjectIndexById(messages_copy, activeUser?.messageId)

                if (messageIndex !== -1) {
                    const message_copy = messages_copy[messageIndex];

                    message_copy['reply'] = message;

                    messages_copy[messageIndex] = message_copy;

                    setUserMessages(messages_copy)
                }

                toast.success(`Message Sent Successfully`)
                // CLEAR THE INPUTS
                heightRef.current.value = '';
                weightRef.current.value = '';
                messageRef.current.value = '';
            })
            .catch(err => {
                setLoading(false)
                toast.error(err?.response?.data?.message || err.message)
            })

    }

    const messageReadHandler = (messageID) => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        axios.put(`https://api.easydietkw.com/api/v1/set/message/status`, {
                messageId: messageID,
            }
            , {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                // SET THE STATE OF READ
                const messages_copy = [...messages];
                const messageIndex = getObjectIndexById(messages_copy, messageID)

                if (messageIndex !== -1) {
                    const message_copy = messages_copy[messageIndex];

                    message_copy['isRead'] = true;

                    messages_copy[messageIndex] = message_copy;

                    setMessages(messages_copy)
                }
            })
            .catch(err => {
                toast.error(err?.response?.data?.message || err.message)
            })
    }

    const getTheUserHandler = (clientId) => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        axios.get(`https://api.easydietkw.com/api/v1/client/messages?clientId=${clientId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE MEALS IN THE STATE
                console.log(res)
                setUserMessages(res.data.messages)
            })
            .catch(err => {
                toast.error(err?.response?.data?.message || err.message)
            })
    }

    //EFFECTS
    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        axios.get(`https://api.easydietkw.com/api/v1/clients/messages`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE MEALS IN THE STATE
                setMessages(res.data.data.messages)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className={classes.Doctor}>
                <div className={classes.Clients}>
                    {messages && messages.map((message) => {
                        return (
                            <div
                                key={message._id}
                                className={classes.Client}
                                onClick={() => {
                                    // Change the Read Status If it's unread
                                    if (message.isRead === false) {
                                        messageReadHandler(message?._id)
                                    }
                                    // GET THE CLIENT MESSAGES BY ID
                                    getTheUserHandler(message?.clientId?._id)
                                    //SET THE ACTIVE USER INFO
                                    setActiveUser({
                                        messageId: message?._id,
                                        userId: message?.clientId?._id,
                                        userName: message?.clientId?.clientNameEn || message?.clientId?.clientName,
                                        userTopic: message?.title
                                    });
                                    setShowActiveUser(true)
                                }}
                            >
                                <div className={classes.Client_Container}>
                                    <div className={classes.Client_Image}>
                                        <Image src={'/images/no_image.webp'} alt={''} width={50} height={50}/>
                                    </div>
                                    <div className={classes.Client_Info}>
                                        <h3>{message?.clientId?.clientNameEn || message?.clientId?.clientName}</h3>
                                        <p>{message?.title}</p>
                                    </div>
                                </div>
                                {message.isRead === false && <span className={classes.Client_Unread}></span>}
                            </div>
                        )
                    })}
                </div>
                <div className={classes.Chat}>
                    {showActiveUser && (
                        <div className={classes.Top}>
                            <div className={classes.Client_Container}>
                                <div className={classes.Client_Image}>
                                    <Image src={activeUser?.userImage || '/images/no_image.webp'} alt={''} width={50}
                                           height={50}/>
                                </div>
                                <div className={classes.Client_Info}>
                                    <h3>{activeUser?.userName || ''}</h3>
                                    <p>{activeUser?.userTopic || ''}</p>
                                </div>
                            </div>
                        </div>)
                    }
                    <div className={classes.Bottom}>
                        <div className={classes.Questions}>
                            {(showActiveUser && userMessages) && (
                                <div className={classes.Current_Question}>
                                    <h3>Question of client</h3>
                                    <h4>q: {userMessages[0]?.title}?</h4>
                                    <time>{new Date(userMessages[0]?.updatedAt).toLocaleDateString('en-US', {
                                        day: "numeric",
                                        month: "long",
                                        year: 'numeric',
                                    })}</time>
                                    {userMessages[0]?.reply && (<p>({userMessages[0]?.specialistId?.fullName.toUpperCase()}): {userMessages[0]?.reply}</p>)}
                                    <h5>ATTACHMENTS</h5>
                                    {userMessages[0] && userMessages[0]?.attachments.map((attachment, attachIndex) => {
                                        return (
                                            <Link href={attachment} target={'_blank'}
                                                  key={attachIndex}>{'Attachment ' + (attachIndex + 1)}</Link>
                                        )
                                    })}
                                </div>
                            )}
                            {(showActiveUser && userMessages) && (
                                <div className={classes.Previous_Questions}>
                                    <h3>Previous Question</h3>
                                    <div className={classes.Previous_Questions__container}>
                                        {userMessages && userMessages.map((message, messageIndex) => {
                                            if (messageIndex !== 0) {
                                                return (
                                                    <div key={message._id} className={classes.Previous_Question}>
                                                        <h4>q: {message?.body}?</h4>
                                                        <time>{new Date(message?.updatedAt).toLocaleDateString('en-US', {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: 'numeric',
                                                        })}</time>
                                                        <p>({message?.specialistId?.fullName.toUpperCase()}): {message?.reply}</p>
                                                        <h5>ATTACHMENTS</h5>
                                                        {message && message?.attachments.map((attachment, attachIndex) => {
                                                            return (
                                                                <Link href={attachment} target={'_blank'}
                                                                      key={attachIndex}>{'Attachment ' + (attachIndex + 1)}</Link>
                                                            )
                                                        })}
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={classes.Sender}>
                            <form onSubmit={submitHandler}>
                                <div className={classes.Input_Container}>
                                    <div className={classes.Input_Group}>
                                        <input ref={heightRef} autoComplete={'off'} placeholder={'Height'}
                                               type={'number'}
                                               name={'height'} step={1} min={0}/>
                                        <span><span>CM</span></span>
                                    </div>
                                    <div className={classes.Input_Group}>
                                        <input ref={weightRef} autoComplete={'off'} placeholder={'Weight'}
                                               type={'number'}
                                               name={'weight'} step={0.01} min={0}/>
                                        <span><span>KG</span></span>
                                    </div>
                                </div>
                                <div className={classes.Input_Container}>
                                    <div className={classes.Input_Group}>
                                        <textarea ref={messageRef} placeholder={'Type your Message...'}
                                                  name={'Message'}/>
                                        <button type={'submit'}>
                                            <Image src={'/images/Global/SendDoctor_Icon.svg'} alt={'send'} width={22}
                                                   height={22}/>
                                            {loading && <Spinner size={2} color={'#A71523'}/>}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Doctor;