import type { Idea } from "../types";
import { normalizeIdeaTitleKey, seedDescriptionOverrides } from "./descriptionOverrides";
import { additionalSeedCategories, additionalSeedIdeas } from "./additionalSeedIdeas";
import { moreSeedCategories, moreSeedIdeas } from "./additionalSeedIdeas2";

export const seedCategories = [
  {
    category: "Education",
    items: [
      "Student attendance tracking tool",
      "Homework submission review tool",
      "Gradebook management tool",
      "Classroom seating planner tool",
      "Lesson plan approval tool",
      "Student behavior logging tool",
      "Parent communication log tool",
      "Extracurricular activity sign-up tool",
      "Resource booking management tool",
      "Exam scheduling coordination tool",
      "Student progress tagging tool",
      "Curriculum content versioning tool",
      "Field trip consent form tool",
      "Teacher professional development tracking tool",
      "Alumni contact update tool",
    ],
  },
  {
    category: "Healthcare",
    items: [
      "Patient check-in management tool",
      "Medication administration tracking tool",
      "Appointment scheduling tool",
      "Vital signs recording tool",
      "Lab result notification tool",
      "Patient allergy flagging tool",
      "Medical history update tool",
      "Discharge instruction generation tool",
      "Equipment sterilization logging tool",
      "Staff shift handover tool",
      "Insurance claim status tool",
      "Patient feedback collection tool",
      "Medical supply reorder tool",
      "Consent form digital signing tool",
      "Bed occupancy status tool",
    ],
  },
  {
    category: "Restaurants",
    items: [
      "Order tracking tool",
      "Table assignment tool",
      "Staff scheduling tool",
      "Inventory ingredient depletion tool",
      "Reservation booking tool",
      "Daily specials update tool",
      "Customer feedback capture tool",
      "Supplier delivery confirmation tool",
      "Recipe cost calculator tool",
      "Waste tracking logging tool",
      "Employee tip distribution tool",
      "Menu item availability tool",
      "Kitchen prep list generation tool",
      "Customer loyalty point update tool",
      "Table cleaning status tool",
    ],
  },
  {
    category: "Retail",
    items: [
      "Product stock level viewer tool",
      "Customer purchase history tool",
      "Daily sales report tool",
      "Supplier order placement tool",
      "Employee shift assignment tool",
      "Price tag printing tool",
      "Return processing initiation tool",
      "Product display compliance tool",
      "Customer loyalty program enrollment tool",
      "Promotion activation scheduling tool",
      "Fitting room availability tool",
      "Store transfer request tool",
      "Product review moderation tool",
      "Gift card balance checker tool",
      "Visual merchandising feedback tool",
    ],
  },
  {
    category: "Logistics",
    items: [
      "Shipment tracking status tool",
      "Route optimization planning tool",
      "Warehouse slotting assignment tool",
      "Delivery manifest generation tool",
      "Fleet maintenance scheduling tool",
      "Package dimension entry tool",
      "Driver availability update tool",
      "Customs document preparation tool",
      "Loading dock scheduling tool",
      "Damaged goods reporting tool",
      "Fuel consumption logging tool",
      "Container temperature monitoring tool",
      "Proof of delivery capture tool",
      "Freight cost estimation tool",
      "Last-mile delivery status tool",
    ],
  },
  {
    category: "Real Estate",
    items: [
      "Property listing creation tool",
      "Client viewing schedule tool",
      "Offer submission tracking tool",
      "Document signing request tool",
      "Maintenance request logging tool",
      "Property valuation calculator tool",
      "Agent commission tracking tool",
      "Lease agreement generation tool",
      "Open house visitor registration tool",
      "Tenant communication log tool",
      "Property expense categorization tool",
      "Market trend data visualization tool",
      "Contract clause library tool",
      "Lead source attribution tool",
      "Property inspection checklist tool",
    ],
  },
  {
    category: "Manufacturing",
    items: [
      "Production order creation tool",
      "Machine status monitoring tool",
      "Quality control inspection tool",
      "Raw material inventory tracking tool",
      "Workstation assignment tool",
      "Defect logging and categorization tool",
      "Maintenance request submission tool",
      "Bill of materials viewer tool",
      "Production line output tracking tool",
      "Tooling usage logging tool",
      "Safety incident reporting tool",
      "Component traceability tagging tool",
      "Energy consumption monitoring tool",
      "Supplier component quality rating tool",
      "Finished goods dispatch tool",
    ],
  },
  {
    category: "Professional Services",
    items: [
      "Client project initiation tool",
      "Time entry logging tool",
      "Invoice generation tool",
      "Meeting scheduling tool",
      "Task progress update tool",
      "Client feedback collection tool",
      "Contract renewal notification tool",
      "Resource allocation planning tool",
      "Expense claim submission tool",
      "Knowledge base article creation tool",
      "Client communication history tool",
      "Proposal template selection tool",
      "Skill matrix update tool",
      "Project budget tracking tool",
      "Deliverable approval request tool",
    ],
  },
  {
    category: "Construction",
    items: [
      "Project task assignment tool",
      "Daily site report tool",
      "Material order tracking tool",
      "Equipment usage logging tool",
      "Safety inspection checklist tool",
      "Subcontractor payment approval tool",
      "Change order request tool",
      "Blueprint version control tool",
      "Permit application status tool",
      "Site visitor log tool",
      "Progress photo capture tool",
      "Tool inventory checkout tool",
      "Hazard identification tagging tool",
      "Waste disposal tracking tool",
      "Project milestone update tool",
    ],
  },
  {
    category: "Nonprofits",
    items: [
      "Donor contact management tool",
      "Donation tracking entry tool",
      "Volunteer shift scheduling tool",
      "Grant application status tool",
      "Event registration management tool",
      "Campaign performance monitoring tool",
      "Beneficiary impact reporting tool",
      "Fundraising goal progress tool",
      "Communication outreach logging tool",
      "Membership renewal reminder tool",
      "Volunteer skill matching tool",
      "Program expense categorization tool",
      "Advocacy action tracking tool",
      "Board meeting minute distribution tool",
      "Impact story collection tool",
    ],
  },
  {
    category: "Finance",
    items: [
      "Transaction categorization tool",
      "Budget allocation adjustment tool",
      "Expense receipt upload tool",
      "Invoice approval routing tool",
      "Payment reconciliation matching tool",
      "Account balance inquiry tool",
      "Fraud alert flagging tool",
      "Investment portfolio performance tool",
      "Loan application status tool",
      "Audit trail generation tool",
      "Compliance document review tool",
      "Financial report customization tool",
      "Risk assessment scoring tool",
      "Currency exchange rate update tool",
      "Tax document preparation tool",
    ],
  },
  {
    category: "Marketing",
    items: [
      "Campaign performance tracking tool",
      "Content calendar scheduling tool",
      "Social media post drafting tool",
      "Email list segmentation tool",
      "Ad spend budget allocation tool",
      "Customer journey mapping tool",
      "A/B test result analysis tool",
      "SEO keyword ranking tool",
      "Website traffic source tool",
      "Lead qualification tagging tool",
      "Brand asset library tool",
      "Competitor activity monitoring tool",
      "Customer survey deployment tool",
      "Marketing automation rule creation tool",
      "Influencer collaboration tracking tool",
    ],
  },
] as const;

export const categoryOrder = Array.from(
  new Set([...seedCategories.map((entry) => entry.category), ...additionalSeedCategories, ...moreSeedCategories]),
);

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

const makeSummary = (category: string, title: string) => {
  const override = seedDescriptionOverrides.get(normalizeIdeaTitleKey(title));
  if (override) {
    return override;
  }
  const subject = title.replace(/\s*tool$/i, "").trim();
  return `A focused ${category.toLowerCase()} micro-tool for ${subject.toLowerCase()}.`;
};

const makeDetails = (category: string, title: string) => {
  const override = seedDescriptionOverrides.get(normalizeIdeaTitleKey(title));
  if (override) {
    return override;
  }
  const subject = title.replace(/\s*tool$/i, "").trim();
  return [
    `This idea sits in ${category} and is built around ${subject.toLowerCase()}.`,
    "It works best when the workflow needs one short action, a simple status, and a clear handoff.",
    "That makes it a good fit for a mobile-first tool review workflow.",
  ].join(" ");
};

export const buildSeedIdeas = (): Idea[] =>
  [
    ...seedCategories.flatMap((group, categoryIndex) =>
      group.items.map((title, itemIndex) => {
        const normalizedTitle = capitalizeFirstLetter(title);
        const createdAt = new Date(Date.UTC(2026, 2, 1, 0, categoryIndex, itemIndex)).toISOString();
        return {
          id: `${slugify(group.category)}-${slugify(normalizedTitle)}`,
          title: normalizedTitle,
          category: group.category,
          summary: makeSummary(group.category, normalizedTitle),
          details: makeDetails(group.category, normalizedTitle),
          rating: 0 as const,
          note: "",
          source: "seed" as const,
          sortIndex: categoryIndex * 100 + itemIndex,
          createdAt,
          updatedAt: createdAt,
        };
      }),
    ),
    ...additionalSeedIdeas,
    ...moreSeedIdeas,
  ];

export const isSeedCategory = (value: string) =>
  seedCategories.some((entry) => entry.category === value) ||
  additionalSeedCategories.includes(value) ||
  moreSeedCategories.includes(value);

export const createDefaultIdea = (category: string, title = "Untitled idea"): Idea => {
  const createdAt = new Date().toISOString();
  return {
    id: `custom-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`,
    title,
    category,
    summary: makeSummary(category, title),
    details: makeDetails(category, title),
    rating: 0,
    note: "",
    source: "custom",
    sortIndex: 9999,
    createdAt,
    updatedAt: createdAt,
  };
};

export const normalizeCategoryOrder = (categories: string[]) => {
  const known = categoryOrder.filter((category) => categories.includes(category));
  const custom = categories.filter((category) => !known.includes(category));
  return [...known, ...custom];
};
