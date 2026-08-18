import Link from "next/link";
import { type Metadata } from "next";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";
import { ROUTES } from "@/constants/routes";
import { MARKETING_FEATURES, MARKETING_STATS } from "@/constants/marketing";
import Button from "@/components/shared/Button";
import { Sparkles, ArrowRight, Code2 } from "lucide-react";

export const metadata: Metadata = {
    title: BROWSER_TAB_TITLE.HOME,
    robots: { index: true, follow: true },
};

export default function Home() {
    return (
        <div className="flex-1 w-full flex flex-col">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary bg-secondary text-xs font-semibold text-secondary-content">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>The Modern Software Engineer Interview Prep</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-ternary-content leading-[1.15] max-w-3xl">
                        Master the Tech Interview.{" "}
                        <span className="text-primary">Land Your Dream Job.</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-base sm:text-lg opacity-75 text-ternary-content max-w-2xl leading-relaxed">
                        Comprehensive, real-world questions and architectural breakdowns covering
                        JavaScript, React, System Design, DSA, and Web Performance.
                    </p>

                    {/* CTA Actions */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <Link href={ROUTES.TOPICS}>
                            <Button className="!px-6 !py-3 text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                                <span>Explore Topics</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-12 w-full max-w-3xl border-t border-secondary mt-6">
                        {MARKETING_STATS.map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1">
                                <span className="text-2xl sm:text-3xl font-extrabold text-ternary-content">
                                    {stat.value}
                                </span>
                                <span className="text-xs opacity-60 text-ternary-content font-medium">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="min-h-screen flex items-center py-16 border-t border-secondary bg-secondary">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-12">
                    <div className="flex flex-col items-center text-center gap-3 max-w-xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ternary-content">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-sm opacity-70 text-ternary-content">
                            Designed by engineers for engineers. No fluff, just practical preparation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {MARKETING_FEATURES.map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col gap-3 p-5 rounded-xl border border-ternary bg-ternary text-ternary-content hover:border-primary/50 transition-all shadow-sm"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-base-1 border border-ternary">
                                    {feature.icon}
                                </div>
                                <h3 className="text-base font-semibold text-ternary-content">
                                    {feature.title}
                                </h3>
                                <p className="text-xs sm:text-sm opacity-75 text-ternary-content leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action */}
            <section className="py-16 border-t border-secondary">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="relative overflow-hidden rounded-2xl border border-ternary bg-secondary text-secondary-content p-8 sm:p-12 text-center flex flex-col items-center gap-5 shadow-lg">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content">
                            <Code2 className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-ternary-content">
                            Ready to Ace Your Interview?
                        </h2>
                        <p className="text-sm opacity-80 text-secondary-content max-w-md">
                            Join developers preparing for technical interviews at Google, Meta, Amazon, and top startups.
                        </p>
                        <Link href={ROUTES.TOPICS}>
                            <Button className="!px-7 !py-3 text-sm font-semibold flex items-center gap-2 mt-2">
                                <span>Get Started for Free</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-secondary mt-auto text-center text-xs opacity-60 text-ternary-content">
                <p>© {new Date().getFullYear()} MNgo Interview Prep. Built for the developer community.</p>
            </footer>
        </div>
    );
}
