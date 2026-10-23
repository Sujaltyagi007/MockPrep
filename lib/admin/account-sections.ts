import { CircleUserRound, NotebookPen, Palette, Sliders, UserCog, UsersRound, type LucideIcon } from "lucide-react";

export type AccountSectionId = "profile" | "avatar" | "theme" | "notes" | "platform" | "team";

export type AccountSection = {
  id: AccountSectionId;
  label: string;
  hint: string;
  icon: LucideIcon;
  superAdminOnly?: boolean;
};

export const accountSections: AccountSection[] = [
  { id: "profile", label: "Profile & credentials", hint: "Your name and sign-in details", icon: UserCog },
  { id: "avatar", label: "Avatar & persona", hint: "How you appear across the admin panel", icon: CircleUserRound },
  { id: "theme", label: "Panel theme", hint: "Colours, borders, radius and canvas tone", icon: Palette },
  { id: "notes", label: "Private scratchpad", hint: "Encrypted admin notes and quick thoughts", icon: NotebookPen },
  { id: "platform", label: "MockPrep engine", hint: "Passing marks, timers and mock test rules", icon: Sliders, superAdminOnly: true },
  { id: "team", label: "Admin access & roles", hint: "Manage educators and super admins", icon: UsersRound, superAdminOnly: true },
];

export const accountSectionsFor = (isSuperAdmin: boolean = true) =>
  accountSections.filter((section) => isSuperAdmin || !section.superAdminOnly);

export const accountHref = (id: AccountSectionId) =>
  id === "profile" ? "/admin/account" : `/admin/account?tab=${id}`;
