import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const techImages = [
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop', // Group learning / hackathon
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop', // Team discussing laptop
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop', // Colleagues coding
    'https://images.unsplash.com/photo-1515378960530-7c0da6231d6d?q=80&w=600&auto=format&fit=crop', // Beautiful coding setup
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop', // MacBook code
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop', // Students working together
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop', // UI/UX design board
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop', // Code on screen close up
    'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?q=80&w=600&auto=format&fit=crop', // Group project
    'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&auto=format&fit=crop', // Development environment
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop', // Hands on laptop
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop', // Data on screen
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=600&auto=format&fit=crop', // Collaboration table
]

const fallbackImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop' // MacBook code

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array
}

const generateSquares = () => {
    return shuffle([...techImages]).slice(0, 9).map((src, i) => ({
        id: i,
        src,
    }))
}

export function ShuffleGrid() {
    const timeoutRef = useRef(null)
    const [squares, setSquares] = useState(generateSquares)

    useEffect(() => {
        shuffleSquares()
        return () => clearTimeout(timeoutRef.current)
    }, [])

    const shuffleSquares = () => {
        setSquares((prevSquares) => {
            // Pick a random square to replace
            const squareIndexToRemove = Math.floor(Math.random() * prevSquares.length)
            const currentImageSrcs = prevSquares.map((sq) => sq.src)

            // Find an image that is NOT currently displayed
            const availableImages = techImages.filter(val => !currentImageSrcs.includes(val))
            // If we run out of images for some reason, just use the fallback
            const randomNewImage = availableImages.length > 0
                ? availableImages[Math.floor(Math.random() * availableImages.length)]
                : fallbackImage

            const newSquares = [...prevSquares]
            newSquares[squareIndexToRemove] = {
                id: Math.random(), // new ID so framer-motion sees a change
                src: randomNewImage,
            }
            return newSquares
        })

        timeoutRef.current = setTimeout(shuffleSquares, 3000)
    }

    return (
        <div className="grid h-[450px] w-full grid-cols-3 grid-rows-3 gap-2 sm:h-[550px] md:gap-3">
            {squares.map((sq) => (
                <motion.div
                    key={sq.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full w-full overflow-hidden rounded-xl bg-primary/10 shadow-soft"
                >
                    <img
                        src={sq.src}
                        alt="HackMate students & tech"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null; // prevent infinite loop if fallback also fails
                            e.target.src = fallbackImage;
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}
