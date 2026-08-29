import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Квадратный портрет эксперта.
 */
export function ExpertPortrait({
  src,
  name,
  className,
}: {
  src: string;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-[14px] border border-border bg-surface",
        className,
      )}
    >
      {failed ? (
        <div
          className="flex h-full w-full items-center justify-center"
          role="img"
          aria-label={`Портрет: ${name}`}
        >
          <span className="text-5xl font-semibold tracking-tight text-primary/25">{initials}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={`${name} — Product Advisor, Stratum Consulting`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-center"
        />
      )}
    </div>
  );
}
