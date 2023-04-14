import {useRef, useState} from "react";
import classes from '@/styles/pages/register.module.scss';
import Image from "next/image";
import Link from "next/link";
// IMPORTS
import CustomSelect from "@/components/pages/register/custom-select";
import {toast} from "react-toastify";
import axios from "axios";

const Register = () => {

    // REFS
    const PartsContainerRef = useRef();
    const NextButton = useRef();
    const CreateButtonRef = useRef();
    const PreviousPartRef = useRef();
    // INPUTS REF
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const [gender, setGender] = useState();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    //P2
    const regionRef = useRef();
    const streetRef = useRef();
    const houseRef = useRef();
    const floorRef = useRef();
    const apartmentRef = useRef();


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
        //GET THE VALUES OF THE FIRST PART INPUTS
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        // CHECK IF THE DATA OF THE FIRST PART IS VALID
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            toast.error(`Please fill all fields first`);
            return
        }
        if (password !== confirmPassword) {
            toast.error(`password and confirm password are not the same`);
            return
        }

        // Add the Class from the container
        PartsContainerRef.current.classList.add(classes.P2_Active)
        // Hide the Next Button
        NextButton.current.classList.add(classes.Un_Active)
        // Show the Next Button
        CreateButtonRef.current.classList.remove(classes.Un_Active)
        // Show the Previous Part Link
        PreviousPartRef.current.classList.remove(classes.Un_Active)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check that required fields are filled in
        if (!firstNameRef.current.value || !lastNameRef.current.value || !emailRef.current.value || !phoneRef.current.value || !gender || !passwordRef.current.value || !confirmPasswordRef.current.value) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Check that password and confirm password match
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            toast.error('Passwords do not match');
            return;
        }

        console.log(phoneRef.current.value.length)

        if(phoneRef.current.value.length !== 8){
            toast.error("Please Enter valid phone number");
            return;
        }

        if(phoneRef.current.value[0] !== "9" && phoneRef.current.value[0] !== "6" && phoneRef.current.value[0] !== "5"){
            toast.error("The phone number must starts with 9 || 6 || 5");
            return;
        }

        // Submit form data here
        try {
            await axios.post(`https://api.easydietkw.com/api/v1/register/new/client`, {
                clientName: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
                phoneNumber: phoneRef.current.value,
                email: emailRef.current.value,
                gender: gender,
                district: regionRef.current.value,
                streetName: streetRef.current.value,
                homeNumber: houseRef.current.value,
                floorNumber: floorRef.current.value,
                password: passwordRef.current.value,
                confirmPassword: confirmPasswordRef.current.value
            })

            // Reset form inputs
            firstNameRef.current.value = '';
            lastNameRef.current.value = '';
            emailRef.current.value = '';
            phoneRef.current.value = '';
            setGender('');
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            regionRef.current.value = '';
            streetRef.current.value = '';
            houseRef.current.value = '';
            floorRef.current.value = '';
            apartmentRef.current.value = '';

            // Display success message
            toast.success('Form submitted successfully');

        } catch (e) {
            console.log(e)
            toast.error(e.response.data.message || e.message)
        }
    }

    // GOOGLE HANDLER
    const googleHandler = async () => {
        try{
            await axios.get(`https://api.easydietkw.com/api/v1/auth/google`)
                .then(res => {
                    window.location.href = `${res.data.authUrl}`;
                })
        }catch (e) {
            console.log(e)
        }
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
                        <form className={classes.Form} onSubmit={handleSubmit}>
                            <h2 className={classes.Heading_2}>REGISTER</h2>
                            <div className={classes.Parts_Container} ref={PartsContainerRef}>
                                <div className={classes.Form_P1}>
                                    <div className={classes.Input_Container}>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'firstname'}>FIRST NAME</label>
                                            <input ref={firstNameRef} type={'text'} id={'firstname'}
                                                   name={'first name'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'lastname'}>LAST NAME</label>
                                            <input ref={lastNameRef} type={'text'} id={'lastname'} name={'last name'}/>
                                        </div>
                                    </div>
                                    <div className={classes.Input_Group}>
                                        <label htmlFor={'email'}>EMAIL</label>
                                        <input ref={emailRef} type={'email'} id={'email'} name={'email'}/>
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'phone_number'}>PHONE NUMBER</label>
                                            <input ref={phoneRef} type={'tel'} id={'phone_number'}
                                                   name={'phone number'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'gender'}>GENDER</label>
                                            <CustomSelect
                                                defaultValue={gender || ''}
                                                changed={(values) => {
                                                    console.log(values)
                                                    setGender(values.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'password'}>PASSWORD</label>
                                            <input ref={passwordRef} type={'password'} id={'password'}
                                                   name={'password'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'confirm_password'}>CONFIRM PASSWORD</label>
                                            <input ref={confirmPasswordRef} type={'password'} id={'confirm_password'}
                                                   name={'confirm password'}/>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.Form_P2}>
                                    <div className={classes.Input_Group}>
                                        <label htmlFor={'Region'}>REGION</label>
                                        <input ref={regionRef} type={'text'} id={'Region'} name={'Region'}/>
                                    </div>
                                    <div className={classes.Input_Group}>
                                        <label htmlFor={'street'}>STREET</label>
                                        <input ref={streetRef} type={'text'} id={'street'} name={'street'}/>
                                    </div>
                                    <div className={classes.Input_Container}>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'HOUSE'}>HOUSE</label>
                                            <input ref={houseRef} type={'text'} id={'HOUSE'} name={'HOUSE'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'FLOOR'}>FLOOR</label>
                                            <input ref={floorRef} type={'text'} id={'FLOOR'} name={'FLOOR'}/>
                                        </div>
                                        <div className={classes.Input_Group}>
                                            <label htmlFor={'Apartment'}>APARTMENT</label>
                                            <input ref={apartmentRef} type={'text'} id={'Apartment'}
                                                   name={'Apartment'}/>
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
                                    <button type={'button'} onClick={googleHandler} className={classes.Google_button}>
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