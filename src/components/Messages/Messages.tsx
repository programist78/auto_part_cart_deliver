'use client'
import { useEffect, useState } from 'react'
import c from './Messages.module.scss'
import classNames from 'classnames'
import useChatsStore from '@stores/useChatsStore'
import useAuthStore from '@stores/useAuthStore'
import { Chat, Message } from '@config/types'
import axios from 'axios'
import Swal from 'sweetalert2'


const Messages: React.FC = () => {

  const chats = useChatsStore((state) => state.chats)
  const selectedChat = useChatsStore((state) => state.selectedChat)
  const setSelectedChat = useChatsStore((state) => state.setSelectedChat)
  const userData = useAuthStore((state) => state.userData)
  const selectedUser = selectedChat ? selectedChat.users.filter((item) => item._id !== userData._id)[0] : null

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Array<Message>>([])
  const messagesList = messages.map((message) => <Message key={message._id} isYours={message.user === userData._id} message={message.content} />)

  useEffect(() => {
    if (!selectedChat) return
    setIsLoading(true)
    const int = setInterval(() => {
      axios.get(`/api/messages?chat=${selectedChat._id}`).then(({ data }) => {
        setMessages(data.messages)
        setIsLoading(false)
      }).catch(() => {
        setSelectedChat(null)
        setIsLoading(false)
        Swal.fire({
          title: 'Something went wrong!',
          icon: 'error'
        })
      })
    }, 3000)

    return () => clearInterval(int)
  }, [selectedChat])

  const sendMessage = async () => {
    if (!selectedChat || !message) return
    axios.post('/api/messages', { text: message, to: selectedUser._id }).then(({ data }) => {
      setMessages((prev) => [ ...prev, data.message ])
    }).catch(() => {
      Swal.fire({
        title: 'Something went wrong!',
        icon: 'error'
      })
    })
    setMessage('')
  }

  return <article className={c.main}>
    <div className={c.contacts}>
      {chats.map((item, index) => <Chat key={`chat${index}`} chat={item} />)}
    </div>
    <div className={c.rigth}>
      <div className={c.top}>
        {selectedUser && <img className={c.avatar} src={selectedUser.avatarUrl ? selectedUser.avatarUrl : process.env.NEXT_PUBLIC_PERSON_ERROR} />}
        {selectedChat && <div className={c.user_info}>
          <h6>{selectedUser.fullname}</h6>
        </div>}
      </div>
      <div className={c.messages}>
        {!isLoading ? selectedChat ? messagesList : 'Select schat...' : 'Loading...'}
      </div>
      <div className={c.form}>
        <input placeholder='Message' onChange={(e) => setMessage(e.target.value)} value={message} />
        <button disabled={isLoading} onClick={sendMessage}>Send</button>
      </div>
    </div>
  </article>
}

const Message: React.FC<{ isYours?: boolean, message: string }> = ({ isYours, message }) => {
  return <div className={c.message_con}>
    <div className={isYours ? classNames(c.message, c.your) : classNames(c.message)}>
      {message}
    </div>
    <div className={isYours ? classNames(c.your, c.message_img) : classNames(c.message_img)} />
  </div>
}

const Chat: React.FC<{ chat:Chat }> = ({ chat }) => {

  const setSelectedChat = useChatsStore((state) => state.setSelectedChat)
  const userData = useAuthStore((state) => state.userData)
  const user = chat.users.filter((item) => item._id !== userData._id)[0]
  
  return <div className={c.contact} onClick={() => setSelectedChat(chat)}>
    <img src={user.avatarUrl ? user.avatarUrl : process.env.NEXT_PUBLIC_PERSON_ERROR} alt={user.fullname} onError={(e) => {
      e.currentTarget.src = process.env.NEXT_PUBLIC_PERSON_ERROR
    }}/>
  </div>
}

export default Messages
