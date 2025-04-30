'use client'

import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { UploadingVideo } from '@/lib/store/Slice/videoUploadSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const UploadStatus: React.FC<{ videoQu: UploadingVideo[] }> = ({ videoQu }) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  if (videoQu.length === 0) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed top-24 right-6 z-1000 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 w-[350px] max-h-[75vh] overflow-y-auto p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
            Uploading Videos ({videoQu.length})
          </h4>
        </div>

        <div className="space-y-4">
          {videoQu.map((video) => {
            const isExpanded = expandedItems.includes(video.videoId)

            return (
              <div
                key={video.videoId || video.name}
                className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 shadow-inner"
              >
                <div className="flex justify-between items-center">
                  <div className="text-xs font-medium text-gray-800 dark:text-gray-100 truncate">
                    {video.name}
                  </div>
                  <button onClick={() => toggleExpand(video.videoId)}>
                    {isExpanded ? (
                      <FaChevronUp className="text-xs text-gray-500 dark:text-gray-300" />
                    ) : (
                      <FaChevronDown className="text-xs text-gray-500 dark:text-gray-300" />
                    )}
                  </button>
                </div>

                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden mt-2">
                  <div
                    className="h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${video.progress}%` }}
                  />
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {video.progress.toFixed(0)}%
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-xs text-gray-700 dark:text-gray-200 mt-3 space-y-1 overflow-hidden"
                    >
                      <p><span className="font-medium">File:</span> {video.file.name}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default UploadStatus
