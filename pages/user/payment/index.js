import Image from 'next/image';
import {useState} from 'react';
import styles from '@/styles/pages/user/paymentMethod.module.scss';

const PaymentMethods = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit payment method
    };

    return (
        <div className={styles.paymentMethods}>
            <h1>Payment Method</h1>
            <h2 className={styles.paymentValue}>Total Payment: $50.00</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.paymentMethodList}>
                    <div className={styles.paymentMethod}>
                        <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="knet"
                            checked={selectedPaymentMethod === 'knet'}
                            onChange={handlePaymentMethodChange}
                            className={styles.paymentMethodInput}
                        />
                        <label htmlFor="paypal" className={styles.paymentMethodLabel}>
                            <Image src="/images/knet.jpg" alt="knet" width={50} height={50}/>
                        </label>
                    </div>
                    <div className={styles.paymentMethod}>
                        <input
                            type="radio"
                            id="visa"
                            name="paymentMethod"
                            value="visa"
                            checked={selectedPaymentMethod === 'visa'}
                            onChange={handlePaymentMethodChange}
                            className={styles.paymentMethodInput}
                        />
                        <label htmlFor="visa" className={styles.paymentMethodLabel}>
                            <Image
                                src="/images/visa.jpg"
                                alt="visa"
                                width={50}
                                height={50}
                            />
                        </label>
                    </div>
                    <div className={styles.paymentMethod}>
                        <input
                            type="radio"
                            id="mastercard"
                            name="paymentMethod"
                            value="mastercard"
                            checked={selectedPaymentMethod === 'mastercard'}
                            onChange={handlePaymentMethodChange}
                            className={styles.paymentMethodInput}
                        />
                        <label htmlFor="mastercard" className={styles.paymentMethodLabel}>
                            <Image
                                src="/images/mastercard.jpg"
                                alt="mastercard"
                                width={50}
                                height={50}
                            />
                        </label>
                    </div>
                </div>
                <button type="submit" className={styles.submitButton}>
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentMethods;
