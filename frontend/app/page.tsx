"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight, Heart, CloudRain, Waves } from "lucide-react"

export default function SentimentAnalysis() {
  const [text, setText] = useState("")
  const [sentiment, setSentiment] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      
      const response = await fetch("http://localhost:8000/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment")
      }

      const data = await response.json()
      setSentiment(data.sentiment)
    } catch (err) {
      setError("Failed to connect to the API. Make sure the backend is running on http://localhost:8000")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getSentimentIcon = () => {
    switch (sentiment) {
      case "positive":
        return <Heart className="w-16 h-16" />
      case "negative":
        return <CloudRain className="w-16 h-16" />
      case "neutral":
        return <Waves className="w-16 h-16" />
      default:
        return null
    }
  }

  const getSentimentColor = () => {
    switch (sentiment) {
      case "positive":
        return "text-teal-500"
      case "negative":
        return "text-slate-700"
      case "neutral":
        return "text-primary"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-light text-foreground tracking-wide">Sentiment Analyzer</h1>
              <p className="text-sm text-muted-foreground font-light italic">AI-powered emotion detection</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          <div className="space-y-5">
            <div>
              <Textarea
                id="text-input"
                placeholder="Type or paste your text here"
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                  setError(null)
                }}
                className="min-h-[340px] resize-none text-lg leading-relaxed border-2 border-primary/30 focus:border-primary rounded-2xl shadow-sm focus:shadow-md transition-all bg-card/50 backdrop-blur-sm font-light"
              />
            </div>

            <Button
              onClick={analyzeSentiment}
              disabled={isLoading || !text.trim()}
              size="lg"
              className="w-full group text-lg py-7 bg-primary hover:bg-primary/90 rounded-2xl font-serif font-light tracking-wide shadow-md hover:shadow-lg transition-all"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Sentiment
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

            {error && (
              <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive font-light">{error}</p>
              </div>
            )}
          </div>

          {sentiment && (
            <div className="mt-10">
              <Card className="p-10 bg-card/70 backdrop-blur-sm border-2 border-primary/20 shadow-xl rounded-3xl">
                <h2 className="text-2xl font-serif font-light text-foreground mb-8 text-center tracking-wide">
                  Your Sentiment
                </h2>

                <div className="flex flex-col items-center justify-center py-8">
                  <div className={`mb-6 ${getSentimentColor()}`}>{getSentimentIcon()}</div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3 font-light italic">Detected emotion</p>
                    <p className={`text-5xl font-serif font-light capitalize ${getSentimentColor()} tracking-wide`}>
                      {sentiment}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-8 border-t border-border/50 mt-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-light">Confidence</span>
                    <span className="text-sm font-light text-foreground">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-light">Text length</span>
                    <span className="text-sm font-light text-foreground">{text.length} characters</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="mt-20 pt-10 border-t border-border/30">
            <h3 className="text-xs font-light text-muted-foreground uppercase tracking-widest mb-6 text-center opacity-60">
              Understanding Sentiment
            </h3>
            <div className="grid sm:grid-cols-3 gap-5 opacity-50">
              <div className="p-5 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-teal-500" />
                  <h4 className="text-xs font-light text-foreground">Positive</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">Uplifting, warm expressions</p>
              </div>

              <div className="p-5 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <Waves className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-light text-foreground">Neutral</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">Balanced, like calm waters</p>
              </div>

              <div className="p-5 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <CloudRain className="w-4 h-4 text-slate-700" />
                  <h4 className="text-xs font-light text-foreground">Negative</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">Overcast, subdued language</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
