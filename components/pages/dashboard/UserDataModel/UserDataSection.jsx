// UserDataSection.js

import React from 'react';
import styles from './UserDataSection.module.scss';
import i18n from "@/i18n";
import Image from "next/image";
import axios from "axios";
import {extractTokenFromCookie} from "@/helpers/extractToken";
import {toast} from "react-toastify";
import Spinner from "@/components/layout/spinner/Spinner";

const UserDataSection = ({userData, subscriptionData}) => {
    const [loading, setLoading] = React.useState(false);

    const handlePrint = () => {
        const token = extractTokenFromCookie(document.cookie);
        setLoading(true);
        axios.get(`https://api.easydietkw.com/api/v1/print/client/contract`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                clientId: userData?._id
            }
        })
            .then(res => {
                const url = res.data.url;
                setTimeout(() => {

                    window.open(url, '_blank');
                    setLoading(false);
                }, 1000)
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
                toast.error(i18n.language.includes('en') ? 'Something went wrong, please try again later' : 'حدث خطأ ما، يرجى المحاولة مرة أخرى')
            })
    }


    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3 className={styles.sectionHeader}>{i18n.language.includes('en') ? `Personal Data:` : `المعلومات الشخصية:`}</h3>
                <ul className={styles.list}>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Full Name:` : `الاسم:`}</span>{' '}
                        <span
                            className={styles.value}>{i18n.language.includes('en') ? (userData?.clientNameEn || userData?.clientName) : userData?.clientName}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Email:` : `البريد الالكتروني:`}</span>{' '}
                        <span className={styles.value}>{userData?.email}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Phone Number:` : `رقم الهاتف:`}</span>{' '}
                        <span className={styles.value}>{userData?.phoneNumber}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Gender:` : `النوع:`}</span>{' '}
                        <span className={styles.value}>{userData?.gender}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Region:` : `المحافظة(المنطقة):`}</span>{' '}
                        <span className={styles.value}>{userData?.distrect}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Street:` : `الشارع:`}</span>{' '}
                        <span className={styles.value}>{userData?.streetName}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `House` : `المنزل:`}</span>{' '}
                        <span className={styles.value}>{userData?.homeNumber}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Floor:` : `الطابق(الدور):`}</span>{' '}
                        <span className={styles.value}>{userData?.floorNumber}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Apartment:` : `الشقة:`}</span>{' '}
                        <span className={styles.value}>{userData?.appartment}</span>
                    </li>
                </ul>
            </div>
            <div className={styles.section}>
                <h3 className={styles.sectionHeader}>{i18n.language.includes('en') ? `Subscription Data:` : `معلومات الاشتراك:`}</h3>
                <ul className={styles.list}>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `MEMBERSHIP ID:` : `رقم العضوية:`}</span>{' '}
                        <span className={styles.value}>{userData?.subscriptionId}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Plan:` : `الباقة:`}</span>{' '}
                        <span
                            className={styles.value}>{i18n.language.includes('en') ? subscriptionData?.planEn : subscriptionData?.plan}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Status:` : `الحالة:`}</span>{' '}
                        <span
                            className={styles.value}>{userData?.subscriped ? (i18n.language.includes('en') ? "Subscribed" : "مشترك") : (i18n.language.includes('en') ? "Unsubscribed" : "غير مشترك")}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Starting Date:` : `تاريخ الابتداء:`}</span>{' '}
                        <span
                            className={styles.value}>{new Date(subscriptionData?.startDate).toLocaleDateString(i18n.language.includes('en') ? "en-US" : "ar-EG", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `End Date:` : `تاريخ الانتهاء:`}</span>{' '}
                        <span
                            className={styles.value}>{new Date(subscriptionData?.endDate).toLocaleDateString(i18n.language.includes('en') ? "en-US" : "ar-EG", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </li>
                    <li>
                        <span
                            className={styles.label}>{i18n.language.includes('en') ? `Remaining Days:` : `الايام المتبقية:`}</span>{' '}
                        <span className={styles.value}>{subscriptionData?.remainingDays}</span>
                    </li>
                </ul>
            </div>
            {userData?.subscriped && (<div className={styles.section}>
                <button className={styles.contractButton} onClick={handlePrint}>
                    <Image src={'/images/printer.png'} alt={'Add Icon'} width={18}
                           height={18}/>
                    {i18n.language.includes('en') ? `Print Contract` : `طباعة العقد`}
                    {loading && <Spinner color={'#ffffff'} size={1}/>}
                </button>
            </div>)}
        </div>
    );
};

export default UserDataSection;
