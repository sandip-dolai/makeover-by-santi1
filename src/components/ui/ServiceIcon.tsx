import {
  Award,
  Briefcase,
  Crown,
  Gem,
  HandHeart,
  Leaf,
  Paintbrush,
  Sparkles,
  Users,
  Wind,
  type LucideProps,
} from "lucide-react";
import type { ServiceCategory } from "@/content/site";

const serviceIcons = {
  crown: Crown,
  sparkles: Sparkles,
  wind: Wind,
  gem: Gem,
  brush: Paintbrush,
  leaf: Leaf,
} satisfies Record<ServiceCategory["icon"], unknown>;

const perkIcons = {
  award: Award,
  hand: HandHeart,
  briefcase: Briefcase,
  users: Users,
};

export function ServiceIcon({ name, ...props }: { name: ServiceCategory["icon"] } & LucideProps) {
  const Icon = serviceIcons[name];
  return <Icon aria-hidden="true" {...props} />;
}

export function PerkIcon({ name, ...props }: { name: keyof typeof perkIcons } & LucideProps) {
  const Icon = perkIcons[name];
  return <Icon aria-hidden="true" {...props} />;
}
