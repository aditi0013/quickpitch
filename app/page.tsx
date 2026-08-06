"use client";

import { useState } from "react";

const MAX_LENGTH = 1000;

export default function Home() {
  const [idea, setIdea] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerate = () => {
    if (!idea.trim()) {
      setMessage("Please describe your business idea first.");
      return;
    }

    setMessage("Pitch generation will be connected in the next step.");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-10 sm:px-8 sm:py-14">
        {/* Header */}
        <header className="mb-12 text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur">
            AI-powered business pitching
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Quick<span className="text-blue-400">Pitch</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Turn a rough business idea into a clear, structured pitch in
            seconds.
          </p>
        </header>

        {/* Input Section */}
        <section className="mx-auto w-full max-w-3xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 sm:p-7">
            <div className="mb-4">
              <label
                htmlFor="business-idea"
                className="text-sm font-semibold text-slate-200"
              >
                Describe your business idea
              </label>

              <p className="mt-1 text-sm text-slate-500">
                It can be rough — just explain what you have in mind.
              </p>
            </div>

            <textarea
              id="business-idea"
              value={idea}
              onChange={(e) => {
                setIdea(e.target.value);
                setMessage("");
              }}
              maxLength={MAX_LENGTH}
              rows={7}
              placeholder="Example: A subscription service that delivers healthy, affordable snacks to college students..."
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/80 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
            />

            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-600">
                Keep it simple and specific.
              </span>

              <span className="text-xs text-slate-500">
                {idea.length}/{MAX_LENGTH}
              </span>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              className="mt-5 w-full rounded-xl bg-blue-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.99]"
            >
              Generate Pitch
            </button>

            {message && (
              <p className="mt-3 text-center text-sm text-slate-400">
                {message}
              </p>
            )}
          </div>
        </section>

        {/* Future Result Area */}
        <section className="mx-auto mt-8 w-full max-w-3xl">
          <div className="min-h-72 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="flex h-full min-h-56 flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl">
                ✦
              </div>

              <h2 className="text-base font-semibold text-slate-300">
                Your pitch will appear here
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
                Your structured pitch will include an idea summary, target
                customer, value proposition, and growth ideas.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-12 text-center">
          <p className="text-xs text-slate-600">
            QuickPitch · Simple ideas. Clear pitches.
          </p>
        </footer>
      </div>
    </main>
  );
}