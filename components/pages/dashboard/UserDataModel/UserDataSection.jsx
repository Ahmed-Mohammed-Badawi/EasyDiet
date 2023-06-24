// UserDataSection.js

import React from 'react';
import styles from './UserDataSection.module.scss';
import i18n from "@/i18n";

const UserDataSection = ({ userData, subscriptionData }) => {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h3 className={styles.sectionHeader}>{i18n.language.includes('en') ? `Personal Data:` : `المعلومات الشخصية:`}</h3>
                <ul className={styles.list}>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Full Name:` : `الاسم:`}</span>{' '}
                        <span className={styles.value}>{i18n.language.includes('en') ?(userData?.clientNameEn || userData?.clientName) :userData?.clientName}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Email:` : `البريد الالكتروني:`}</span>{' '}
                        <span className={styles.value}>{userData?.email}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Phone Number:` : `رقم الهاتف:`}</span>{' '}
                        <span className={styles.value}>{userData?.phoneNumber}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Gender:` : `النوع:`}</span>{' '}
                        <span className={styles.value}>{userData?.gender}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Region:` : `المحافظة(المنطقة):`}</span>{' '}
                        <span className={styles.value}>{userData?.distrect}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Street:` : `الشارع:`}</span>{' '}
                        <span className={styles.value}>{userData?.streetName}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `House` : `المنزل:`}</span>{' '}
                        <span className={styles.value}>{userData?.homeNumber}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Floor:` : `الطابق(الدور):`}</span>{' '}
                        <span className={styles.value}>{userData?.floorNumber}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Apartment:` : `الشقة:`}</span>{' '}
                        <span className={styles.value}>{userData?.appartment}</span>
                    </li>
                </ul>
            </div>
            <div className={styles.section}>
                <h3 className={styles.sectionHeader}>{i18n.language.includes('en') ? `Subscription Data:` : `معلومات الاشتراك:`}</h3>
                <ul className={styles.list}>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Plan:` : `الباقة:`}</span>{' '}
                        <span className={styles.value}>{i18n.language.includes('en') ? subscriptionData?.planEn :  subscriptionData?.plan }</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Status:` : `الحالة:`}</span>{' '}
                        <span className={styles.value}>{userData?.subscriped ? (i18n.language.includes('en') ? "Subscribed" : "مشترك") : (i18n.language.includes('en') ? "Unsubscribed" : "غير مشترك")}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Starting Date:` : `تاريخ الابتداء:`}</span>{' '}
                        <span className={styles.value}>{new Date(subscriptionData?.startDate).toLocaleDateString(i18n.language.includes('en') ? "en-US" : "ar-EG", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `End Date:` : `تاريخ الانتهاء:`}</span>{' '}
                        <span className={styles.value}>{new Date(subscriptionData?.endDate).toLocaleDateString(i18n.language.includes('en') ? "en-US" : "ar-EG", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </li>
                    <li>
                        <span className={styles.label}>{i18n.language.includes('en') ? `Remaining Days:` : `الايام المتبقية:`}</span>{' '}
                        <span className={styles.value}>{subscriptionData?.remainingDays}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDataSection;
