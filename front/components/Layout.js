import 'semantic-ui-css/semantic.min.css'
import {Container} from 'semantic-ui-react'
import Header from './Header';

export default function Layout({children}) {
    return <Container>
        <Header/>
        {children}
    </Container>
}
