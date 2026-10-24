import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoGraphic } from "@/components/brand/logo-graphic";

export function Logo({ animated = true, className }: { animated?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="MockPrep home" className={cn("flex min-h-11 shrink-0 items-center gap-2 sm:gap-2.5", animated && "logo-animated", className)}>
      <LogoGraphic variant="mark" className="h-9 w-auto overflow-visible sm:h-11" />
      <LogoGraphic variant="wordmark" className="h-3.5 w-auto max-[359px]:hidden sm:h-4" />
    </Link>
  );
}
