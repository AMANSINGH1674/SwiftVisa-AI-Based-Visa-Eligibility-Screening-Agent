"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, File, X, Loader2, CheckCircle } from "lucide-react"

interface UploadedFile {
  name: string
  size: number
  type: string
}

// Placeholder function - to be connected to backend
function handleFileUpload(files: UploadedFile[]) {
  console.log("Files submitted for upload:", JSON.stringify(files, null, 2))
  // This function will be replaced with actual API call
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

export function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const processFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList)
      .filter((file) => {
        const isPdf = file.type === "application/pdf"
        const isImage = file.type.startsWith("image/")
        return isPdf || isImage
      })
      .map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }))

    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    await handleFileUpload(files)
    setIsUploading(false)
    setIsUploaded(true)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  if (isUploaded) {
    return (
      <Card className="border-border/60 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold">Documents Uploaded!</h3>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Your documents have been submitted. In a real application, they would be processed for analysis.
          </p>
          <Button
            className="mt-6"
            onClick={() => {
              setIsUploaded(false)
              setFiles([])
            }}
          >
            Upload More Documents
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <CardDescription>
          Upload PDFs or images of your supporting documents (passport, education certificates, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drop Zone */}
        <div
          className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
            isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept=".pdf,image/*"
            multiple
            onChange={handleFileSelect}
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Upload className="h-7 w-7" />
          </div>
          <p className="mt-4 font-medium">Drag & drop files here, or click to browse</p>
          <p className="mt-1 text-sm text-muted-foreground">Accepts PDF and image files</p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Selected Files ({files.length})</h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button className="w-full" size="lg" disabled={files.length === 0 || isUploading} onClick={handleSubmit}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            `Upload ${files.length > 0 ? `${files.length} File${files.length > 1 ? "s" : ""}` : "Documents"}`
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
