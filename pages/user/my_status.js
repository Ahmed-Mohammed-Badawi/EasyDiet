import classes from '@/styles/pages/user/my_status.module.scss';
import Image from "next/image";
import {onInputChange} from "@/redux/slices/user/profile_slice";
import Spinner from "@/components/layout/spinner/Spinner";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import axios from "axios";

const My_Status = () => {
    //ROUTER
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState({
        weight: '',
        height: '',
    });

    // EFFECTS
    useEffect(() => {
        //GET THE TOKEN
        const token = extractTokenFromCookie(document.cookie)

        axios.get(`https://api.easydietkw.com/api/v1/my/messages`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE MEALS IN THE STATE
                console.log(res)
                setMessages(res.data.messages);
                setUserInfo({
                    height: res.data.bmi.tall,
                    weight: res.data.bmi.weight
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.FormContainer}>
                    <div className={classes.Top}>
                        <div className={classes.Left}>
                            <h1>Medical Record</h1>
                        </div>
                        <div className={classes.Right} onClick={() => router.push('/user/profile')}>
                            <button className={classes.Close}>
                                <Image src={'/images/Auth/next-icon.svg'} alt={'go back'} width={25} height={25}/>
                            </button>
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <div className={classes.Bottom_P1}>
                            <div className={classes.P1_Item}>
                                <div>
                                    <p>weight</p>
                                    <span>{userInfo?.weight || ''} KG</span>
                                </div>
                                <div className={classes.Image_Container}>
                                    <Image src={'/images/Global/weight.png'} alt={'weight'} width={50} height={50}/>
                                </div>
                            </div>
                            <div className={classes.P1_Item}>
                                <div>
                                    <p>Height</p>
                                    <span>{userInfo?.height || ''} CM</span>
                                </div>
                                <div className={classes.Image_Container}>
                                    <Image src={'/images/Global/height.png'} alt={'weight'} width={60} height={60}/>
                                </div>
                            </div>
                        </div>
                        <div className={classes.Bottom_P2}>
                            {messages && messages.map((message) => {
                                return (
                                    <div key={message._id} className={classes.Message}>
                                        <h3>QUESTION</h3>
                                        <p>{message?.body}?</p>

                                        <div className={classes.Response}>
                                            <h4>DOCTOR RESPONSE ({message?.specialistId?.fullName})</h4>
                                            <p>
                                                {message?.reply}
                                            </p>
                                        </div>

                                        <div className={classes.Doctor}>
                                            <div className={classes.Doctor_Image_Container}>
                                                <Image src={message?.specialistId?.userImage || '/images/no_image.webp'}
                                                       alt={'Doctor image'} width={50}
                                                       height={50}/>
                                            </div>
                                            <div>
                                                <h4>{message?.specialistId?.fullName}</h4>
                                                <time>{new Date(message?.updatedAt).toLocaleDateString('en-US', {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: 'numeric',
                                                })}</time>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default My_Status;

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

    if (!tokenInfo || tokenInfo.role !== 'client' || tokenInfo.active === false) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    };
};
