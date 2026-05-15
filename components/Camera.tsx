'use client'

import { useRef, useState } from 'react'
import { Camera as CameraIcon, RotateCcw } from 'lucide-react'

interface CameraProps {
  onCapture: (imageData: string) => void
}

export function Camera({ onCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraOpen(true)
        setError(null)
      }
    } catch (err) {
      setError('Failed to access camera. Please check permissions.')
      console.error(err)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const imageData = canvasRef.current.toDataURL('image/jpeg', 0.8)
        onCapture(imageData)
        closeCamera()
      }
    }
  }

  const closeCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      setIsCameraOpen(false)
    }
  }

  if (!isCameraOpen) {
    return (
      <button
        onClick={openCamera}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <CameraIcon size={20} />
        Take Photo
      </button>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full rounded-lg bg-black max-h-96"
      />
      <canvas ref={canvasRef} className="hidden" />
      <div className="flex gap-2">
        <button
          onClick={capturePhoto}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <CameraIcon size={20} />
          Capture
        </button>
        <button
          onClick={closeCamera}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw size={20} />
          Cancel
        </button>
      </div>
    </div>
  )
}
