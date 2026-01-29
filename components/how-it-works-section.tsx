import { FileText, Database, Brain, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Policy Corpus",
    description: "Official immigration policies and regulations from government sources are collected and processed.",
  },
  {
    icon: Database,
    title: "Vector Store",
    description: "Documents are embedded and stored in FAISS/Chroma for semantic retrieval and fast lookup.",
  },
  {
    icon: Brain,
    title: "RAG + LLM Reasoning",
    description: "Your inputs are matched with relevant policies using RAG, then analyzed by advanced LLMs.",
  },
  {
    icon: CheckCircle,
    title: "Eligibility Output",
    description: "Receive a detailed eligibility assessment with confidence scores and policy citations.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border/40 bg-muted/30 py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our AI-powered pipeline ensures accurate, policy-grounded eligibility assessments in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="group relative">
              <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                {/* Step number */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                </div>

                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>

              {/* Arrow connector (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block">
                  <ArrowRight className="h-5 w-5 text-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
