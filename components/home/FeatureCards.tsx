import { BookOpen, Refrigerator, Users } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const FEATURES = [
  {
    title: 'Your kitchen',
    description:
      'Keep track of your equipment, fridge and pantry so suggestions fit what you really have.',
    href: '/kitchen',
    icon: Refrigerator,
    band: 'from-primary/30 to-primary/5',
    iconClass: 'text-primary',
  },
  {
    title: 'Your recipes',
    description:
      'Save recipes from the web or write your own, all in one place, in English and Bulgarian.',
    href: '/recipes',
    icon: BookOpen,
    // In dark mode a faint tomato tint over the dark green card turns brown,
    // so the band is a stronger coral there and the icon switches to dark.
    band: 'from-highlight/30 to-highlight/5 dark:from-highlight/85 dark:to-highlight/60',
    iconClass: 'text-primary dark:text-highlight-foreground',
  },
  {
    title: 'Cook with friends',
    description:
      'Share your favorites. A recipe a friend shares is yours to change as your own copy.',
    href: '/friends',
    icon: Users,
    band: 'from-secondary to-primary/10',
    iconClass: 'text-primary',
  },
] as const;

/** Three entry points to the main areas of the app. */
export const FeatureCards = () => (
  <section
    aria-labelledby="features-heading"
    className="mx-auto max-w-6xl px-4 pb-20 sm:px-6"
  >
    <h2 id="features-heading" className="sr-only">
      What you can do
    </h2>
    <ul className="grid gap-5 md:grid-cols-3">
      {FEATURES.map(
        ({ title, description, href, icon: Icon, band, iconClass }) => (
          <li key={title}>
            <Link
              href={href}
              className="group block h-full rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Card className="h-full pt-0 transition-shadow group-hover:shadow-lg">
                <div
                  className={`flex h-28 items-center justify-center bg-linear-to-br ${band}`}
                  aria-hidden
                >
                  <Icon className={`size-10 ${iconClass}`} />
                </div>
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-semibold">
                    <h3>{title}</h3>
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto text-sm font-semibold text-primary group-hover:underline">
                  Open →
                </CardContent>
              </Card>
            </Link>
          </li>
        )
      )}
    </ul>
  </section>
);
