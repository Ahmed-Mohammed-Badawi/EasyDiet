import classes from '@/styles/pages/user/my_status.module.scss';
import Image from "next/image";
import {onInputChange} from "@/redux/slices/user/profile_slice";
import Spinner from "@/components/layout/spinner/Spinner";
import {useRouter} from "next/router";
const My_Status = () => {
    //ROUTER
    const router = useRouter();

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
                                <Image src={'/images/Auth/next-icon.svg'} alt={'go back'} width={25} height={25} />
                            </button>
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <div className={classes.Bottom_P1}>
                            <div className={classes.P1_Item}>
                                <div>
                                    <p>weight</p>
                                    <span>105 KG</span>
                                </div>
                                <div className={classes.Image_Container}>
                                    <Image src={'/images/Global/weight.png'} alt={'weight'} width={50} height={50} />
                                </div>
                            </div>
                            <div className={classes.P1_Item}>
                                <div>
                                    <p>Height</p>
                                    <span>105 CM</span>
                                </div>
                                <div className={classes.Image_Container}>
                                    <Image src={'/images/Global/height.png'} alt={'weight'} width={60} height={60} />
                                </div>
                            </div>
                        </div>
                        <div className={classes.Bottom_P2}>
                            <div className={classes.Message}>
                                <h3>QUESTION</h3>
                                <p>What are some common symptoms of a cold?</p>

                                <div className={classes.Response}>
                                    <h4>DOCTOR RESPONSE (Ahmed Mohammed)</h4>
                                    <p>
                                        Common symptoms of a cold include a runny or stuffy nose, cough, sore throat, body aches, and mild fever. It is usually caused by a viral infection and can be treated with over-the-counter medication to alleviate symptoms. It&#39;s important to rest and stay hydrated to help your body fight off the infection. If symptoms worsen or last longer than a week, it&#39;s best to seek medical advice.
                                    </p>
                                </div>

                                <div className={classes.Doctor}>
                                    <div className={classes.Doctor_Image_Container}>
                                        <Image src={'/images/Global/weight.png'} alt={'Doctor image'} width={50} height={50} />
                                    </div>
                                    <div>
                                        <h4>Ahmed Mohammed</h4>
                                        <time>15 Feb, 2023</time>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.Message}>
                                <h3>QUESTION</h3>
                                <p>What are some common symptoms of a cold?</p>

                                <div className={classes.Response}>
                                    <h4>DOCTOR RESPONSE (Ahmed Mohammed)</h4>
                                    <p>
                                        Common symptoms of a cold include a runny or stuffy nose, cough, sore throat, body aches, and mild fever. It is usually caused by a viral infection and can be treated with over-the-counter medication to alleviate symptoms. It&#39;s important to rest and stay hydrated to help your body fight off the infection. If symptoms worsen or last longer than a week, it&#39;s best to seek medical advice.
                                    </p>
                                </div>

                                <div className={classes.Doctor}>
                                    <div className={classes.Doctor_Image_Container}>
                                        <Image src={'/images/Global/weight.png'} alt={'Doctor image'} width={50} height={50} />
                                    </div>
                                    <div>
                                        <h4>Ahmed Mohammed</h4>
                                        <time>15 Feb, 2023</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default My_Status;