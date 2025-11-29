import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import { PortableText, PortableTextBlock } from "next-sanity";
import Image from "next/image";

interface WorkExperience {
  _id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: "yes" | "no";
  order: number;
}

interface Education {
  _id: string;
  place: string;
  description: string;
}

interface HomePageData {
  profile: {
    _id: string;
    bio: PortableTextBlock[];
  };
  workExperience: WorkExperience[];
  education: Education[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const data = await client.fetch<HomePageData>(HOME_PAGE_QUERY, {}, options);

  if (!data) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6 sm:p-8 md:p-12">
        <p className="text-neutral-600 dark:text-neutral-400">
          No content available.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 sm:p-8 md:p-12">
      {/* Avatar */}
      <div className="mb-12 flex justify-center md:justify-start md:pl-[132px]">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-neutral-200 dark:ring-neutral-700">
          <Image
            src="/eric.jpg"
            alt="Eric Kim"
            width={96}
            height={96}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>

      {/* About Me Section */}
      {data.profile && (
        <section className="mb-12 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 md:gap-8">
          <h2 className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            about me
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <PortableText value={data.profile.bio} />
          </div>
        </section>
      )}

      {/* Work Section */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section className="mb-12 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 md:gap-8">
          <h2 className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            work
          </h2>
          <div className="space-y-4">
            {[...data.workExperience].reverse().map((work) => {
              const startDate = formatDate(work.startDate);
              const endDate =
                work.current === "yes"
                  ? "Present"
                  : work.endDate
                    ? formatDate(work.endDate)
                    : "";
              const dateRange = `${startDate} - ${endDate}`;

              return (
                <div
                  key={work._id}
                  className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4 last:border-0"
                >
                  <div className="flex-1">
                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                      {work.company}
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400">
                      {work.role}
                    </div>
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                    {dateRange}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="mb-12 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 md:gap-8">
          <h2 className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            education
          </h2>
          <div className="space-y-4">
            {[...data.education].reverse().map((edu) => (
              <div
                key={edu._id}
                className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4 last:border-0"
              >
                <div className="flex-1">
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">
                    {edu.place}
                  </div>
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {edu.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
