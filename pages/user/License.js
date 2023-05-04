import React from 'react';
import styles from '@/styles/pages/global/License.module.scss';
import {useTranslation} from "react-i18next";

const License = () => {

    // TEXTS
    const {t} = useTranslation('license');

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>{t('title')}</h1>
                <div className={styles.rules}>
                    <ol>
                        <li>{t('list1')}</li>
                        <li>{t('list2')}</li>
                        <li>{t('list3')}</li>
                        <li>{t('list4')}</li>
                        <li>{t('list5')}</li>
                        <li>{t('list6')}</li>
                    </ol>
                    <h2>{t('title2')}</h2>
                    <ol>
                        <li>{t('list7')}</li>
                        <li>{t('list8')}</li>
                        <li>{t('list9')}</li>
                        <li>{t('list10')}</li>
                        <li>{t('list11')}</li>
                        <li>{t('list12')}</li>
                    </ol>
                    <h2>{t('title3')}</h2>
                    <p>{t('text')}</p>
                </div>
            </div>
        </div>
    );
};

export default License;