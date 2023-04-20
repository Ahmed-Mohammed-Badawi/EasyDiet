import {useEffect, useRef, useState} from "react";
import classes from '@/styles/pages/admin/users.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";

//HELPERS
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";

// REDUX
import {useSelector, useDispatch} from "react-redux";
import {setUsers, onInputChange} from '@/redux/slices/Admin/users-slice';
import {toast} from "react-toastify";
//IMPORTS
import Overlay from "@/components/pages/dashboard/ChangeUser_Name/overlay";
import InputsContainer from "@/components/pages/dashboard/ChangeUser_Name/inputsContainer";

const Users = () => {
    // ROUTER
    const router = useRouter();

    // STATES
    const [clientEditId, setClientEditId] = useState(false);

    //REF
    const searchInputRef = useRef();

    // REDUX
    const dispatch = useDispatch();
    const {users, usersType, isOn} = useSelector(state => state.users)

    const handleClick = (e) => {
        dispatch(onInputChange({key: 'isOn', value: e.target.checked}));
    };

    const checkEmployees = () => {
        dispatch(onInputChange({key: 'isOn', value: true}));
    }
    const checkClients = () => {
        dispatch(onInputChange({key: 'isOn', value: false}));
    }

    // EMPLOYEE FUNCTIONS
    async function employeeStatusChangeHandler(ID, isActive) {
        const token = extractTokenFromCookie(document.cookie);

        // GET THE EMPLOYEES
        axios.put(`https://api.easydietkw.com/api/v1/set/user/active`, {
            userId: ID,
            isActive: !isActive
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                const usersCopy = [...users];
                // SET THE USERS IN REDUX
                if (isActive) {
                    const index = usersCopy.findIndex(item => item._id === ID);

                    if (index !== -1) {
                        const objectCopy = {...usersCopy[index]}
                        objectCopy.isActive = false;
                        usersCopy[index] = objectCopy
                    }

                    dispatch(setUsers({users: usersCopy, usersType: 'employees'}))
                    toast.success(`The User account Deactivated`)

                } else {
                    const index = usersCopy.findIndex(item => item._id === ID);

                    if (index !== -1) {
                        const objectCopy = {...usersCopy[index]}
                        objectCopy.isActive = true;
                        usersCopy[index] = objectCopy
                    }

                    dispatch(setUsers({users: usersCopy, usersType: 'employees'}))
                    toast.success(`The User account Activated`)
                }
            })
            .catch(err => {
                toast.error(err.response?.data?.message || err.message);
            })
    }

    async function employeeDeleteHandler(ID) {
        const token = extractTokenFromCookie(document.cookie);

        window.confirm(`This Employee will be deleted. Are you sure you want to continue?`)
        {
            // GET THE EMPLOYEES
            axios.delete(`https://api.easydietkw.com/api/v1/delete/user?userId=${ID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    // SET THE USERS IN REDUX
                    const usersCopy = [...users];
                    // SET THE USERS IN REDUX
                    const index = usersCopy.findIndex(item => item._id === ID);

                    if (index !== -1) {
                        usersCopy.splice(index, 1);
                    }

                    dispatch(setUsers({users: usersCopy, usersType: 'employees'}))
                    toast.success(`User Deleted Successfully`)
                })
                .catch(err => {
                    toast.error(err.response?.data?.message || err.message);
                })
        }
    }

    // USERS
    async function handleFreeze(ID) {
        const token = extractTokenFromCookie(document.cookie);

        window.confirm(`Please not that by accepting you will freeze the subscription for this user. Are you sure you want to continue?`)
        {
            // GET THE EMPLOYEES
            axios.post(`https://api.easydietkw.com/api/v1/client/pause`, {
                clientId: ID
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    toast.success(`Account Froze Successfully`)
                })
                .catch(err => {
                    toast.error(err.response?.data?.message || err.message);
                })
        }
    }


    async function handleUnfreeze(ID) {
        const token = extractTokenFromCookie(document.cookie);
        window.confirm(`Please not that by accepting you will unfreeze the subscription for this user. Are you sure you want to continue?`)
        {
            // GET THE EMPLOYEES
            axios.put(`https://api.easydietkw.com/api/v1/activate/client`, {
                clientId: ID,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    // SET THE USERS IN REDUX
                    toast.success(`Account unFroze Successfully`)
                })
                .catch(err => {
                    toast.error(err.response?.data?.message || err.message);
                })
        }
    }

    async function handleDelete(ID) {
        const token = extractTokenFromCookie(document.cookie);

        if (window.confirm('This user will be deleted. Are you sure you want to continue')) {
            // GET THE EMPLOYEES
            axios.delete(`https://api.easydietkw.com/api/v1/admin/remove/client?clientId=${ID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    // SET THE USERS IN REDUX
                    toast.success(`User Deleted Successfully`)
                })
                .catch(err => {
                    toast.error(err.response?.data?.message || err.message);
                })
        }
    }

    async function handleSearch() {
        const token = extractTokenFromCookie(document.cookie);

        // GET THE EMPLOYEES
        axios.get(`https://api.easydietkw.com/api/v1/find/client?searchTerm=${searchInputRef.current.value}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                // SET THE USERS IN REDUX
                dispatch(setUsers({users: res.data.clients, usersType: 'clients'}))
            })
            .catch(err => {
                toast.error(err.response?.data?.message || err.message);
            })
    }

    function clearTheIdOfUser() {
        setClientEditId('')
    }

    // EFFECT TO GET THE USERS
    useEffect(() => {
        const token = extractTokenFromCookie(document.cookie);
        if (isOn) {
            // GET THE EMPLOYEES
            axios.get(`https://api.easydietkw.com/api/v1/get/all/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    // SET THE USERS IN REDUX
                    dispatch(setUsers({users: res.data.users, usersType: 'employees'}))
                })
                .catch(err => console.log(err))

        } else {
            // GET THE USERS
            axios.get(`https://api.easydietkw.com/api/v1/all/clients?page=1`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    // SET THE USERS IN REDUX
                    dispatch(setUsers({users: res.data.data.clients, usersType: 'clients'}))
                })
                .catch(err => console.log(err))
        }
    }, [isOn, dispatch])

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
                        {usersType === "clients" && (
                            <div className={classes.Search}>
                                <button onClick={handleSearch}>
                                    <Image src={'/images/Search_Icon.svg'} alt={'Add Icon'} width={18} height={18}/>
                                </button>
                                <input ref={searchInputRef} type={'text'} alt={'search'} placeholder={'search'}/>
                            </div>)}
                    </div>
                    <div className={classes.Bottom}>
                        {usersType === "clients" &&
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
                                {users && users.map((user) => {
                                    return (
                                        <tr className={classes.row} key={user._id}>
                                            <td>{user.subscriptionId}</td>
                                            <td className={classes.ClientName}>{user.clientNameEn || user.clientName}
                                                <span onClick={() => setClientEditId(user._id)}><Image
                                                    src={'/images/Edit_Icon.svg'} alt={'Edit'} width={20} height={20}/> </span>
                                            </td>
                                            <td>{user.phoneNumber}</td>
                                            <td><span
                                                className={[classes.SubscriptionButton, user.subscriped ? classes.Active : classes.Inactive].join(' ')}>{user.subscriped ? `Active` : 'Inactive'}</span>
                                            </td>
                                            <td className={classes.Actions}>
                                                <button className={classes.Freeze}
                                                        disabled={user.clientStatus.paused && user.clientStatus.numPause === 0}
                                                        onClick={() => {
                                                            if (user.clientStatus.paused !== true) {
                                                                handleFreeze(user._id, user.isActive)
                                                            } else {
                                                                handleUnfreeze(user._id)
                                                            }
                                                        }}>
                                                    {user.clientStatus.paused ? `UnFreeze` : `Freez`}

                                                </button>
                                                <button className={classes.Delete}
                                                        onClick={() => handleDelete(user._id)}>
                                                    <Image src={'/images/Delete_Icon.svg'} alt={'Delete'} width={14}
                                                           height={14}/> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>}
                        {usersType === "employees" &&
                            <table className={[classes.table, classes.tableEmployees].join(' ')}>
                                <thead>
                                <tr>
                                    <th>IMAGE</th>
                                    <th>NAME</th>
                                    <th>USERNAME</th>
                                    <th>MOBILE</th>
                                    <th>ROLE</th>
                                    <th>ACTIONS</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users && users.map((user) => {
                                    return (
                                        <tr className={classes.row} key={user._id}>
                                            <td>
                                                <div className={classes.UserImage}>
                                                    <Image src={`${user.userImage || '/images/no_image.webp'}`}
                                                           alt={'User Image'} width={40} height={40}/>
                                                </div>
                                            </td>
                                            <td>{user.fullName}</td>
                                            <td>{user.username}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td><span
                                                className={classes.SubscriptionButton}>{user.role}</span>
                                            </td>
                                            <td className={classes.Actions}>
                                                <button className={classes.Edit}
                                                        onClick={() => router.push(`/admin/edit/edit_employee?ID=${user._id}`)}>Edit
                                                </button>
                                                <button className={classes.Deactivate} onClick={() => {
                                                    employeeStatusChangeHandler(user._id, user.isActive)
                                                }}>{user.isActive ? 'Deactivate' : 'Activate'}</button>
                                                <button className={classes.Delete} onClick={() => {
                                                    employeeDeleteHandler(user._id)
                                                }}>
                                                    <Image src={'/images/Delete_Icon.svg'} alt={'Delete'} width={14}
                                                           height={14}/> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>}
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
            <Overlay active={clientEditId.length > 5} clicked={clearTheIdOfUser}>
                <InputsContainer clientId={clientEditId} clicked={clearTheIdOfUser}/>
            </Overlay>
        </>
    )
}
export default Users

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

    if (!tokenInfo || tokenInfo.role !== 'admin' || tokenInfo.active === false) {
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