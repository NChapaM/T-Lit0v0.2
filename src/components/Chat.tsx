import React, { useState, useRef, useEffect } from 'react'
import { Send, ThumbsUp, ThumbsDown, Upload, RefreshCw } from 'lucide-react'

interface ChatProps {
  messages: Array<{ role: string; content: string; feedback?: 'positive' | 'negative' }>
  onSendMessage: (message: string) => void
  onFeedback: (index: number, feedback: 'positive' | 'negative') => void
  onUploadImage: (file: File) => void
  onClearConversation: () => void
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage, onFeedback, onUploadImage, onClearConversation }) => {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input)
      setInput('')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUploadImage(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-white rounded-lg shadow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </span>
            {message.role === 'assistant' && (
              <div className="mt-2">
                <button
                  onClick={() => onFeedback(index, 'positive')}
                  className={`mr-2 p-1 rounded ${
                    message.feedback === 'positive' ? 'bg-green-500 text-white' : 'text-gray-500 hover:text-green-500'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onFeedback(index, 'negative')}
                  className={`p-1 rounded ${
                    message.feedback === 'negative' ? 'bg-red-500 text-white' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <button
          type="button"
          onClick={onClearConversation}
          className="bg-gray-200 text-gray-600 p-2 rounded-l-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          title="Limpiar conversación"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe tu mensaje..."
        />
        <button
          type="button"
          onClick={triggerFileInput}
          className="bg-green-500 text-white p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          title="Subir imagen"
        >
          <Upload className="w-6 h-6" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Enviar mensaje"
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  )
}

export default Chat