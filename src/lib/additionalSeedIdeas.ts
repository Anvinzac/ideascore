import type { Idea } from "../types";
import { composeEnglishCopy } from "./descriptionComposer";

type SeedEntry = {
  name: string;
  description: string;
};

type SeedGroup = {
  category: string;
  items: SeedEntry[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const groups: SeedGroup[] = [
  {
    category: "Fitness & Wellness",
    items: [
      {
        name: "Client workout plan tracker [cite: 5]",
        description: "Logs and monitors customized exercise routines for individual clients.",
      },
      {
        name: "Session attendance logging tool [cite: 6]",
        description: "Records client check-ins and attendance for personal training sessions.",
      },
      {
        name: "Fitness goal progress tracker [cite: 7]",
        description: "Visualizes and updates client milestones toward specific fitness targets.",
      },
      {
        name: "Exercise library tagging tool [cite: 8]",
        description: "Categorizes workout movements by muscle group, equipment, or difficulty.",
      },
      {
        name: "Nutrition habit tracker [cite: 9]",
        description: "Monitors daily dietary choices and macro-nutrient intake consistency.",
      },
      {
        name: "Body-metric logging tool [cite: 10]",
        description: "Records physical measurements like weight, body fat percentage, and circumference.",
      },
      {
        name: "Trainer schedule conflict checker [cite: 11]",
        description: "Cross-references staff calendars to prevent double-booking sessions.",
      },
      {
        name: "Equipment maintenance tracker [cite: 12]",
        description: "Logs service dates and repair statuses for gym machines.",
      },
      {
        name: "Membership type tagging tool [cite: 13]",
        description: "Classifies users based on their active subscription or access tier.",
      },
      {
        name: "Class capacity tracker [cite: 14]",
        description: "Monitors real-time enrollment numbers against maximum room limits.",
      },
      {
        name: "Injury risk flag tracker [cite: 15]",
        description: "Highlights previous client injuries to modify workout plans safely.",
      },
      {
        name: "Sleep habit logging tool [cite: 16]",
        description: "Records daily sleep duration and quality metrics for recovery analysis.",
      },
      {
        name: "Wellness coach session tracker [cite: 17]",
        description: "Manages upcoming appointments and historical notes for wellness coaching.",
      },
      {
        name: "Group challenge progress tool [cite: 18]",
        description: "Tracks cumulative team metrics for gym-wide fitness competitions.",
      },
      {
        name: "Exercise video tagging tool [cite: 19]",
        description: "Organizes instructional video content by movement pattern or trainer.",
      },
    ],
  },
  {
    category: "SaaS/Software Products",
    items: [
      {
        name: "Feature request tracker [cite: 21]",
        description: "Collects and tallies user suggestions for new software capabilities.",
      },
      {
        name: "Bug priority labeling tool [cite: 22]",
        description: "Assigns severity levels to software defects for developer triage.",
      },
      {
        name: "Release note version tracker [cite: 23]",
        description: "Maintains a chronological log of updates and patches deployed to users.",
      },
      {
        name: "User onboarding status tool [cite: 24]",
        description: "Monitors a new user's progress through initial setup tutorials.",
      },
      {
        name: "Trial-to-paid conversion tracker [cite: 25]",
        description: "Logs when free users successfully upgrade to premium plans.",
      },
      {
        name: "API usage quota tracker [cite: 26]",
        description: "Monitors developer endpoints to ensure users stay within rate limits.",
      },
      {
        name: "User feedback tagging tool [cite: 27]",
        description: "Categorizes qualitative customer comments by sentiment or product area.",
      },
      {
        name: "Field customization log tool [cite: 28]",
        description: "Records personalized data fields created by enterprise clients.",
      },
      {
        name: "Upgrade path recommendation tool [cite: 29]",
        description: "Suggests higher-tier plans based on a user's current feature usage.",
      },
      {
        name: "Feature deprecation tracker [cite: 30]",
        description: "Manages the timeline and user communication for sunsetting old tools.",
      },
      {
        name: "Permission role tagging tool [cite: 31]",
        description: "Assigns and verifies access levels for different user types.",
      },
      {
        name: "Integration status dashboard [cite: 32]",
        description: "Displays the health and uptime of third-party software connections.",
      },
      {
        name: "Support ticket tagging tool [cite: 33]",
        description: "Classifies incoming help requests by topic or technical requirement.",
      },
      {
        name: "Feature adoption heatmap tool [cite: 34]",
        description: "Visualizes which areas of the software are used most frequently.",
      },
      {
        name: "Announcements targeting tool [cite: 35]",
        description: "Segments which users receive specific in-app update notifications.",
      },
    ],
  },
  {
    category: "Travel & Hospitality",
    items: [
      {
        name: "Guest reservation status tracker [cite: 37]",
        description: "Monitors booking states from confirmed to checked-out.",
      },
      {
        name: "Room cleaning status tracker [cite: 38]",
        description: "Updates the real-time turnover readiness of hotel rooms.",
      },
      {
        name: "Check-in document tracker [cite: 39]",
        description: "Verifies that passports, IDs, and registration cards are on file.",
      },
      {
        name: "Upsell opportunity tracker [cite: 40]",
        description: "Logs offers made to guests for room upgrades or premium services.",
      },
      {
        name: "Guest preference tagging tool [cite: 41]",
        description: "Records specific needs like extra pillows, allergies, or view requests.",
      },
      {
        name: "Loyalty stay tracker [cite: 42]",
        description: "Accumulates nights stayed for frequent guest program rewards.",
      },
      {
        name: "Housekeeping task tracker [cite: 43]",
        description: "Assigns specific cleaning duties to maintenance staff.",
      },
      {
        name: "Guest incident log tool [cite: 45]",
        description: "Documents complaints, accidents, or emergencies on the property.",
      },
      {
        name: "Local attraction tagging tool [cite: 46]",
        description: "Categorizes nearby points of interest for concierge recommendations.",
      },
      {
        name: "Group booking status tool [cite: 47]",
        description: "Manages room blocks and event spaces for large parties.",
      },
      {
        name: "House rule acknowledgment tracker [cite: 48]",
        description: "Records guest agreement to policies like noise limits or smoking bans.",
      },
      {
        name: "Early check-in tracker [cite: 49]",
        description: "Manages queue requests for guests arriving before standard times.",
      },
      {
        name: "Late check-out tracker [cite: 50]",
        description: "Monitors approved extensions for guest departures.",
      },
      {
        name: "Guest feedback tagging tool [cite: 51]",
        description: "Categorizes post-stay review comments into actionable departments.",
      },
    ],
  },
  {
    category: "Media & Content",
    items: [
      {
        name: "Article draft status tracker [cite: 53]",
        description: "Monitors a piece's lifecycle from outline to final publication.",
      },
      {
        name: "Content calendar task tool [cite: 54]",
        description: "Schedules and assigns upcoming publication dates.",
      },
      {
        name: "Topic tagging tool [cite: 55]",
        description: "Assigns thematic keywords to content for easy retrieval.",
      },
      {
        name: "Writer assignment tracker [cite: 56]",
        description: "Manages which freelancers or staff are handling specific briefs.",
      },
      {
        name: "Image rights tracker [cite: 57]",
        description: "Logs licensing agreements and usage permissions for visual assets.",
      },
      {
        name: "Publishing approval log tool [cite: 58]",
        description: "Records editor sign-offs before content goes live.",
      },
      {
        name: "Copyright expiration tracker [cite: 59]",
        description: "Alerts teams when leased or licensed content needs renewal.",
      },
      {
        name: "Audio-clip asset tracker [cite: 60]",
        description: "Manages soundbites and music files for podcast or video production.",
      },
      {
        name: "Episode release scheduler [cite: 61]",
        description: "Plans the rollout timeline for serialized media.",
      },
      {
        name: "Interview transcript tagging tool [cite: 62]",
        description: "Highlights key quotes and subjects within raw text files.",
      },
      {
        name: "Content repurposing tracker [cite: 63]",
        description: "Logs how a core piece of media is broken down into social snippets.",
      },
      {
        name: "SEO keyword tagging tool [cite: 64]",
        description: "Assigns search engine optimization targets to specific URLs.",
      },
      {
        name: "Analytics metric snapshot tool [cite: 65]",
        description: "Captures a moment-in-time look at traffic or engagement numbers.",
      },
      {
        name: "Contributor contract tracker [cite: 66]",
        description: "Monitors the signing and payment status of external creators.",
      },
      {
        name: "Content localization status tool [cite: 67]",
        description: "Tracks the translation progress of media into other languages.",
      },
    ],
  },
  {
    category: "Fintech/Financial Services",
    items: [
      {
        name: "Loan application status tracker [cite: 69]",
        description: "Monitors a borrower's progress through approval and underwriting.",
      },
      {
        name: "Credit score snapshot tracker [cite: 70]",
        description: "Captures and logs a user's credit rating at specific intervals.",
      },
      {
        name: "Transaction category tagging tool [cite: 71]",
        description: "Classifies individual purchases into buckets like groceries or travel.",
      },
      {
        name: "Budget line tagging tool [cite: 72]",
        description: "Assigns expenses against predefined monthly financial goals.",
      },
      {
        name: "Investment goal tracker [cite: 73]",
        description: "Visualizes progress toward targets like retirement or buying a house.",
      },
      {
        name: "Fee type tagging tool [cite: 74]",
        description: "Categorizes bank charges, such as overdrafts or wire transfers.",
      },
      {
        name: "Account relationship tagging tool [cite: 75]",
        description: "Links joint accounts or authorized users to a primary owner.",
      },
      {
        name: "KYC document status tool [cite: 77]",
        description: "Monitors the verification state of Know Your Customer IDs.",
      },
      {
        name: "Payment method tagging tool [cite: 78]",
        description: "Classifies incoming funds by source, like ACH, credit, or crypto.",
      },
      {
        name: "Fraud indicator flag tool [cite: 79]",
        description: "Highlights suspicious activity patterns for manual review.",
      },
      {
        name: "Risk profile tagging tool [cite: 80]",
        description: "Assigns a conservative or aggressive label to an investor's portfolio.",
      },
      {
        name: "Subscription billing tracker [cite: 81]",
        description: "Logs recurring outbound payments for a user's account.",
      },
      {
        name: "Tax category tagging tool [cite: 82]",
        description: "Marks transactions that are eligible for year-end deductions.",
      },
      {
        name: "Portfolio allocation tracker [cite: 83]",
        description: "Monitors the percentage split between stocks, bonds, and cash.",
      },
    ],
  },
];

export const additionalSeedIdeas: Idea[] = groups.flatMap((group, categoryIndex) =>
  group.items.map((item, itemIndex) => {
    const createdAt = new Date(Date.UTC(2026, 2, 2, 0, categoryIndex, itemIndex)).toISOString();
    const copy = composeEnglishCopy(group.category, item.name, item.description);
    return {
      id: `additional-${slugify(group.category)}-${slugify(item.name)}`,
      title: item.name,
      category: group.category,
      summary: copy.summary,
      details: copy.details,
      rating: 0 as const,
      note: "",
      source: "seed" as const,
      sortIndex: 5000 + categoryIndex * 100 + itemIndex,
      createdAt,
      updatedAt: createdAt,
    };
  }),
);

export const additionalSeedCategories = groups.map((group) => group.category);
