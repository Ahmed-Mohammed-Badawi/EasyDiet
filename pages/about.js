import Image from "next/image";
import classes from '@/styles/pages/global/about.module.scss';
import {useRouter} from "next/router";

const About = () => {
    const router = useRouter();


    return (
        <>
            <div className={classes.Container}>
                <main className={classes.Main}>
                    <div className={classes.Top}>
                        <div className={classes.Logo} onClick={() => router.push('/')}>
                            <Image src={'/images/Auth/logo.svg'} alt={'logo'} width={70} height={40}/>
                        </div>
                        <button className={classes.Go_Back} onClick={() => router.push('/')}>
                            <Image src={'/images/Auth/next-icon.svg'} alt={'go back to home'} width={25} height={25}/>
                        </button>
                    </div>
                    <div className={classes.Bottom}>
                        <h1 className={classes.Header}>who are we</h1>
                        <div className={classes.Content}>
                            <div className={classes.Content_Text}>
                                <p>EasyDiet: Providing Healthy Meals for Over 5 Years</p>
                                <p>EasyDiet is a company that has been providing healthy meal options for over five
                                    years. Their restaurant offers a diverse menu of delicious, healthy meals that are
                                    perfect for people who are looking to maintain a healthy lifestyle. The company has
                                    a team of experienced chefs who use fresh, locally-sourced ingredients to prepare
                                    each meal.</p>
                                <p>EasyDiet&apos;s dedication to providing healthy meals that are both delicious and
                                    convenient has made them a popular choice for many people. Customers have reported
                                    feeling more energized and healthier after consuming their meals. If you are looking
                                    for a healthy meal option that is both tasty and convenient, EasyDiet is the way to
                                    go.
                                </p>
                            </div>
                            <div className={classes.Content_Social}>
                                <button>
                                    <Image src={'/images/Global/Facebook_Icon.svg'} alt={'facebook account'} width={25} height={25} />
                                </button>
                                <button>
                                    <Image src={'/images/Global/Whatsapp_Icon.svg'} alt={'facebook account'} width={25} height={25} />
                                </button>
                                <button>
                                    <Image src={'/images/Global/Twitter_Icon.svg'} alt={'facebook account'} width={25} height={25} />
                                </button>
                                <button>
                                    <Image src={'/images/Global/Instagram_Icon.svg'} alt={'facebook account'} width={25} height={25} />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default About;