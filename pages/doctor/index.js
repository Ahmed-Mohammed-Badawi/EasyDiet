import classes from '@/styles/pages/doctor/doctor.module.scss';
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
// IMPORTS
import Spinner from "@/components/layout/spinner/Spinner";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";

const Doctor = () => {

    //STATES
    const [loading, setLoading] = useState(false);
    const [activeUser, setActiveUser] = useState({
        userId: '1564165415615161',
        userImage: '/images/no_image.webp',
        userName: 'Ahmed Mohammed',
        userTopic: 'Fitness Advice'
    });

    //REFS
    const heightRef = useRef();
    const weightRef = useRef();
    const messageRef = useRef();

    //HANDLERS
    const submitHandler = (event) => {
        event.preventDefault();
        // GET THE REFS VALUE
        const height = heightRef.current.value;
        const weight = weightRef.current.value;
        const message = messageRef.current.value;
        // VALIDATION
        if(!height || !weight || !message){
            toast.error('Please fill all inputs');
            return
        }

        // SET THE LOADING STATE
        setLoading(true)

        // LOGIC
        console.log(height, weight, message);

        setTimeout(() => {
            setLoading(false)
        }, 2000)

        // CLEAR THE INPUTS
        heightRef.current.value = '';
        weightRef.current.value = '';
        messageRef.current.value = '';
    }

    const messageReadHandler = () => {

    }

    const getTheUserHandler = () => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        axios.get(`https://api.easydietkw.com/api/v1/get/all/meals`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE MEALS IN THE STATE
            })
            .catch(err => {
                toast.error(err?.response?.data?.message || err.message)
            })
    }

    //EFFECTS
    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        axios.get(`https://api.easydietkw.com/api/v1/get/all/meals`, {
            params: {
                page: 1,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE MEALS IN THE STATE
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className={classes.Doctor}>
                <div className={classes.Clients}>
                    <div className={classes.Client}>
                        <div className={classes.Client_Container}>
                            <div className={classes.Client_Image}>
                                <Image src={'/images/no_image.webp'} alt={''} width={50} height={50}/>
                            </div>
                            <div className={classes.Client_Info}>
                                <h3>Name</h3>
                                <p>Subject</p>
                            </div>
                        </div>
                        <span className={classes.Client_Unread}></span>
                    </div>
                    <div className={classes.Client}>
                        <div className={classes.Client_Container}>
                            <div className={classes.Client_Image}>
                                <Image src={'/images/no_image.webp'} alt={''} width={50} height={50}/>
                            </div>
                            <div className={classes.Client_Info}>
                                <h3>Name</h3>
                                <p>Subject</p>
                            </div>
                        </div>
                        <span className={classes.Client_Unread}></span>
                    </div>
                    <div className={classes.Client}>
                        <div className={classes.Client_Container}>
                            <div className={classes.Client_Image}>
                                <Image src={'/images/no_image.webp'} alt={''} width={50} height={50}/>
                            </div>
                            <div className={classes.Client_Info}>
                                <h3>Name</h3>
                                <p>Subject</p>
                            </div>
                        </div>
                        <span className={classes.Client_Unread}></span>
                    </div>
                    <div className={classes.Client}>
                        <div className={classes.Client_Container}>
                            <div className={classes.Client_Image}>
                                <Image src={'/images/no_image.webp'} alt={''} width={50} height={50}/>
                            </div>
                            <div className={classes.Client_Info}>
                                <h3>Name</h3>
                                <p>Subject</p>
                            </div>
                        </div>
                        <span className={classes.Client_Unread}></span>
                    </div>
                </div>
                <div className={classes.Chat}>
                    <div className={classes.Top}>
                        <div className={classes.Client_Container}>
                            <div className={classes.Client_Image}>
                                <Image src={activeUser?.userImage || '/images/no_image.webp'} alt={''} width={50} height={50}/>
                            </div>
                            <div className={classes.Client_Info}>
                                <h3>{activeUser?.userName || ''}</h3>
                                <p>{activeUser?.userTopic || ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <div className={classes.Questions}>
                            <div className={classes.Current_Question}>
                                <h3>Question of client</h3>
                                <h4>q: When Should I start Playing Gym If I started Doing Diet after 2 days?</h4>
                                <time>13 Feb, 2001</time>
                                <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                            </div>
                            <div className={classes.Previous_Questions}>
                                <h3>Question of client</h3>
                                <div className={classes.Previous_Questions__container}>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                    <div className={classes.Previous_Question}>
                                        <h4>q: When Should I start Playing Gym If I started Doing Diet after 2
                                            days?</h4>
                                        <time>13 Feb, 2001</time>
                                        <p>(AHMED MOHAMMED): You should Start from today to be able to move 😅</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.Sender}>
                            <form onSubmit={submitHandler}>
                                <div className={classes.Input_Container}>
                                    <div className={classes.Input_Group}>
                                        <input ref={heightRef} autoComplete={'off'} placeholder={'Height'} type={'number'}
                                               name={'height'} step={1} min={0}/>
                                        <span><span>CM</span></span>
                                    </div>
                                    <div className={classes.Input_Group}>
                                        <input ref={weightRef} autoComplete={'off'} placeholder={'Weight'} type={'number'}
                                               name={'weight'} step={0.01} min={0}/>
                                        <span><span>KG</span></span>
                                    </div>
                                </div>
                                <div className={classes.Input_Container}>
                                    <div className={classes.Input_Group}>
                                        <textarea ref={messageRef} placeholder={'Type your Message...'} name={'Message'}/>
                                        <button type={'submit'}>
                                            <Image src={'/images/Global/SendDoctor_Icon.svg'} alt={'send'} width={22} height={22} />
                                            {loading && <Spinner size={2} color={'#A71523'} />}
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