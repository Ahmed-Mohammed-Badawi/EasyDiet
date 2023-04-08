import Image from "next/image";
import classes from './Navbar.module.scss';
import AsideClasses from '../aside/Aside.module.scss';
import LayoutClasses from '../Layout.module.scss';

const Navbar = () => {
    // TOGGLE FUNCTION
    const toggleAsideHandler = () => {
        // GET THE LAYOUT
        const Layout = document.getElementById(`mainLayout`);
        const Aside = document.getElementById(`AsideId`);
        // Update the Style
        // Aside.classList.toggle(AsideClasses.Aside_Mini)
        // Layout.classList.toggle(LayoutClasses.Aside_Mini)
    }

    return (
        <nav className={classes.Navbar}>
            <div>
                <Image src={'/images/Auth/logo.svg'} alt={'logo'} width={75} height={75} />
            </div>
            <button className={classes.Navbar_Button} onClick={toggleAsideHandler}>
                <span></span>
                <span></span>
            </button>
        </nav>
    )
}
export default Navbar