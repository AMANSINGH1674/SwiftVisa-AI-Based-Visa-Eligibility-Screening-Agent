import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Animated background with globe pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(96,165,250,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[url('/subtle-world-map-dotted-pattern.jpg')] bg-cover bg-center opacity-[0.03] dark:opacity-[0.02]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Immigration Intelligence
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            SwiftVisa: AI-Based Visa
            <span className="relative mx-2 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500">
                Eligibility Screening Agent
              </span>
              <span className="absolute -bottom-1 left-0 h-3 w-full bg-primary/20 -skew-x-12" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Leveraging cutting-edge Large Language Models and Retrieval-Augmented Generation (RAG) backed by official
            immigration policies for accurate, policy-grounded visa eligibility assessments.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="group w-full sm:w-auto">
              <Link href="/auth/login" className="flex items-center gap-2">
                Check Your Eligibility
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full bg-transparent sm:w-auto">
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Policy-grounded responses
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" style={{ animationDelay: "0.5s" }} />
              Official immigration data
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" style={{ animationDelay: "1s" }} />
              Instant assessments
            </div>
          </div>

          {/* Supported Countries Preview */}
          <div className="mx-auto mt-16 flex max-w-lg items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">Supported:</span>
            <div className="flex -space-x-2">
              {["US", "CA", "UK", "AU", "DE", "JP"].map((country) => (
                <div
                  key={country}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium shadow-sm"
                >
                  {country}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-primary">+20 more</span>
          </div>
        </div>
      </div>
    </section>
  )
}
