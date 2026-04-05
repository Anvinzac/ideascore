import type { Idea } from "../types";
import { composeEnglishCopy } from "./descriptionComposer.ts";

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

const capitalizeFirstLetter = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

const groups: SeedGroup[] = [
  {
    category: "Restaurants",
    items: [
      { name: "Order tracking tool [cite: 212]", description: "Monitors the status of a dish from kitchen preparation to table delivery." },
      { name: "Table assignment tool [cite: 213]", description: "Manages seating arrangements and current occupancy for arriving guests." },
      { name: "Staff scheduling tool [cite: 214]", description: "Organizes weekly shifts and time-off requests for servers and cooks." },
      { name: "Ingredient inventory tracker [cite: 215]", description: "Logs stock levels of raw food materials to prevent shortages." },
      { name: "Daily sales summary tool [cite: 216]", description: "Aggregates end-of-day revenue, tips, and transaction counts." },
      { name: "Menu item popularity tracker [cite: 217]", description: "Highlights which dishes are ordered most frequently over time." },
      { name: "Customer feedback collection tool [cite: 218]", description: "Gathers and categorizes reviews or complaints from diners." },
      { name: "Reservation waitlist tool [cite: 219]", description: "Manages the queue of walk-in guests during peak dining hours." },
      { name: "Special-diet request tracker [cite: 220]", description: "Flags specific allergy or dietary needs for the kitchen staff." },
      { name: "Kitchen station status tracker [cite: 221]", description: "Monitors the workload and output of the grill, fry, or prep areas." },
      { name: "Staff shift checklist tool [cite: 222]", description: "Ensures opening and closing duties are completed by employees." },
      { name: "Vendor delivery log tool [cite: 223]", description: "Records the receipt of produce, meat, and beverage shipments." },
      { name: "Waste tracking tool [cite: 224]", description: "Logs spoiled or discarded food to monitor efficiency and costs." },
      { name: "Loyalty program points tracker [cite: 225]", description: "Accumulates rewards for frequent diners based on their spending." },
      { name: "Table turnover timer tool [cite: 226]", description: "Measures the average time guests spend dining to optimize seating." },
    ],
  },
  {
    category: "Retail",
    items: [
      { name: "Store inventory count tool [cite: 228]", description: "Records physical stock levels against digital system records." },
      { name: "Price tag change tracker [cite: 229]", description: "Manages updates to product pricing for sales or markdowns." },
      { name: "Return reason tagging tool [cite: 230]", description: "Categorizes why customers brought items back, like sizing or defects." },
      { name: "Customer loyalty tier tracker [cite: 231]", description: "Monitors shopper status levels based on accumulated purchases." },
      { name: "Promotion performance tracker [cite: 232]", description: "Measures the sales uplift of specific discounts or marketing campaigns." },
      { name: "Shelf placement planner [cite: 233]", description: "Organizes where specific products should be displayed on the sales floor." },
      { name: "Loss prevention incident log [cite: 234]", description: "Documents suspected theft, damages, or security breaches." },
      { name: "Employee task checklist tool [cite: 235]", description: "Assigns daily floor duties like restocking or window displays." },
      { name: "Vendor rebate tracker [cite: 236]", description: "Monitors expected refunds or discounts from wholesale suppliers." },
      { name: "Product category tagging tool [cite: 237]", description: "Organizes merchandise by department, season, or style." },
      { name: "Clearance item status tracker [cite: 238]", description: "Manages products marked for final sale and their progressive discounts." },
      { name: "Online to offline order tracker [cite: 239]", description: "Monitors in-store pickups for purchases made on the website." },
      { name: "Staff training completion tracker [cite: 240]", description: "Logs when employees finish required modules on product knowledge or safety." },
      { name: "Customer size preference tracker [cite: 241]", description: "Records individual fit data to personalize future shopping recommendations." },
      { name: "Gift card balance tracker [cite: 242]", description: "Monitors issued, redeemed, and remaining funds on store vouchers." },
    ],
  },
  {
    category: "Logistics",
    items: [
      { name: "Shipment tracking status tool [cite: 244]", description: "Monitors the real-time location of freight in transit." },
      { name: "Delivery route planner [cite: 245]", description: "Optimizes the sequence of stops for a driver to maximize efficiency." },
      { name: "Driver duty log tool [cite: 246]", description: "Records hours worked and rest periods to ensure compliance." },
      { name: "Warehouse zone assignment tool [cite: 247]", description: "Allocates incoming goods to specific storage aisles or bins." },
      { name: "Freight cost estimation tool [cite: 248]", description: "Calculates expected shipping expenses based on weight, dimensions, and distance." },
      { name: "Import document status tracker [cite: 249]", description: "Monitors required paperwork for international border crossings." },
      { name: "Vehicle maintenance tracker [cite: 250]", description: "Logs service dates and repair needs for fleet trucks and vans." },
      { name: "Dock door scheduling tool [cite: 251]", description: "Manages arrival times for loading and unloading shipments." },
      { name: "Cargo damage log tool [cite: 252]", description: "Documents broken or compromised goods discovered during transit or receiving." },
      { name: "Carrier performance tracker [cite: 253]", description: "Measures third-party transport partners on on-time delivery rates." },
      { name: "Customs clearance status tool [cite: 254]", description: "Monitors shipments held at borders pending tax or inspection approval." },
      { name: "Pickup request tracker [cite: 255]", description: "Manages scheduled collections of goods from client locations." },
      { name: "Last-mile delivery status tool [cite: 256]", description: "Focuses on the final leg of transport to the end consumer's address." },
      { name: "Load weight logging tool [cite: 257]", description: "Records the total mass of a shipment to ensure vehicle safety limits are met." },
      { name: "Hazardous material tag tracker [cite: 258]", description: "Identifies and manages shipments requiring special handling or permits." },
    ],
  },
  {
    category: "Real Estate",
    items: [
      { name: "Property listing status tracker [cite: 260]", description: "Monitors a home's journey from active market to pending to sold." },
      { name: "Lead follow-up reminder tool [cite: 261]", description: "Prompts agents to contact potential buyers or sellers." },
      { name: "Open house visitor tracker [cite: 262]", description: "Logs contact information for guests attending a property viewing." },
      { name: "Commission split calculator tool [cite: 263]", description: "Determines the fee distribution between buying and selling brokers." },
      { name: "Lease term tracker [cite: 264]", description: "Monitors start and end dates for rental agreements." },
      { name: "Maintenance request tracker [cite: 265]", description: "Manages repair tickets submitted by tenants to property managers." },
      { name: "Property inspection checklist tool [cite: 266]", description: "Guides agents or inspectors through a standardized evaluation of a building." },
      { name: "Tenant screening status tool [cite: 267]", description: "Monitors background checks and credit reports for rental applicants." },
      { name: "Market price comparison tool [cite: 268]", description: "Aggregates recent sales data for similar neighborhood properties." },
      { name: "Showing schedule planner [cite: 269]", description: "Coordinates viewing times between agents, buyers, and current occupants." },
      { name: "Contract milestone tracker [cite: 270]", description: "Monitors critical deadlines like appraisal, financing, and closing dates." },
      { name: "Utility read-in readout tool [cite: 271]", description: "Logs meter numbers when ownership or tenancy changes hands." },
      { name: "Property renovation log tool [cite: 272]", description: "Documents updates and repairs made to increase a home's value." },
      { name: "Neighborhood data tagging tool [cite: 273]", description: "Categorizes areas by school districts, amenities, or walkability scores." },
      { name: "Offer status comparison tool [cite: 274]", description: "Evaluates multiple bids on a single property side-by-side." },
    ],
  },
  {
    category: "Manufacturing",
    items: [
      { name: "Machine uptime logging tool [cite: 276]", description: "Records the active, operational hours of factory equipment." },
      { name: "Defect type tagging tool [cite: 277]", description: "Categorizes product flaws to identify recurring production issues." },
      { name: "Work order progress tracker [cite: 278]", description: "Monitors a specific job's status through the assembly line." },
      { name: "Raw material consumption tracker [cite: 279]", description: "Measures the amount of inputs used during a production cycle." },
      { name: "Quality control checklist tool [cite: 280]", description: "Ensures final products meet standardized safety and performance criteria." },
      { name: "Shift productivity tracker [cite: 281]", description: "Measures the output volume of a specific team during their working hours." },
      { name: "Tool calibration schedule tool [cite: 282]", description: "Manages periodic adjustments to ensure measurement instruments are accurate." },
      { name: "Safety incident log tool [cite: 283]", description: "Documents workplace accidents, near misses, or hazard reports." },
      { name: "Production batch tracking tool [cite: 284]", description: "Traces a specific group of products back to their manufacturing date and materials." },
      { name: "Maintenance work order tracker [cite: 285]", description: "Manages repair requests for factory infrastructure or machinery." },
      { name: "Supplier quality score tracker [cite: 286]", description: "Evaluates vendors based on the defect rate of their provided materials." },
      { name: "Capacity planning helper [cite: 287]", description: "Estimates future production capabilities based on available labor and machines." },
      { name: "Change order tracking tool [cite: 288]", description: "Manages client-requested modifications to a product's design mid-production." },
      { name: "Waste material logging tool [cite: 289]", description: "Records the volume of scrap generated to improve material efficiency." },
      { name: "Equipment location tracker [cite: 290]", description: "Monitors where mobile tools and machinery are situated on the factory floor." },
    ],
  },
  {
    category: "Professional Services (Consulting, Legal, Accounting, etc.)",
    items: [
      { name: "Client contact log tool [cite: 292]", description: "Records all calls, meetings, and emails with specific accounts." },
      { name: "Proposal status tracker [cite: 293]", description: "Monitors pending bids from initial drafting to client signature." },
      { name: "Time entry verification tool [cite: 294]", description: "Ensures billable hours logged by staff are accurate and assigned correctly." },
      { name: "Document version comparison tool [cite: 295]", description: "Highlights changes between multiple drafts of contracts or reports." },
      { name: "Conflict of interest checker tool [cite: 296]", description: "Cross-references new clients against existing ones to prevent ethical breaches." },
      { name: "Matter status dashboard [cite: 297]", description: "Provides a high-level view of active legal cases or consulting projects." },
      { name: "Billing milestone tracker [cite: 298]", description: "Flags when a project phase is complete and ready for invoicing." },
      { name: "Expertise skill tagging tool [cite: 299]", description: "Categorizes staff members by their specific industry knowledge or certifications." },
      { name: "Knowledge base tagging tool [cite: 300]", description: "Organizes past reports, templates, and research for internal reuse." },
      { name: "Client project timeline tool [cite: 301]", description: "Visualizes start dates, deadlines, and key deliverables for an engagement." },
      { name: "Retainer usage tracker [cite: 302]", description: "Monitors how many prepaid hours a client has consumed in a given month." },
      { name: "Task delegation tracker [cite: 303]", description: "Assigns and monitors specific sub-components of a larger project to junior staff." },
      { name: "Meeting agenda library tool [cite: 304]", description: "Stores standardized templates for recurring client check-ins or project kickoffs." },
      { name: "Compliance requirement tracker [cite: 305]", description: "Ensures all necessary regulatory filings or ethical standards are met." },
      { name: "Engagement risk tagging tool [cite: 306]", description: "Identifies potential financial, legal, or reputational hazards associated with a new client." },
    ],
  },
  {
    category: "Construction",
    items: [
      { name: "Blueprint version tracker [cite: 308]", description: "Ensures field teams are building from the most recently approved architectural plans." },
      { name: "Trade subcontractor tracker [cite: 309]", description: "Manages the schedules and contact info for plumbers, electricians, and other specialists." },
      { name: "Change order tracker [cite: 310]", description: "Documents client-requested modifications that affect project scope or budget." },
      { name: "Daily site report log tool [cite: 311]", description: "Summarizes weather, worker headcount, and progress made on a specific day." },
      { name: "Safety inspection checklist tool [cite: 312]", description: "Guides supervisors through OSHA or local regulatory compliance checks." },
      { name: "Material delivery log tool [cite: 313]", description: "Records the arrival of lumber, concrete, or steel at the job site." },
      { name: "Work-in-progress photography log [cite: 314]", description: "Archives visual evidence of construction phases for client updates or disputes." },
      { name: "Punch list tracker [cite: 315]", description: "Manages minor fixes and finishing touches required before project handover." },
      { name: "Crane and equipment log tool [cite: 316]", description: "Monitors the usage hours and rental status of heavy machinery." },
      { name: "Permit status tracker [cite: 317]", description: "Monitors applications pending with local government zoning or building departments." },
      { name: "Quality inspection checklist tool [cite: 318]", description: "Ensures completed work meets engineering specifications and standards." },
      { name: "Subcontractor safety training tracker [cite: 319]", description: "Verifies all site workers have completed required hazard awareness courses." },
      { name: "Site access log tool [cite: 320]", description: "Records which personnel entered and exited the secure construction zone." },
      { name: "Weather disruption log tool [cite: 321]", description: "Documents rain or storm delays that impact the project timeline." },
      { name: "Construction cost variance tracker [cite: 322]", description: "Compares actual spending on labor and materials against the original estimate." },
    ],
  },
  {
    category: "Nonprofits",
    items: [
      { name: "Donor contact history tool [cite: 324]", description: "Records past contributions, communications, and meeting notes for benefactors." },
      { name: "Grant application status tracker [cite: 325]", description: "Monitors funding proposals from initial drafting to final decision." },
      { name: "Volunteer shift log tool [cite: 326]", description: "Manages sign-ups and records hours worked by unpaid supporters." },
      { name: "Campaign impact tagging tool [cite: 327]", description: "Links specific donations or efforts to measurable real-world outcomes." },
      { name: "Event attendance tracker [cite: 328]", description: "Manages RSVPs and check-ins for fundraisers or community gatherings." },
      { name: "Program outcome metric tool [cite: 329]", description: "Measures the success of services provided, like meals served or individuals housed." },
      { name: "Donation source tagging tool [cite: 330]", description: "Categorizes funds by origin, such as corporate matching, online campaigns, or direct mail." },
      { name: "In-kind donation tracker [cite: 331]", description: "Logs physical goods received, like clothing or equipment, rather than monetary gifts." },
      { name: "Beneficiary intake form tool [cite: 332]", description: "Manages the initial registration and needs assessment of individuals seeking services." },
      { name: "Volunteer skill tagging tool [cite: 333]", description: "Categorizes supporters by specific abilities, like graphic design or legal advice." },
      { name: "Matching gift tracker [cite: 334]", description: "Monitors employer pledges that double an individual donor's contribution." },
      { name: "Reporting deadline reminder tool [cite: 335]", description: "Flags dates when compliance or impact updates are due to major grant providers." },
      { name: "Partner organization log tool [cite: 336]", description: "Manages relationships and collaborative projects with allied charities or agencies." },
      { name: "Advocacy action tracker [cite: 337]", description: "Measures community engagement, like petition signatures or letters sent to representatives." },
      { name: "Community feedback tagging tool [cite: 338]", description: "Categorizes input and survey responses from the populations served." },
    ],
  },
];

export const moreSeedIdeas: Idea[] = groups.flatMap((group, categoryIndex) =>
  group.items.map((item, itemIndex) => {
    const createdAt = new Date(Date.UTC(2026, 2, 3, 0, categoryIndex, itemIndex)).toISOString();
    const normalizedName = capitalizeFirstLetter(item.name);
    const copy = composeEnglishCopy(group.category, normalizedName, item.description);
    return {
      id: `additional-2-${slugify(group.category)}-${slugify(normalizedName)}`,
      title: normalizedName,
      category: group.category,
      summary: copy.summary,
      details: copy.details,
      rating: 0 as const,
      note: "",
      phase: 1 as const,
      aiThreads: {},
      repoLink: "",
      demoLink: "",
      source: "seed" as const,
      sortIndex: 8000 + categoryIndex * 100 + itemIndex,
      createdAt,
      updatedAt: createdAt,
    };
  }),
);

export const moreSeedCategories = groups.map((group) => group.category);
