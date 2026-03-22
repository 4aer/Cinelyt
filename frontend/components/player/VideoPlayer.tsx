"use client"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

interface Props {
  embedUrls: string[]
  title: string
}

export default function VideoPlayer({ embedUrls, title }: Props) {
  const [sourceIndex, setSourceIndex] = useState(0)
  const [error, setError] = useState(false)

  if (!embedUrls || embedUrls.length === 0) {
    return (
      <div className="flex items-center justify-center aspect-video bg-zinc-900 rounded-xl text-zinc-400">
        <AlertCircle className="mr-2" /> No stream available
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400 gap-3">
            <AlertCircle size={32} />
            <p>This source failed to load.</p>
            {sourceIndex < embedUrls.length - 1 && (
              <button
                onClick={() => { setSourceIndex(i => i + 1); setError(false) }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
              >
                Try Next Source
              </button>
            )}
          </div>
        ) : (
          <iframe
            key={embedUrls[sourceIndex]}
            src={embedUrls[sourceIndex]}
            title={title}
            allowFullScreen
            className="w-full h-full"
            onError={() => setError(true)}
          />
        )}
      </div>

      {embedUrls.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {embedUrls.map((_, i) => (
            <button
              key={i}
              onClick={() => { setSourceIndex(i); setError(false) }}
              className={`px-3 py-1 rounded text-sm transition ${
                i === sourceIndex
                  ? "bg-(--gold) text-black font-semibold"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              Source {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}