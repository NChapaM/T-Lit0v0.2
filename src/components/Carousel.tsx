import React, { useState, useEffect } from 'react'
import ContentCard from './ContentCard'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface CarouselProps {
  items: Array<{
    icon: React.ReactNode
    title: string
    description: string
  }>
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(timer)
  }, [items.length])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  return (
    <div className="relative pt-12 pb-12">
      <div className="overflow-hidden h-[calc(3*6rem)]">
        <div
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: `translateY(-${currentIndex * 6}rem)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="mb-4">
              <ContentCard {...item} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <ChevronUp className="w-6 h-6 text-gray-600" />
      </button>
      <button
        onClick={handleNext}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <ChevronDown className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  )
}

export default Carousel