import Link from 'next/link';
import { Button } from '@/components/ui/button';

/** Home page opening: the one question the app answers, and the main action. */
export const HomeHero = () => (
  <section className="relative isolate overflow-hidden">
    <div
      className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-primary/15 blur-3xl"
      aria-hidden
    />
    <div
      className="absolute -bottom-24 -left-16 -z-10 size-80 rounded-full bg-highlight/15 blur-3xl"
      aria-hidden
    />
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance sm:text-6xl">
        What can I have for <span className="text-highlight">dinner</span>?
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground text-balance">
        Tell us what is in your fridge and pantry. We will find tonight&apos;s
        recipe from your own collection and the best free sources online.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-12 rounded-full px-8 text-base">
          <Link href="/dinner">Find dinner</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-12 rounded-full px-8 text-base"
        >
          <Link href="/recipes">Browse recipes</Link>
        </Button>
      </div>
    </div>
  </section>
);
