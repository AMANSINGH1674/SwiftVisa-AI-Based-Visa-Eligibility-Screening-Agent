"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, ArrowRight, GraduationCap, Briefcase, Home, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const allCountries = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    visaTypes: ["F1 Student", "H1B Work", "B1/B2 Visitor", "K1 Fiance", "Green Card"],
    popular: true,
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    visaTypes: ["Study Permit", "Work Permit", "Express Entry", "Visitor Visa"],
    popular: true,
  },
  {
    code: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    visaTypes: ["Tier 4 Student", "Skilled Worker", "Visitor", "Family Visa"],
    popular: true,
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    visaTypes: ["Student Visa", "Skilled Worker", "Working Holiday", "Partner Visa"],
    popular: true,
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    visaTypes: ["Student Visa", "EU Blue Card", "Job Seeker", "Family Reunion"],
    popular: false,
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    visaTypes: ["Student Visa", "Work Visa", "Specified Skills", "Spouse Visa"],
    popular: false,
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    visaTypes: ["Student Visa", "Talent Passport", "Visitor Visa", "Family Visa"],
    popular: false,
  },
  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    visaTypes: ["Study Visa", "Highly Skilled Migrant", "Startup Visa"],
    popular: false,
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    visaTypes: ["Student Pass", "Employment Pass", "S Pass", "EntrePass"],
    popular: false,
  },
  {
    code: "AE",
    name: "UAE",
    flag: "🇦🇪",
    visaTypes: ["Student Visa", "Employment Visa", "Golden Visa", "Tourist Visa"],
    popular: false,
  },
  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    visaTypes: ["Student Visa", "Skilled Migrant", "Working Holiday"],
    popular: false,
  },
  {
    code: "IE",
    name: "Ireland",
    flag: "🇮🇪",
    visaTypes: ["Study Visa", "Critical Skills Permit", "Stamp 4"],
    popular: false,
  },
]

const visaCategories = [
  { icon: GraduationCap, name: "Student", count: 45, description: "Study permits & student visas" },
  { icon: Briefcase, name: "Work", count: 62, description: "Employment & skilled worker visas" },
  { icon: Home, name: "Immigration", count: 38, description: "Permanent residency & citizenship" },
  { icon: Plane, name: "Tourist", count: 89, description: "Visitor & business travel visas" },
]

export default function CountriesPage() {
  const [selectedCountry, setSelectedCountry] = useState(allCountries[0])

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
                <MapPin className="h-4 w-4" />
                Global Coverage
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Visa Support for 195+ Countries
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                From student visas to permanent residency, we cover all major immigration pathways worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* World Map Section */}
        <section className="border-b border-border/40 py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-8">
              <div className="relative aspect-[2/1] w-full">
                <img
                  src="/world-map-with-connection-lines-blue-theme.jpg"
                  alt="Global visa coverage map"
                  className="h-full w-full object-contain opacity-70 dark:opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-xl bg-background/95 px-8 py-6 text-center shadow-lg backdrop-blur">
                    <div className="text-4xl font-bold text-primary">195+</div>
                    <div className="text-muted-foreground">Countries & Territories</div>
                    <div className="mt-2 text-sm text-muted-foreground">Covered by SwiftVisa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visa Categories */}
        <section className="py-16 border-b border-border/40">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-center sm:text-3xl">Visa Categories</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {visaCategories.map((category) => (
                <div
                  key={category.name}
                  className="group rounded-xl border border-border/60 bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <category.icon className="h-7 w-7" />
                  </div>
                  <div className="text-xl font-bold">{category.count}</div>
                  <div className="font-semibold">{category.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{category.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Countries Section */}
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">Browse Countries</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Country Cards */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {allCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(country)}
                    className={`relative overflow-hidden rounded-xl border p-4 text-left transition-all ${
                      selectedCountry.code === country.code
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border/60 bg-card hover:border-primary/30 hover:shadow-md"
                    }`}
                  >
                    {country.popular && (
                      <div className="absolute right-2 top-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        Popular
                      </div>
                    )}
                    <div className="mb-2 text-3xl">{country.flag}</div>
                    <div className="font-semibold">{country.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{country.visaTypes.length} visa types</div>
                  </button>
                ))}
              </div>

              {/* Selected Country Details */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:sticky lg:top-24 lg:self-start">
                <div className="mb-6 flex items-center gap-4">
                  <div className="text-6xl">{selectedCountry.flag}</div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedCountry.name}</h3>
                    <p className="text-muted-foreground">Available visa categories</p>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  {selectedCountry.visaTypes.map((visa) => (
                    <div
                      key={visa}
                      className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/30 px-4 py-3"
                    >
                      <span className="font-medium">{visa}</span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Supported
                      </span>
                    </div>
                  ))}
                </div>

                <Button className="group w-full" size="lg" asChild>
                  <Link href="/auth/login">
                    Check Eligibility for {selectedCountry.name}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
