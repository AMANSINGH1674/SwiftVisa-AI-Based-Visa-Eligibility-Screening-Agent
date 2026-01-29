"use client"

import { useEffect, useState } from "react"
import { Globe, FileCheck, Clock } from "lucide-react"

const stats = [
  { icon: Globe, value: "195+", label: "Countries Covered" },
  { icon: FileCheck, value: "85%", label: "Accuracy Rate" },
  { icon: Clock, value: "10s", label: "Avg. Response Time" },
]

function AnimatedNumber({ value, suffix, duration }: { value: number; suffix: string; duration: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const incrementTime = duration / end
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)
    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="group text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
