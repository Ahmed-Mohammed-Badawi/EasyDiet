import React, {useState} from 'react';
import styles from '@/styles/pages/global/License.module.scss';

const License = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>License Agreement</h1>
                <div className={styles.rules}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet
                        justo id semper euismod. Proin commodo ipsum vel tellus euismod, id
                        blandit metus pharetra. Sed vitae metus vel velit malesuada mollis.
                        Suspendisse porta ultrices metus, at semper dolor lobortis vel.
                        Nulla facilisi. Sed ac diam lorem.
                    </p>
                    <p>
                        Morbi convallis, quam nec rutrum euismod, elit elit commodo velit,
                        id mattis augue neque eget mauris. Nulla facilisi. Fusce nec augue
                        vel dolor viverra dapibus. Donec id risus odio.
                    </p>
                    <p>
                        Aliquam commodo varius augue, quis venenatis nisi placerat vitae.
                        Praesent ut risus eu nibh ultrices finibus. Sed ut justo ante.
                    </p>
                    <p>
                        Nulla facilisi. Mauris eget libero vel eros aliquam malesuada. Donec
                        at orci vitae sem eleifend rutrum nec a quam. Proin bibendum euismod
                        libero eget tincidunt.
                    </p>
                    <p>
                        Donec tincidunt efficitur metus, in lobortis diam iaculis in. Nulla
                        tincidunt sagittis est, eget ultrices elit euismod a. Nunc eu ex
                        velit.
                    </p>
                    <p>
                        Donec vel est fermentum, ultricies sapien eget, laoreet massa. Sed
                        vel nibh libero. Sed quis nulla urna. In iaculis, urna at elementum
                        dapibus, ipsum nulla dictum libero, eu pharetra ante dolor in risus.
                    </p>
                    <p>
                        Donec eget lorem quis sem maximus auctor. Nam vehicula enim et nunc
                        iaculis, vel tristique orci convallis. Duis vel nunc nec nunc
                        sollicitudin bibendum.
                    </p>
                    <p>
                        Nulla facilisi. Praesent consequat nunc eros, sit amet ultricies
                        eros vehicula at. Proin aliquet turpis vel nibh rutrum, in mollis
                        velit auctor.
                    </p>
                    <p>
                        Nullam eget felis sit amet felis pretium molestie sit amet in erat.
                        In ultrices massa eget porttitor blandit. Integer nec purus vel quam
                        placerat aliquet. Proin sit amet interdum magna. Integer bibendum,
                        quam eget tristique hendrerit, eros ex volutpat nulla, vitae
                        bibendum quam neque sed mauris. Nam sagittis tristique justo, id
                        finibus ex dapibus eget.
                    </p>
                </div>
                <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        id="license-checkbox"
                        className={styles.checkbox}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="license-checkbox" className={styles.label}>
                        I have read and agree to the terms of the license agreement.
                    </label>
                </div>
                <button
                    className={`${styles.button} ${isChecked ? '' : styles.disabled}`}
                    disabled={!isChecked}
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default License;