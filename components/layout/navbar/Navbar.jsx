import Image from "next/image";
import classes from './Navbar.module.scss';

const Navbar = () => {
    // TOGGLE FUNCTION
    const toggleAsideHandler = () => {
        // GET THE LAYOUT
        document.body.classList.toggle('Active_Aside')
    }

    return (
        <nav className={classes.Navbar}>
            <div className={classes.Logo}>
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