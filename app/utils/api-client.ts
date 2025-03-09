import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID } from '@/config'

const userPrefix = `user_${APP_ID}:`
const SESSION_KEY = 'session_id'

export const getSessionId = () => {
    let sessionId = localStorage.getItem(SESSION_KEY)
    if (!sessionId) {
        sessionId = v4()
        localStorage.setItem(SESSION_KEY, sessionId)
    }
    return sessionId
}

export const getUserId = () => {
    const sessionId = getSessionId()
    return userPrefix + sessionId
}

export const client = new ChatClient(API_KEY, API_URL || undefined)

// API 函数
export const renameConversation = async (conversationId: string, name: string, autoGenerate = false) => {
    const userId = getUserId()
    const response = await client.renameConversation(conversationId, name, userId, autoGenerate)
    return response.data
}

export const createConversation = async () => {
    const userId = getUserId()
    const response = await client.createConversation(userId)
    return response.data
}

export const getConversations = async () => {
    const userId = getUserId()
    const response = await client.getConversations(userId)
    return response.data
}

export const sendMessage = async (conversationId: string, message: string) => {
    const userId = getUserId()
    const response = await client.sendMessage(conversationId, message, userId)
    return response.data
}

export const getMessages = async (conversationId: string) => {
    const userId = getUserId()
    const response = await client.getMessages(conversationId, userId)
    return response.data
}