import React, { useState } from 'react'
import { Image, HelpCircle, Calendar, FileText, Phone, CreditCard } from 'lucide-react'
import Carousel from './components/Carousel'
import Chat from './components/Chat'

function App() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string; feedback?: 'positive' | 'negative' }>>([])

  const handleSendMessage = async (message: string) => {
    const newMessages = [...messages, { role: 'user', content: message }]
    setMessages(newMessages)

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu solicitud.' }]);
    }
  }

  const handleFeedback = (index: number, feedback: 'positive' | 'negative') => {
    setMessages(prevMessages => 
      prevMessages.map((msg, i) => 
        i === index ? { ...msg, feedback } : msg
      )
    )
  }

  const handleUploadImage = (file: File) => {
    console.log('Imagen subida:', file.name)
    // Aquí puedes implementar la lógica para enviar la imagen al backend
  }

  const handleClearConversation = () => {
    setMessages([])
  }

  const carouselItems = [
    { icon: <Image className="w-6 h-6 text-blue-500" />, title: 'Crea una Imagen', description: 'Genera imágenes únicas con IA' },
    { icon: <HelpCircle className="w-6 h-6 text-blue-500" />, title: 'Consultar un Incidente', description: 'Obtén ayuda sobre problemas específicos' },
    { icon: <Calendar className="w-6 h-6 text-blue-500" />, title: 'Calendario de Pagos', description: 'Consulta tus próximos pagos' },
    { icon: <FileText className="w-6 h-6 text-blue-500" />, title: 'Generar Reporte', description: 'Crea informes personalizados' },
    { icon: <Phone className="w-6 h-6 text-blue-500" />, title: 'Contacto de Soporte', description: 'Obtén ayuda directa de nuestro equipo' },
    { icon: <CreditCard className="w-6 h-6 text-blue-500" />, title: 'Estado de Cuenta', description: 'Revisa tu balance y transacciones' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 p-4 bg-white shadow-md flex flex-col">
        <h2 className="text-xl font-bold mb-4">Consejos de prompts</h2>
        <Carousel items={carouselItems} />
        <div className="mt-auto">
          <img src="/path/to/your/logo.png" alt="Logo corporativo" className="w-24 h-auto" />
        </div>
      </div>
      <div className="w-2/3 p-4">
        <Chat
          messages={messages}
          onSendMessage={handleSendMessage}
          onFeedback={handleFeedback}
          onUploadImage={handleUploadImage}
          onClearConversation={handleClearConversation}
        />
      </div>
    </div>
  )
}

export default App