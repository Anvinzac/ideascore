export const normalizeIdeaTitleKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/\[cite:\s*\d+\]/g, "")
    .replace(/\btool\b$/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

export const seedDescriptionOverrides = new Map<string, string>([
  [
    normalizeIdeaTitleKey("Policy lifecycle tracker [cite: 85]"),
    "Monitors an insurance policy from creation to expiration or renewal. [cite: 85]",
  ],
  [
    normalizeIdeaTitleKey("Claim severity tagging tool [cite: 86]"),
    "Classifies incident reports by potential financial impact and urgency. [cite: 86]",
  ],
  [
    normalizeIdeaTitleKey("Document submission tracker [cite: 87]"),
    "Logs the receipt of required forms and evidence for processing. [cite: 87]",
  ],
  [
    normalizeIdeaTitleKey("Underwriting checklist tool [cite: 88]"),
    "Ensures all risk assessment criteria are met before policy approval. [cite: 88]",
  ],
  [
    normalizeIdeaTitleKey("Renewal reminder tracker [cite: 89]"),
    "Flags upcoming policy expirations for proactive client outreach. [cite: 89]",
  ],
  [
    normalizeIdeaTitleKey("Excess and deductible tracker [cite: 90]"),
    "Calculates and monitors out-of-pocket client responsibilities. [cite: 90]",
  ],
  [
    normalizeIdeaTitleKey("Risk category tagging tool [cite: 91]"),
    "Assigns standardized risk profiles to clients or specific assets. [cite: 91]",
  ],
  [
    normalizeIdeaTitleKey("Insured asset tagging tool [cite: 92]"),
    "Catalogs specific properties, vehicles, or items covered under a policy. [cite: 92]",
  ],
  [
    normalizeIdeaTitleKey("Claim adjuster task tracker [cite: 93]"),
    "Assigns and monitors field inspection duties for insurance staff. [cite: 93]",
  ],
  [
    normalizeIdeaTitleKey("Coverage gap detector tool [cite: 94]"),
    "Identifies missing protections in a client's current insurance portfolio. [cite: 94]",
  ],
  [
    normalizeIdeaTitleKey("Policyholder interaction log [cite: 95]"),
    "Records all phone calls, emails, and meetings with the insured client. [cite: 95]",
  ],
  [
    normalizeIdeaTitleKey("Premium payment tracker [cite: 96]"),
    "Monitors incoming monthly or annual billing for active policies. [cite: 96]",
  ],
  [
    normalizeIdeaTitleKey("Rider attachment tracker [cite: 97]"),
    "Logs specialized add-ons or modifications to a standard policy. [cite: 97]",
  ],
  [
    normalizeIdeaTitleKey("Claim status dashboard [cite: 98]"),
    "Provides a high-level view of pending, approved, and denied claims. [cite: 98]",
  ],
  [
    normalizeIdeaTitleKey("Fraud pattern flag tool [cite: 99]"),
    "Highlights inconsistencies or suspicious activities in submitted claims. [cite: 99]",
  ],
  [
    normalizeIdeaTitleKey("Client campaign brief tracker [cite: 101]"),
    "Monitors the completion and approval of initial project requirements. [cite: 101]",
  ],
  [
    normalizeIdeaTitleKey("Creative asset version tracker [cite: 102]"),
    "Logs iterations of design files to ensure the latest version is used. [cite: 102]",
  ],
  [
    normalizeIdeaTitleKey("Media spend tracker [cite: 103]"),
    "Monitors ongoing advertising budgets across multiple platforms. [cite: 103]",
  ],
  [
    normalizeIdeaTitleKey("Ad copy library tool [cite: 104]"),
    "Stores and organizes approved text snippets for various campaigns. [cite: 104]",
  ],
  [
    normalizeIdeaTitleKey("Channel performance summary tool [cite: 105]"),
    "Aggregates top-level metrics from social, search, and email efforts. [cite: 105]",
  ],
  [
    normalizeIdeaTitleKey("Creative review status tracker [cite: 106]"),
    "Manages internal and client feedback loops for design assets. [cite: 106]",
  ],
  [
    normalizeIdeaTitleKey("A/B test variant tracker [cite: 107]"),
    "Logs different ad versions to compare performance outcomes. [cite: 107]",
  ],
  [
    normalizeIdeaTitleKey("Influencer contract tracker [cite: 108]"),
    "Monitors deliverables and payment schedules for external creators. [cite: 108]",
  ],
  [
    normalizeIdeaTitleKey("Content approval tracker [cite: 109]"),
    "Records official sign-offs from stakeholders before publishing. [cite: 109]",
  ],
  [
    normalizeIdeaTitleKey("Budget allocation tracker [cite: 110]"),
    "Distributes total campaign funds into specific marketing channels. [cite: 110]",
  ],
  [
    normalizeIdeaTitleKey("Reporting deadline tracker [cite: 111]"),
    "Schedules and flags due dates for monthly client analytics updates. [cite: 111]",
  ],
  [
    normalizeIdeaTitleKey("Social media calendar tool [cite: 112]"),
    "Plans and visualizes upcoming posts across various platforms. [cite: 112]",
  ],
  [
    normalizeIdeaTitleKey("Target audience tagging tool [cite: 113]"),
    "Categorizes campaigns by demographic, interest, or behavioral traits. [cite: 113]",
  ],
  [
    normalizeIdeaTitleKey("Campaign brief change tracker [cite: 114]"),
    "Logs mid-project scope shifts requested by the client. [cite: 114]",
  ],
  [
    normalizeIdeaTitleKey("Creative reuse tracker [cite: 115]"),
    "Identifies older successful assets that can be refreshed and republished. [cite: 115]",
  ],
  [
    normalizeIdeaTitleKey("Course completion tracker [cite: 117]"),
    "Monitors a learner's overall progress through a digital curriculum. [cite: 117]",
  ],
  [
    normalizeIdeaTitleKey("Video progress tracker [cite: 118]"),
    "Logs exactly where a student paused a specific lecture video. [cite: 118]",
  ],
  [
    normalizeIdeaTitleKey("Quiz attempt tracker [cite: 119]"),
    "Records the number of retakes and scores for module assessments. [cite: 119]",
  ],
  [
    normalizeIdeaTitleKey("Learning path enrollment tool [cite: 120]"),
    "Assigns structured sequences of courses to specific users. [cite: 120]",
  ],
  [
    normalizeIdeaTitleKey("Skill mastery tracker [cite: 121]"),
    "Visualizes a user's proficiency levels in distinct subject areas. [cite: 121]",
  ],
  [
    normalizeIdeaTitleKey("Certification eligibility tracker [cite: 122]"),
    "Verifies that all prerequisites are met before issuing a diploma. [cite: 122]",
  ],
  [
    normalizeIdeaTitleKey("Discussion thread tagging tool [cite: 123]"),
    "Categorizes forum posts by topic or required instructor intervention. [cite: 123]",
  ],
  [
    normalizeIdeaTitleKey("Instructor feedback tracker [cite: 124]"),
    "Logs personalized comments left by teachers on student submissions. [cite: 124]",
  ],
  [
    normalizeIdeaTitleKey("Course update log tool [cite: 125]"),
    "Records edits and newly added materials to existing classes. [cite: 125]",
  ],
  [
    normalizeIdeaTitleKey("Learner engagement snapshot tool [cite: 126]"),
    "Captures metrics on login frequency and active participation time. [cite: 126]",
  ],
  [
    normalizeIdeaTitleKey("Micro-credential tracker [cite: 127]"),
    "Monitors the earning of digital badges for specific short-term skills. [cite: 127]",
  ],
  [
    normalizeIdeaTitleKey("Bundle course status tracker [cite: 128]"),
    "Manages access and progress across a packaged group of related classes. [cite: 128]",
  ],
  [
    normalizeIdeaTitleKey("Peer review tracker [cite: 129]"),
    "Assigns and monitors student-to-student grading assignments. [cite: 129]",
  ],
  [
    normalizeIdeaTitleKey("Learning resource tagging tool [cite: 130]"),
    "Organizes supplemental materials like PDFs and links by subject. [cite: 130]",
  ],
  [
    normalizeIdeaTitleKey("Platform access change tracker [cite: 131]"),
    "Logs upgrades, downgrades, or suspensions of student accounts. [cite: 131]",
  ],
  [
    normalizeIdeaTitleKey("Student attendance tracking tool [cite: 180]"),
    "Records daily presence, absences, and tardiness for individuals. [cite: 180]",
  ],
  [
    normalizeIdeaTitleKey("Homework submission review tool [cite: 181]"),
    "Monitors whether assignments were turned in on time or late. [cite: 181]",
  ],
  [
    normalizeIdeaTitleKey("Gradebook management tool [cite: 182]"),
    "Calculates and stores academic scores for a specific class. [cite: 182]",
  ],
  [
    normalizeIdeaTitleKey("Classroom seating planner [cite: 183]"),
    "Assigns and organizes desk arrangements for students. [cite: 183]",
  ],
  [
    normalizeIdeaTitleKey("Assignment deadline reminder tool [cite: 184]"),
    "Flags upcoming due dates for projects and papers. [cite: 184]",
  ],
  [
    normalizeIdeaTitleKey("Exam schedule planner [cite: 185]"),
    "Organizes the dates, times, and locations of major tests. [cite: 185]",
  ],
  [
    normalizeIdeaTitleKey("Course material version tracking tool [cite: 186]"),
    "Ensures teachers are using the most current syllabus and handouts. [cite: 186]",
  ],
  [
    normalizeIdeaTitleKey("Parent communication log tool [cite: 187]"),
    "Records all emails, calls, and meetings with a student's guardians. [cite: 187]",
  ],
  [
    normalizeIdeaTitleKey("Classroom behavior tracking tool [cite: 188]"),
    "Logs disciplinary incidents or positive reinforcement notes. [cite: 188]",
  ],
  [
    normalizeIdeaTitleKey("School resource inventory tracker [cite: 189]"),
    "Monitors the checkout status of shared items like laptops or books. [cite: 189]",
  ],
  [
    normalizeIdeaTitleKey("Syllabus content tagging tool [cite: 190]"),
    "Links specific lessons to overarching academic standards or goals. [cite: 190]",
  ],
  [
    normalizeIdeaTitleKey("Student portfolio organization tool [cite: 191]"),
    "Compiles exemplary work samples over the course of an academic year. [cite: 191]",
  ],
  [
    normalizeIdeaTitleKey("Teacher training completion tracker [cite: 192]"),
    "Monitors required professional development hours for faculty. [cite: 192]",
  ],
  [
    normalizeIdeaTitleKey("Classroom supply ordering tool [cite: 193]"),
    "Manages requests for basic materials like paper, markers, and tissues. [cite: 193]",
  ],
  [
    normalizeIdeaTitleKey("Field trip consent tracker [cite: 194]"),
    "Verifies which students have submitted signed permission slips. [cite: 194]",
  ],
  [
    normalizeIdeaTitleKey("Patient check-in management tool [cite: 196]"),
    "Monitors arrival status and queue position in the waiting room. [cite: 196]",
  ],
  [
    normalizeIdeaTitleKey("Medication tracking tool [cite: 197]"),
    "Logs current prescriptions and dosage instructions for a patient. [cite: 197]",
  ],
  [
    normalizeIdeaTitleKey("Appointment scheduling tool [cite: 198]"),
    "Manages clinical calendars and available time slots for providers. [cite: 198]",
  ],
  [
    normalizeIdeaTitleKey("Patient consent form tracker [cite: 199]"),
    "Verifies that required privacy and treatment agreements are signed. [cite: 199]",
  ],
  [
    normalizeIdeaTitleKey("Vital signs logging tool [cite: 200]"),
    "Records routine measurements like blood pressure, temperature, and heart rate. [cite: 200]",
  ],
  [
    normalizeIdeaTitleKey("Lab result status tracker [cite: 201]"),
    "Monitors whether tests are pending, received, or reviewed. [cite: 201]",
  ],
  [
    normalizeIdeaTitleKey("Immunization record tracker [cite: 202]"),
    "Logs dates of administered vaccines and upcoming boosters. [cite: 202]",
  ],
  [
    normalizeIdeaTitleKey("Prescription refill request tool [cite: 203]"),
    "Manages pharmacy inquiries for renewing patient medications. [cite: 203]",
  ],
  [
    normalizeIdeaTitleKey("Patient document versioning tool [cite: 204]"),
    "Ensures the most recent medical history forms are easily accessible. [cite: 204]",
  ],
  [
    normalizeIdeaTitleKey("Treatment plan milestone tracker [cite: 205]"),
    "Visualizes progress in long-term recovery or physical therapy. [cite: 205]",
  ],
  [
    normalizeIdeaTitleKey("Referral request management tool [cite: 206]"),
    "Logs and tracks patient transfers to specialized providers. [cite: 206]",
  ],
  [
    normalizeIdeaTitleKey("Clinical note tagging tool [cite: 207]"),
    "Categorizes physician observations for easier chart searching. [cite: 207]",
  ],
  [
    normalizeIdeaTitleKey("Patient education material organizer [cite: 208]"),
    "Stores and distributes informative pamphlets regarding specific conditions. [cite: 208]",
  ],
  [
    normalizeIdeaTitleKey("Medical equipment maintenance tracker [cite: 209]"),
    "Logs inspection and calibration dates for clinical devices. [cite: 209]",
  ],
  [
    normalizeIdeaTitleKey("Hospital room status tracker [cite: 210]"),
    "Monitors bed availability and cleaning readiness for incoming admissions. [cite: 210]",
  ],
]);
