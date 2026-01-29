import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Brain, FileCheck, MessageSquareText, Globe, BarChart3, Shield, Zap, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
    icon: Globe,
    title: "Multi-Country Visa Categories",
    description: "Support for Work, Student, PR, Tourist, and other visa types across multiple countries.",
  },
  {
    icon: BarChart3,
    title: "Confidence Score + Policy Citations",
    description: "Get confidence scores for your eligibility along with direct citations from relevant policies.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get your eligibility assessment in seconds, not days. Our AI processes your information in real-time.",
  },
  {
    icon: Shield,
    title: "Data Privacy",
    description: "Your personal information is encrypted and never shared. We prioritize your privacy and security.",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Enterprise-grade security with Supabase authentication to protect your account and data.",
  },
]

export default function FeaturesPage() {
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
                <Zap className="h-4 w-4" />
                Platform Features
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Powerful Features for Accurate Assessments
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Everything you need for accurate, policy-grounded visa eligibility assessments powered by AI.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-20 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
              <h2 className="text-2xl font-bold sm:text-3xl">Experience All Features Today</h2>
              <p className="mt-4 text-muted-foreground">Sign up now and start your visa eligibility assessment.</p>
              <Button size="lg" className="mt-6" asChild>
                <Link href="/auth/sign-up">
                  Get Started Free
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
