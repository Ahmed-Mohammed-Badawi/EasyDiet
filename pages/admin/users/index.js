import {useEffect, useRef, useState} from "react";
import classes from '@/styles/pages/admin/users.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";
import axios from "axios";

const Users = () => {
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Y1MTlhNzdiMDU0ZDM4OGM5ZGI5ZjkiLCJyb2xlIjoiYWRtaW4iLCJhY3RpdmUiOnRydWUsImlhdCI6MTY4MTI1NzYzOSwiZXhwIjoxNjgxMzQ0MDM5fQ.AVgvwqtT3u8B9w5tRTeAE0pAXK-GSdoKZOqsKU-uOtg`;

    // ROUTER
    const router = useRouter();

    // STATES
    const [isOn, setIsOn] = useState(false);
    const [isUserActive, setIsUserActive] = useState(false);

    const handleClick = (e) => {
        setIsOn(e.target.checked);
    };

    const checkEmployees = () => {
        setIsOn(true);
    }
    const checkClients = () => {
        setIsOn(false);
    }

    // EFFECT TO GET THE USERS
    useEffect(() => {
        if(isOn){
            // GET THE EMPLOYEES
            axios.get(`https://api.easydietkw.com/api/v1/get/all/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }else {
            // GET THE USERS
            axios.get(`https://api.easydietkw.com/api/v1/all/clients?page=1`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
    }, [isOn])

    return (
        <>
            <main className={classes.Main}>
                <div className={classes.Container}>
                    <div className={classes.Top}>
                        <button onClick={() => router.push(`/admin/create/create_employee`)}>
                            <Image src={'/images/Add_Icon.svg'} alt={'Add Icon'} width={18} height={18}/>
                            <span>Create An Employee</span>
                        </button>
                        <div className={classes.Toggle_container}>
                            <span onClick={checkClients}>CLIENTS</span>
                            <div className={classes.UserToggler}>
                                <label htmlFor={'users_type'}
                                       className={[classes.toggle_container, isOn ? classes.Employees : ''].join(' ')}>
                                </label>
                                <input
                                    id={'users_type'}
                                    type="checkbox"
                                    name="toggle"
                                    checked={isOn}
                                    onChange={handleClick}
                                />
                            </div>
                            <span onClick={checkEmployees}>EMPLOYEES</span>
                        </div>
                        <div className={classes.Search}>
                            <button>
                                <Image src={'/images/Search_Icon.svg'} alt={'Add Icon'} width={18} height={18}/>
                            </button>
                            <input type={'text'} alt={'search'} placeholder={'search'}/>
                        </div>
                    </div>
                    <div className={classes.Bottom}>
                        <table className={classes.table}>
                            <thead>
                            <tr>
                                <th>USER ID</th>
                                <th>USER NAME</th>
                                <th>MOBILE</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={classes.row}>
                                <td>6585s845df41751241524</td>
                                <td>Ahmed Mohammed</td>
                                <td>01020985828</td>
                                <td><span
                                    className={[classes.SubscriptionButton, isUserActive ? classes.Active : classes.Inactive].join(' ')}>{isUserActive ? `Active` : 'Inactive'}</span>
                                </td>
                                <td className={classes.Actions}>
                                    <button className={classes.Freeze}>Freeze</button>
                                    <button className={classes.Deactivate}>Deactivate</button>
                                    <button className={classes.Delete}>
                                        <Image src={'/images/Delete_Icon.svg'} alt={'Delete'} width={14}
                                               height={14}/> Delete
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className={classes.table}>
                            <thead>
                            <tr>
                                <th>IMAGE</th>
                                <th>USER NAME</th>
                                <th>MOBILE</th>
                                <th>ROLE</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={classes.row}>
                                <td>
                                    <div className={classes.UserImage}>
                                        <Image src={'/images/Auth/dl.beatsnoop.com-3000-H6LQJm7ZRo.png'}
                                               alt={'User Image'} width={40} height={40}/>
                                    </div>
                                </td>
                                <td>Ahmed Mohammed</td>
                                <td>01020985828</td>
                                <td><span
                                    className={classes.SubscriptionButton}>Admin</span>
                                </td>
                                <td className={classes.Actions}>
                                    <button className={classes.Edit}>Edit</button>
                                    <button className={classes.Deactivate}>Deactivate</button>
                                    <button className={classes.Delete}>
                                        <Image src={'/images/Delete_Icon.svg'} alt={'Delete'} width={14}
                                               height={14}/> Delete
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.Table_Pagination}>
                        <button>
                            <Image src={'/images/Arrow-Left_Icon.svg'} alt={'Arrow Left'} width={15} height={15}/>
                        </button>
                        <button>
                            <Image src={'/images/Arrow-Right_Icon.svg'} alt={'Arrow Right'} width={15} height={15}/>
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Users