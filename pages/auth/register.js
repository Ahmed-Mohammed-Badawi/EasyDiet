import {useRef} from "react";
import classes from '@/styles/pages/register.module.scss';
import Image from "next/image";
import Link from "next/link";
// IMPORTS
import CustomSelect from "@/components/pages/register/custom-select";

const Register = () => {

    // REFS
    const PartsContainerRef = useRef();
    const NextButton = useRef();
    const CreateButtonRef = useRef();
    const PreviousPartRef = useRef();

    // FUNCTIONS
    const showPreviousPart = (e) => {
        // Stop reloading
        e.preventDefault();
        // Remove the Class from the container
        PartsContainerRef.current.classList.remove(classes.P2_Active)
        // Show the Next Button
        NextButton.current.classList.remove(classes.Un_Active)
        // Hide the Create Button
        CreateButtonRef.current.classList.add(classes.Un_Active)
        // Hide the Previous Part Link
        PreviousPartRef.current.classList.add(classes.Un_Active)
    }


    const showNextPart = (e) => {
        // Stop reloading
        e.preventDefault();
        // Add the Class from the container
        PartsContainerRef.current.classList.add(classes.P2_Active)
        // Hide the Next Button
        NextButton.current.classList.add(classes.Un_Active)
        // Show the Next Button
        CreateButtonRef.current.classList.remove(classes.Un_Active)
        // Show the Previous Part Link
        PreviousPartRef.current.classList.remove(classes.Un_Active)
    }


    return (
        <>
            <main className={classes.Main}>
                <div className={classes.Content}>
                    <div>
                        <Link href={'/'} passHref>
                            <Image src={'/images/Auth/logo.svg'} alt={'logo'} width={100} height={100}/>
                        </Link>
                    </div>
                    <div className={classes.Container}>
                        <div className={classes.Container_Text}>
                            <h1>EASY DIET</h1>
                            <p>BE ONE OF US</p>
                        </div>
                        <form className={classes.Form}>
                            <h2 className={classes.Heading_2}>REGISTER</h2>
                            <div className={classes.Parts_Container} ref={PartsContainerRef}>
                                <div className={classes.Form_P1}>
                                    <div className={classes.Input_Container}>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'firstname'}>FIRST NAME</label>
                                            <input type={'text'} id={'firstname'} name={'first name'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'lastname'}>LAST NAME</label>
                                            <input type={'text'} id={'lastname'} name={'last name'}/>
                                        </div>
                                    </div>
                                    <div className={classes.Input_Group}>
                                        <label htmlFor={'email'}>EMAIL</label>
                                        <input type={'email'} id={'email'} name={'email'}/>
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'phone_number'}>PHONE NUMBER</label>
                                            <input type={'tel'} id={'phone_number'} name={'phone nember'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'gender'}>GENDER</label>
                                            <CustomSelect/>
                                        </div>
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'password'}>PASSWORD</label>
                                            <input type={'password'} id={'password'} name={'password'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'confirm_password'}>CONFIRM PASSWORD</label>
                                            <input type={'password'} id={'confirm_password'} name={'confirm password'}/>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.Form_P2}>
                                    <div className={classes.Input_Group}>
                                        <label htmlFor={'Region'}>REGION</label>
                                        <input type={'text'} id={'Region'} name={'Region'}/>
                                    </div>
                                    <div className={classes.Input_Group}>
                                        <label htmlFor={'street'}>STREET</label>
                                        <input type={'text'} id={'street'} name={'street'}/>
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'HOUSE'}>HOUSE</label>
                                            <input type={'text'} id={'HOUSE'} name={'HOUSE'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'FLOOR'}>FLOOR</label>
                                            <input type={'text'} id={'FLOOR'} name={'FLOOR'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'Apartment'}>APARTMENT</label>
                                            <input type={'text'} id={'Apartment'} name={'Apartment'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.Form_buttons}>
                                <div className={classes.Links}>
                                    <Link className={classes.Un_Active} ref={PreviousPartRef} href={'#'}
                                          onClick={showPreviousPart}>
                                        &#8592; Previous info
                                    </Link>
                                    <Link href={'/auth/login'}>
                                        &#8592; Back to login
                                    </Link>
                                </div>
                                <div className={classes.Buttons_Container}>
                                    <button type={'button'} className={classes.Google_button}>
                                        <span><Image src={'/images/Auth/google-icon.svg'} alt={'Create User'} width={30}
                                                     height={30}/></span>
                                    </button>
                                    <button onClick={showNextPart} ref={NextButton} className={classes.Next_button}
                                            type={'button'}>
                                        <span>NEXT</span>
                                        <span><Image src={'/images/Auth/next-icon.svg'} alt={'Create User'} width={20}
                                                     height={20}/></span>
                                    </button>
                                    <button ref={CreateButtonRef}
                                            className={[classes.Create_button, classes.Un_Active].join(' ')}
                                            type={'submit'}>
                                        <span>CREATE</span>
                                        <span><Image src={'/images/Auth/next-icon.svg'} alt={'Create User'} width={20}
                                                     height={20}/></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Link href={'/'} passHref>
                    <button className={classes.Home_Button}>
                        <span><Image src={'/images/Auth/home-icon.svg'} alt={'home icon'} width={30}
                                     height={30}/></span>
                    </button>
                </Link>
            </main>
        </>
    )
}
export default Register