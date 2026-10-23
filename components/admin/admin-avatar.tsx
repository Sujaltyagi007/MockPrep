"use client";
import { useState } from "react";
import { useAdminAvatar } from "@/lib/admin/admin-preferences";

interface AdminAvatarProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showStatusIndicator?: boolean;
}

const sizeClasses = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-xl",
};

export function AdminAvatar({ name, size = "md", className = "", showStatusIndicator = false, }: AdminAvatarProps) {
  const avatar = useAdminAvatar();
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const initial = (name || "M").slice(0, 1).toUpperCase();
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  let avatarUrl: string | null = null;
  if (avatar.type === "dicebear") {
    const style = avatar.style || "notionists";
    const seed = encodeURIComponent(avatar.seed || name || "mockprep");
    avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
  } else if (avatar.type === "custom" && avatar.url) {
    avatarUrl = avatar.url;
  }

  return (
    <div className={`relative inline-flex shrink-0 ${sizeClass} ${className}`}>
      {avatarUrl && avatarUrl !== failedUrl ? (
        <img src={avatarUrl} alt={name} className="size-full rounded-full border border-black/10 bg-white object-cover shadow-2xs" onError={() => setFailedUrl(avatarUrl)} />
      ) : (
        <div className={`flex size-full items-center justify-center rounded-full font-display font-bold text-white shadow-2xs ${avatar.initialsBg || "bg-forest"}`}>
          {initial}
        </div>
      )}

      {showStatusIndicator && (
        <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-white bg-forest" title="Active Admin" />
      )}
    </div>
  );
}
