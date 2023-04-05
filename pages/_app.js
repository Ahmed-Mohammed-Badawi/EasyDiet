import '@/styles/globals.scss'
// TRANSLATION
import {I18nextProvider} from 'react-i18next';
import i18n from "@/i18n";
// REDUX
import {Provider} from 'react-redux'
import {createWrapper} from 'next-redux-wrapper'
import store from '../redux/store'

function MyApp({Component, pageProps}) {
    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </I18nextProvider>
    )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
