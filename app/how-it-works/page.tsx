import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    title: "Policy Corpus",
    description: "Official immigration policies and regulations from government sources are collected and processed.",
    details: [
      "Government websites and official documents",
      "Immigration law updates in real-time",
      "Multi-language support for global coverage",
    ],
    image: "/official-government-documents-stack-blue-theme.jpg",
  },
  {
    title: "Vector Store",
    description: "Documents are embedded and stored in FAISS/Chroma for semantic retrieval and fast lookup.",
    details: ["Advanced semantic embeddings", "High-speed similarity search", "Scalable document indexing"],
    image: "/database-vector-storage-3d-illustration-blue.jpg",
  },
  {
    title: "RAG + LLM Reasoning",
    description: "Your inputs are matched with relevant policies using RAG, then analyzed by advanced LLMs.",
    details: ["Retrieval-Augmented Generation", "Context-aware AI reasoning", "Policy-grounded responses"],
    image: "/artificial-intelligence-brain-neural-network-blue.jpg",
  },
  {
    title: "Eligibility Output",
    description: "Receive a detailed eligibility assessment with confidence scores and policy citations.",
    details: ["Confidence scores for each criterion", "Direct policy citations", "Actionable recommendations"],
    image: "/checklist-approval-document-checkmark-blue.jpg",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40 bg-muted/30 py-20 sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.1),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(96,165,250,0.08),transparent)]" />
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Our Technology
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">How SwiftVisa Works</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Our AI-powered pipeline ensures accurate, policy-grounded eligibility assessments using cutting-edge RAG
                technology.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="space-y-20">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold sm:text-3xl">{step.title}</h2>
                      <p className="mt-4 text-lg text-muted-foreground">{step.description}</p>
                      <ul className="mt-6 space-y-3">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm ${index % 2 === 1 ? "lg:order-1" : ""}`}
                    >
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="mt-8 flex justify-center lg:hidden">
                      <ArrowRight className="h-6 w-6 rotate-90 text-border" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-20 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
              <h2 className="text-2xl font-bold sm:text-3xl">Ready to Check Your Eligibility?</h2>
              <p className="mt-4 text-muted-foreground">
                Experience the power of AI-driven visa eligibility screening today.
              </p>
              <Button size="lg" className="mt-6" asChild>
                <Link href="/auth/login">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
