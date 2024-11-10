import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"

export default function ETNCoinGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    if (!gameStarted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const coins: Coin[] = []
    const bombs: Bomb[] = []
    const particles: Particle[] = []
    const gravity = 6

    const coinImage = new Image()
    coinImage.src = 'https://etn.ethio-tech.com/brand-assets/logos/coin_full.png'

    const bombImage = new Image()
    bombImage.src = 'https://etn.ethio-tech.com/brand-assets/logos/jebena1.png'

    interface Coin {
      x: number
      y: number
      size: number
      tapped: boolean
      collectAnimation: number
    }

    interface Bomb {
      x: number
      y: number
      size: number
      explode: boolean
      explosionRadius: number
    }

    interface Particle {
      x: number
      y: number
      radius: number
      color: string
      velocity: { x: number; y: number }
      alpha: number
    }

    function createCoin() {
      const size = Math.random() * 40 + 10
      const x = Math.random() * (canvas.width - size)
      coins.push({ x, y: -size, size, tapped: false, collectAnimation: 0 })
    }

    function createBomb() {
      const size = 50
      const x = Math.random() * (canvas.width - size)
      bombs.push({ x, y: -size, size, explode: false, explosionRadius: 0 })
    }

    function createParticles(x: number, y: number, color: string, count: number) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          radius: Math.random() * 3,
          color,
          velocity: {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
          },
          alpha: 1
        })
      }
    }

    function drawGrid() {
      if (!ctx) return
      ctx.strokeStyle = '#F2C94C'
      ctx.lineWidth = 0.5
      const gridSize = 50

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    function drawCoins() {
      if (!ctx) return
      coins.forEach((coin, index) => {
        if (!coin.tapped) {
          ctx.drawImage(coinImage, coin.x, coin.y, coin.size, coin.size)
        } else {
          ctx.save()
          ctx.globalAlpha = 1 - coin.collectAnimation
          ctx.translate(coin.x + coin.size / 2, coin.y + coin.size / 2)
          ctx.scale(1 + coin.collectAnimation, 1 + coin.collectAnimation)
          ctx.drawImage(coinImage, -coin.size / 2, -coin.size / 2, coin.size, coin.size)
          ctx.restore()

          coin.collectAnimation += 0.1
          if (coin.collectAnimation >= 1) {
            coins.splice(index, 1)
          }
        }
        coin.y += gravity
        if (coin.y > canvas.height) coins.splice(index, 1)
      })
    }

    function drawBombs() {
      if (!ctx) return
      bombs.forEach((bomb, index) => {
        if (!bomb.explode) {
          ctx.drawImage(bombImage, bomb.x, bomb.y, bomb.size, bomb.size)
        } else {
          ctx.beginPath()
          ctx.arc(bomb.x + bomb.size / 2, bomb.y + bomb.size / 2, bomb.explosionRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 0, 0, ${1 - bomb.explosionRadius / 100})`
          ctx.fill()


          bomb.explosionRadius += 5
          if (bomb.explosionRadius >= 100) {
            bombs.splice(index, 1)
          }
        }
        bomb.y += gravity
        if (bomb.y > canvas.height) bombs.splice(index, 1)
      })
    }

    function drawParticles() {
      if (!ctx) return
      particles.forEach((particle, index) => {
        particle.alpha -= 0.01
        if (particle.alpha <= 0) {
          particles.splice(index, 1)
          return
        }

        ctx.save()
        ctx.globalAlpha = particle.alpha
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
        ctx.restore()

        particle.x += particle.velocity.x
        particle.y += particle.velocity.y
      })
    }

    function handleTap(e: MouseEvent | TouchEvent) {
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY

      coins.forEach((coin, index) => {
        if (x >= coin.x && x <= coin.x + coin.size && y >= coin.y && y <= coin.y + coin.size) {
          setScore(prevScore => prevScore + 0.5)
          coin.tapped = true
          createParticles(coin.x + coin.size / 2, coin.y + coin.size / 2, '#FFD700', 20)
        }
      })

      bombs.forEach((bomb, index) => {
        if (x >= bomb.x && x <= bomb.x + bomb.size && y >= bomb.y && y <= bomb.y + bomb.size) {
          setScore(prevScore => prevScore - 1)
          bomb.explode = true
          createParticles(bomb.x + bomb.size / 2, bomb.y + bomb.size / 2, '#FF0000', 40)
        }
      })
    }

    function gameLoop() {
      if (gameOver) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      drawCoins()
      drawBombs()
      drawParticles()
    }

    const coinInterval = setInterval(createCoin, 500)
    const bombInterval = setInterval(createBomb, 1000)
    const gameLoopInterval = setInterval(gameLoop, 30)

    canvas.addEventListener('click', handleTap)
    canvas.addEventListener('touchstart', handleTap)

    const timerInterval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          setGameOver(true)
          clearInterval(coinInterval)
          clearInterval(bombInterval)
          clearInterval(gameLoopInterval)
          clearInterval(timerInterval)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => {
      clearInterval(coinInterval)
      clearInterval(bombInterval)
      clearInterval(gameLoopInterval)
      clearInterval(timerInterval)
      canvas.removeEventListener('click', handleTap)
      canvas.removeEventListener('touchstart', handleTap)
    }
  }, [gameStarted, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#133A2A] text-[#F2C94C]">
      {!gameStarted || gameOver ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">ETN Coin Game</h1>
          <p className="mb-4">Catch coins, avoid bombs!</p>
          {gameOver && <p className="text-2xl mb-4">Final Score: {score}</p>}
          <Button onClick={startGame} className="bg-[#F2C94C] text-[#133A2A] hover:bg-[#D4AF37]">
            {gameOver ? 'Play Again' : 'Start Game'}
          </Button>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 text-xl">Score: {score}</div>
          <div className="absolute top-4 right-4 text-xl">Time: {timeLeft}</div>
          <canvas ref={canvasRef} className="w-full h-full" />
        </>
      )}
    </div>
  )
}
