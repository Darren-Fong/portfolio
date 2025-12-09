'use client'

import { useState, useRef, useCallback } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { FaTimes, FaCheck } from 'react-icons/fa'

interface ImageCropperProps {
  onCropComplete: (croppedImageUrl: string) => void
  onCancel: () => void
}

export default function ImageCropper({ onCropComplete, onCancel }: ImageCropperProps) {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || '')
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const getCroppedImg = useCallback(async () => {
    if (!completedCrop || !imgRef.current) return

    const image = imgRef.current
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = completedCrop.width
    canvas.height = completedCrop.height

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    )

    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return
        const croppedUrl = URL.createObjectURL(blob)
        resolve(croppedUrl)
      }, 'image/jpeg', 0.95)
    })
  }, [completedCrop])

  const handleCropConfirm = async () => {
    const croppedImage = await getCroppedImg()
    if (croppedImage) {
      // Convert blob URL to file and upload
      const response = await fetch(croppedImage)
      const blob = await response.blob()
      const file = new File([blob], 'profile-photo.jpg', { type: 'image/jpeg' })

      const formData = new FormData()
      formData.append('file', file)

      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadResponse.ok) throw new Error('Upload failed')

        const { url } = await uploadResponse.json()
        onCropComplete(url)
      } catch (error) {
        alert('Failed to upload photo. Please try again.')
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Crop Profile Photo
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {!imageSrc ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer inline-block"
              >
                <div className="text-gray-600 dark:text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Click to upload a photo
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PNG, JPG up to 10MB
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                >
                  <img
                    ref={imgRef}
                    src={imageSrc}
                    alt="Crop preview"
                    className="max-h-[60vh] object-contain"
                  />
                </ReactCrop>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setImageSrc('')}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Choose Different Photo
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                  disabled={!completedCrop}
                >
                  <FaCheck /> Confirm & Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
