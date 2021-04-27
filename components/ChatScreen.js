import { Avatar, IconButton } from "@material-ui/core"
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@material-ui/icons"
import { useRouter } from "next/router"
import { useState, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import styled from "styled-components"
import { auth, db } from "../firebase"
import firebase from "firebase"
import Message from "../components/Message"
import getRecipientEmail from "../utils/getRecipientEmail"
import TimeAgo from "timeago-react"
const ChatScreen = ({ chat, messages }) => {
    const [user] = useAuthState(auth)
    const [text, setText] = useState("")
    const endOfMessagesDiv = useRef(null)
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection("messages").orderBy('timestamp', 'asc'))
    const recipientEmail = getRecipientEmail(chat.users, user)
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail))
    const recipient = recipientSnapshot?.docs?.[0]?.data();


    const scrollToBottom = () => {
        endOfMessagesDiv.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => {
                return (
                    <Message
                        key={message.id}
                        user={message.data().user}
                        message={{
                            ...message.data(),
                            timestamp: message.data().timestamp?.toDate().getTime(),
                        }}
                    />
                )
            })
        } else {
            return JSON.parse(messages).map((message) => {
                <Message key={message.id} user={message.user} message={message} />
            })
        }
    }
    const sendMessage = e => {
        e.preventDefault();
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: text,
            user: user.email,
            photoURL: user.photoURL,
        });
        setText('')
        scrollToBottom()
    }
    return (
        <Container>
            <Header>
                {recipient ?
                    <Avatar src={recipient?.photoURL} />
                    :
                    <Avatar >{recipientEmail[0]}</Avatar>
                }
                <HeaderInfo >
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active:{' '}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            ) : "Unavailable"}
                        </p>
                    ) : (
                        <p>Loading Last active...</p>
                    )}
                </HeaderInfo>
                <HeaderIcon>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </HeaderIcon>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessages ref={endOfMessagesDiv} />
            </MessageContainer>
            <InputContainer onSubmit={sendMessage}>
                <InsertEmoticon />
                <Input value={text} onChange={e => setText(e.target.value)} />
                <Mic />
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
`
const Header = styled.div`
position: sticky;
background-color:#fff;
z-index:100;
top:0;
display:flex;
padding:10px;
height:80px;
align-items:center;
border-bottom: 1px solid whitesmoke;
`
const HeaderInfo = styled.div`
margin-left:15px;
flex:1;
>h3{
    margin-bottom: 3px;
}
>p{
    font-size:14px;
    color: gray;
}
`
const HeaderIcon = styled.div``
const MessageContainer = styled.div`
padding:30px;
padding-bottom:0%;
background-color:#e5ded8;
min-height:90vh;
`
const EndOfMessages = styled.div``
const InputContainer = styled.form`
display: flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background-color:#fff;
z-index:100;
`
const Input = styled.input`
flex:1;
outline:0;
border:none;
border-radius:10px;
background-color: whitesmoke;
padding:10px;
margin-left:15px;
margin-right:15px;
`