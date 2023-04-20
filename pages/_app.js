import '@/styles/globals.scss'
// TRANSLATION
import {I18nextProvider} from 'react-i18next';
import i18n from "@/i18n";
// REDUX
import {Provider} from 'react-redux'
import wrapper, {store} from '../redux/store'
// IMPORTS
import Layout from "@/components/layout/Layout";
import NextNProgress from 'nextjs-progressbar';

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/router";

function MyApp({Component, pageProps}) {
    //ROUTER
    const router = useRouter()

    return (
        <I18nextProvider i18n={i18n}>
            <NextNProgress color={`#A71523`}/>
            <Provider store={store}>
                {(router.pathname.includes('/admin') || router.pathname.includes('/user')) ? (
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    ) :
                    (
                        <Component {...pageProps} />
                    )
                }
            </Provider>
            <ToastContainer position="bottom-right"/>
        </I18nextProvider>
    )
}

export default wrapper.withRedux(MyApp)
