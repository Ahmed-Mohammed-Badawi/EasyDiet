import classes from './Layout.module.scss';
// IMPORTS
import Navbar from "@/components/layout/navbar/Navbar";
import Aside from "@/components/layout/aside/Aside";

const Layout = ({children}) => {
    return (
        <main className={classes.MainGrid} id={`mainLayout`}>
            <Navbar/>
            <section className={classes.PageContainer}>
                {children}
            </section>
            <Aside/>
        </main>
    )
}
export default Layout