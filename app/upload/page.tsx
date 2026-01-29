import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DocumentUpload } from "@/components/document-upload"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 sm:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          {/* Page Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Upload Documents</h1>
            <p className="mt-3 text-muted-foreground">
              Upload your supporting documents for enhanced eligibility analysis.
            </p>
          </div>

          {/* Upload Component */}
          <DocumentUpload />
        </div>
      </main>
      <Footer />
    </div>
  )
}
