import { Button } from '@material-ui/core'
import Head from 'next/head'
import styled from 'styled-components'
import { auth, provider } from "../firebase"
const Login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-icone.png" />
                <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
display: grid;
place-items: center;
height:100vh;
background-color:whitesmoke;
`;
const LoginContainer = styled.div`
padding:100px;
background-color:#fff;
display:flex;
flex-direction:column;
align-items: center;
border-radius:5px;
`;

const Logo = styled.img`
 height:200px;
 width:200px;
 margin-bottom:50px;
`;