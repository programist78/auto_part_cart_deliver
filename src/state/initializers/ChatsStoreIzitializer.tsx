'use client'
import { Chat } from '@config/types'
import useChatsStore from '@stores/useChatsStore'
import React, { useRef } from 'react'

const ChatsStoreIzitializer: React.FC<{ chats: Array<Chat> }> = ({ chats }) => {

    const initialized = useRef(false)

    if (!initialized.current) {
        useChatsStore.setState({ chats })
        initialized.current = true
    }

    return null
}

export default ChatsStoreIzitializer
