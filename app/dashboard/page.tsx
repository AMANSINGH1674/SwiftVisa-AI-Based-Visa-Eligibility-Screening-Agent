import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Settings, Sparkles } from "lucide-react"
import { EligibilityFormClient } from "@/components/eligibility-form-client"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Page Header */}
          <div className="mb-10">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Assessment
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Visa Eligibility Checker</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome back, {user.email}. Fill in your details below to check your visa eligibility.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <EligibilityFormClient />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Links */}
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border border-border/40 p-3 opacity-50">
                    <History className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Check History</div>
                      <div className="text-xs text-muted-foreground">Coming soon</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border/40 p-3 opacity-50">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Settings</div>
                      <div className="text-xs text-muted-foreground">Coming soon</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Tips for Accuracy</CardTitle>
                  <CardDescription>Get the best results from your evaluation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      Provide accurate and complete information
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      Fill all visa-specific fields for better accuracy
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      Review AI explanations carefully
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      Check for updates to visa requirements
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
