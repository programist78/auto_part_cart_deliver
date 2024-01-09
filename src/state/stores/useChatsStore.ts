import { Chat } from '@config/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


export interface useChatsStoreType {
    chats: Array<Chat>
    selectedChat: Chat
    setSelectedChat: (chat: Chat) => void
}

const useChatsStore = create<useChatsStoreType>()(devtools((set) => ({
    chats: [],
    selectedChat: null,
    setSelectedChat: (chat) => set({ selectedChat: chat })
}), { name: 'useChatsStore' }))

export default useChatsStore