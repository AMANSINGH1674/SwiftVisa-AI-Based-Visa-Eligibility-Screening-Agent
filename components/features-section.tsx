import { Brain, FileCheck, MessageSquareText, Upload, Globe, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Visa Eligibility Checker",
    description:
      "Advanced AI analyzes your profile against official immigration requirements for accurate eligibility predictions.",
  },
  {
    icon: FileCheck,
    title: "Policy-Grounded Reasoning",
    description: "Every assessment is backed by actual immigration policies, ensuring reliable and verifiable results.",
  },
  {
    icon: MessageSquareText,
    title: "Automatic Explanation Generation",
    description: "Receive detailed explanations of why you may or may not qualify, with specific policy references.",
  },
  {
    icon: Upload,
    title: "Document Upload Support",
    description: "Upload supporting documents for enhanced analysis and more accurate eligibility assessments.",
  },
  {
    icon: Globe,
    title: "Multi-Country Visa Categories",
    description: "Support for Work, Student, PR, Tourist, and other visa types across multiple countries.",
  },
  {
    icon: BarChart3,
    title: "Confidence Score + Policy Citations",
    description: "Get confidence scores for your eligibility along with direct citations from relevant policies.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Powerful Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need for accurate, policy-grounded visa eligibility assessments.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
