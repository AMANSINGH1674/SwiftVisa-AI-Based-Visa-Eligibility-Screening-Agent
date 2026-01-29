"use client"

import { useState } from "react"
import { MapPin, ArrowRight, GraduationCap, Briefcase, Home, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const countries = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    visaTypes: ["F1 Student", "H1B Work", "B1/B2 Visitor", "K1 Fiance", "Green Card"],
    popular: true,
    color: "from-blue-500 to-red-500",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    visaTypes: ["Study Permit", "Work Permit", "Express Entry", "Visitor Visa"],
    popular: true,
    color: "from-red-500 to-white",
  },
  {
    code: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    visaTypes: ["Tier 4 Student", "Skilled Worker", "Visitor", "Family Visa"],
    popular: true,
    color: "from-blue-600 to-red-600",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    visaTypes: ["Student Visa", "Skilled Worker", "Working Holiday", "Partner Visa"],
    popular: true,
    color: "from-blue-500 to-yellow-500",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    visaTypes: ["Student Visa", "EU Blue Card", "Job Seeker", "Family Reunion"],
    popular: false,
    color: "from-black to-yellow-500",
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    visaTypes: ["Student Visa", "Work Visa", "Specified Skills", "Spouse Visa"],
    popular: false,
    color: "from-white to-red-500",
  },
]

const visaCategories = [
  { icon: GraduationCap, name: "Student", count: 45 },
  { icon: Briefcase, name: "Work", count: 62 },
  { icon: Home, name: "Immigration", count: 38 },
  { icon: Plane, name: "Tourist", count: 89 },
]

export function CountriesSection() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  return (
    <section id="countries" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            Global Coverage
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Visa Support for 195+ Countries</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From student visas to permanent residency, we cover all major immigration pathways worldwide.
          </p>
        </div>

        {/* Visa Categories */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {visaCategories.map((category) => (
            <div
              key={category.name}
              className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <category.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{category.name}</div>
                <div className="text-sm text-muted-foreground">{category.count} visa types</div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Country Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Country Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {countries.map((country) => (
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
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="text-5xl">{selectedCountry.flag}</div>
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
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    Supported
                  </span>
                </div>
              ))}
            </div>

            <Button className="group w-full" asChild>
              <Link href="/auth/login">
                Check Eligibility for {selectedCountry.name}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* World Map Visual */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-8">
          <div className="relative aspect-[2/1] w-full">
            <img
              src="/world-map-with-connected-dots-showing-visa-routes.jpg"
              alt="Global visa coverage map"
              className="h-full w-full object-contain opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-xl bg-background/90 px-6 py-4 text-center shadow-lg backdrop-blur">
                <div className="text-3xl font-bold text-primary">195+</div>
                <div className="text-sm text-muted-foreground">Countries & Territories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
