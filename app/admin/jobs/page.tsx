"use client";
import { useState } from "react";
import { Badge, PageHeader, buttonClass } from "@/components/admin/ui";
import { ExternalLink, Plus, Search, Calendar, Users } from "lucide-react";

interface JobItem {
  id: string;
  slug: string;
  title: string;
  organization: string;
  vacancies: number;
  eligibleQuals: string[];
  applicationEnd: string;
  status: "PUBLISHED" | "DRAFT";
  officialUrl: string;
}

const INITIAL_JOBS: JobItem[] = [
  {
    id: "job-1",
    slug: "ssc-cgl-2026",
    title: "Combined Graduate Level (CGL) 2026",
    organization: "Staff Selection Commission (SSC)",
    vacancies: 14500,
    eligibleQuals: ["GRADUATE", "BTECH", "POSTGRADUATE"],
    applicationEnd: "2026-05-31",
    status: "PUBLISHED",
    officialUrl: "https://ssc.gov.in",
  },
  {
    id: "job-2",
    slug: "upsc-civil-services-2026",
    title: "Civil Services Examination (CSE) 2026",
    organization: "Union Public Service Commission",
    vacancies: 1105,
    eligibleQuals: ["GRADUATE", "BTECH", "POSTGRADUATE"],
    applicationEnd: "2026-06-15",
    status: "PUBLISHED",
    officialUrl: "https://upsc.gov.in",
  },
  {
    id: "job-3",
    slug: "rrb-assistant-loco-pilot-2026",
    title: "Assistant Loco Pilot (ALP) & Technicians",
    organization: "Railway Recruitment Boards",
    vacancies: 18799,
    eligibleQuals: ["CLASS_10", "CLASS_12", "DIPLOMA", "BTECH"],
    applicationEnd: "2026-06-30",
    status: "PUBLISHED",
    officialUrl: "https://indianrailways.gov.in",
  },
  {
    id: "job-4",
    slug: "ibps-probationary-officer-xiv",
    title: "Probationary Officers / Management Trainees (CRP PO/MT-XIV)",
    organization: "Institute of Banking Personnel Selection",
    vacancies: 3955,
    eligibleQuals: ["GRADUATE", "BTECH", "POSTGRADUATE"],
    applicationEnd: "2026-07-21",
    status: "DRAFT",
    officialUrl: "https://ibps.in",
  },
];

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<JobItem[]>(INITIAL_JOBS);
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.organization.toLowerCase().includes(search.toLowerCase())
  );

  const totalVacancies = jobs.reduce((acc, j) => acc + j.vacancies, 0);

  return (
    <div>
      <PageHeader title="Job Guides & Vacancies" description="Official government recruitment notifications, eligible qualifications, and application deadlines.">
        <button type="button" className={buttonClass.primary}>
          <Plus className="size-4" />
          <span>Post New Vacancy</span>
        </button>
      </PageHeader>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-body uppercase tracking-wider">Active Alerts</p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">{jobs.length}</p>
        </div>
        <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-body uppercase tracking-wider">Total Vacancies</p>
          <p className="mt-1 font-display text-2xl font-bold text-forest">
            {totalVacancies.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-body uppercase tracking-wider">Verified Guides</p>
          <p className="mt-1 font-display text-2xl font-bold text-olive">
            {jobs.filter((j) => j.status === "PUBLISHED").length}
          </p>
        </div>
        <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-bold text-body uppercase tracking-wider">National Boards</p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">4 Commissions</p>
        </div>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
        <input
          type="text"
          placeholder="Filter by exam commission, organization, or post title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-black/10 bg-white py-2 pl-9 pr-4 text-xs text-ink outline-none transition focus:border-forest focus:ring-1 focus:ring-forest"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredJobs.map((job) => (
          <div key={job.id} className="rounded-2xl border border-black/6 bg-white p-5 shadow-xs transition hover:border-forest/40 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold text-forest uppercase tracking-wider">{job.organization}</span>
                <Badge tone={job.status === "PUBLISHED" ? "green" : "yellow"}>{job.status}</Badge>
              </div>
              <h3 className="mt-2 font-display text-base font-bold text-ink leading-snug">{job.title}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-forest-tint px-2.5 py-1 font-semibold text-forest">
                  <Users className="size-3.5" />
                  {job.vacancies.toLocaleString()} Vacancies
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-lg bg-sand px-2.5 py-1 font-medium text-ink">
                  <Calendar className="size-3.5 text-body" />
                  Closes {job.applicationEnd}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.eligibleQuals.map((qual) => (
                  <span key={qual} className="rounded-md border border-black/8 bg-sand/40 px-2 py-0.5 text-[10px] font-medium text-body">
                    {qual}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-black/5 pt-3 flex items-center justify-between text-xs">
              <span className="text-body text-[11px]">Direct Official Portal</span>
              <a href={job.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-forest hover:underline">
                <span>Visit Commission</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
