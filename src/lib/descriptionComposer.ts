type ActionGroup =
  | "track"
  | "log"
  | "manage"
  | "tag"
  | "schedule"
  | "check"
  | "calculate"
  | "summarize"
  | "store"
  | "optimize"
  | "compare"
  | "recommend"
  | "alert";

const stripCites = (value: string) => value.replace(/\[cite:\s*\d+\]/gi, "").trim();

const hashString = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const pick = <T,>(items: T[], seed: number) => items[seed % items.length]!;

const lowerFirst = (value: string) => (value ? value.charAt(0).toLowerCase() + value.slice(1) : value);

const sentence = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
};

const extractFirstVerb = (text: string) => {
  const cleaned = stripCites(text).trim();
  const match = cleaned.match(/^([A-Za-z/+-]+)\b/);
  return match?.[1]?.toLowerCase() ?? "";
};

export const inferActionGroup = (title: string, baseDescription?: string): ActionGroup => {
  const verb = baseDescription ? extractFirstVerb(baseDescription) : "";
  const cleanedTitle = stripCites(title).toLowerCase();

  const byVerb: Partial<Record<string, ActionGroup>> = {
    monitors: "track",
    tracks: "track",
    follows: "track",
    records: "log",
    logs: "log",
    documents: "log",
    captures: "summarize",
    aggregates: "summarize",
    summarizes: "summarize",
    provides: "summarize",
    displays: "summarize",
    maintains: "store",
    stores: "store",
    organizes: "manage",
    manages: "manage",
    assigns: "manage",
    distributes: "manage",
    schedules: "schedule",
    plans: "schedule",
    flags: "alert",
    highlights: "alert",
    alerts: "alert",
    ensures: "check",
    verifies: "check",
    identifies: "alert",
    calculates: "calculate",
    determines: "calculate",
    estimates: "calculate",
    optimizes: "optimize",
    compares: "compare",
    evaluates: "compare",
    suggests: "recommend",
    recommends: "recommend",
    segments: "tag",
    categorizes: "tag",
    classifies: "tag",
    marks: "tag",
    links: "manage",
  };

  if (verb && byVerb[verb]) return byVerb[verb]!;

  if (/\b(checklist|verification|verify|consent|eligibility)\b/.test(cleanedTitle)) return "check";
  if (/\b(calculator|estimation|estimate|cost|pricing|split)\b/.test(cleanedTitle)) return "calculate";
  if (/\b(dashboard|snapshot|summary|heatmap|status)\b/.test(cleanedTitle)) return "summarize";
  if (/\b(tagging|label|tier|category)\b/.test(cleanedTitle)) return "tag";
  if (/\b(schedule|scheduler|calendar|deadline|reminder)\b/.test(cleanedTitle)) return "schedule";
  if (/\b(log|logging|history)\b/.test(cleanedTitle)) return "log";
  if (/\b(library|version|repository)\b/.test(cleanedTitle)) return "store";
  if (/\b(optimi|route)\b/.test(cleanedTitle)) return "optimize";
  if (/\b(compare|comparison)\b/.test(cleanedTitle)) return "compare";
  if (/\b(recommend|upgrade path)\b/.test(cleanedTitle)) return "recommend";
  if (/\b(flag|fraud|risk|gap|incident|damage)\b/.test(cleanedTitle)) return "alert";
  return "track";
};

const extractSubjectFromTitleEn = (title: string) => {
  const cleaned = stripCites(title)
    .replace(/\btool\b/gi, "")
    .replace(/\btracker\b/gi, "")
    .replace(/\btracking\b/gi, "")
    .replace(/\bdashboard\b/gi, "")
    .replace(/\bplanner\b/gi, "")
    .replace(/\bscheduler\b/gi, "")
    .replace(/\bcalendar\b/gi, "")
    .replace(/\bchecker\b/gi, "")
    .replace(/\bcalculator\b/gi, "")
    .replace(/\blibrary\b/gi, "")
    .replace(/\blog\b/gi, "")
    .replace(/\blogging\b/gi, "")
    .replace(/\bstatus\b/gi, "")
    .replace(/\bmanagement\b/gi, "")
    .replace(/\bhelper\b/gi, "")
    .replace(/\bdetector\b/gi, "")
    .replace(/\bflag\b/gi, "")
    .replace(/\btagging\b/gi, "")
    .replace(/\bvariant\b/gi, "")
    .replace(/\bheatmap\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "it";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

const SUMMARY_TEMPLATES_EN: Record<ActionGroup, Array<(subject: string) => string>> = {
  track: [
    (subject) => `Keep ${subject.toLowerCase()} on track with clear statuses`,
    (subject) => `Track ${subject.toLowerCase()} from start to finish`,
    (subject) => `Stay on top of ${subject.toLowerCase()} with key milestones`,
  ],
  log: [
    (subject) => `Capture a clean history of ${subject.toLowerCase()}`,
    (subject) => `Log ${subject.toLowerCase()} quickly and consistently`,
    (subject) => `Keep records for ${subject.toLowerCase()} without losing context`,
  ],
  manage: [
    (subject) => `Manage ${subject.toLowerCase()} with owners and due dates`,
    (subject) => `Coordinate ${subject.toLowerCase()} in one shared view`,
    (subject) => `Run ${subject.toLowerCase()} without back-and-forth`,
  ],
  tag: [
    (subject) => `Tag ${subject.toLowerCase()} for faster filtering`,
    (subject) => `Standardize labels for ${subject.toLowerCase()} at scale`,
    (subject) => `Classify ${subject.toLowerCase()} so teams act faster`,
  ],
  schedule: [
    (subject) => `Schedule ${subject.toLowerCase()} and never miss deadlines`,
    (subject) => `Plan ${subject.toLowerCase()} with reminders built in`,
    (subject) => `Queue ${subject.toLowerCase()} work in the right order`,
  ],
  check: [
    (subject) => `Verify ${subject.toLowerCase()} requirements before sign-off`,
    (subject) => `Use a checklist to catch missing steps in ${subject.toLowerCase()}`,
    (subject) => `Reduce errors by checking ${subject.toLowerCase()} up front`,
  ],
  calculate: [
    (subject) => `Estimate ${subject.toLowerCase()} in seconds`,
    (subject) => `Compute ${subject.toLowerCase()} with transparent inputs`,
    (subject) => `Quick calculator for ${subject.toLowerCase()} scenarios`,
  ],
  summarize: [
    (subject) => `See ${subject.toLowerCase()} status at a glance`,
    (subject) => `Get a snapshot view of ${subject.toLowerCase()}`,
    (subject) => `Summarize ${subject.toLowerCase()} with lightweight dashboards`,
  ],
  store: [
    (subject) => `Keep ${subject.toLowerCase()} organized and reusable`,
    (subject) => `Store ${subject.toLowerCase()} versions in one place`,
    (subject) => `Build a trusted library of ${subject.toLowerCase()}`,
  ],
  optimize: [
    (subject) => `Optimize ${subject.toLowerCase()} with smarter sequencing`,
    (subject) => `Make ${subject.toLowerCase()} faster with better planning`,
    (subject) => `Reduce waste by optimizing ${subject.toLowerCase()}`,
  ],
  compare: [
    (subject) => `Compare ${subject.toLowerCase()} options side by side`,
    (subject) => `Evaluate ${subject.toLowerCase()} with consistent criteria`,
    (subject) => `Pick the best ${subject.toLowerCase()} with a clear comparison`,
  ],
  recommend: [
    (subject) => `Recommend the next step for ${subject.toLowerCase()}`,
    (subject) => `Suggest smarter choices for ${subject.toLowerCase()}`,
    (subject) => `Guide ${subject.toLowerCase()} decisions with simple signals`,
  ],
  alert: [
    (subject) => `Flag risks in ${subject.toLowerCase()} before they escalate`,
    (subject) => `Catch issues in ${subject.toLowerCase()} early`,
    (subject) => `Spot anomalies in ${subject.toLowerCase()} for quick review`,
  ],
};

const SENTENCE1_EN: Record<ActionGroup, Array<(subject: string) => string>> = {
  track: [
    (subject) => `Track ${subject.toLowerCase()} with a simple stage, owner, and key timestamps`,
    (subject) => `Follow ${subject.toLowerCase()} across its lifecycle with clear states`,
    (subject) => `Keep ${subject.toLowerCase()} visible end-to-end, from intake to completion`,
  ],
  log: [
    (subject) => `Capture a timestamped record of ${subject.toLowerCase()} with quick notes`,
    (subject) => `Log ${subject.toLowerCase()} decisions and context so nothing gets lost`,
    (subject) => `Keep an audit-friendly history of ${subject.toLowerCase()} actions and updates`,
  ],
  manage: [
    (subject) => `Assign owners, set due dates, and move ${subject.toLowerCase()} through clear stages`,
    (subject) => `Coordinate ${subject.toLowerCase()} work with a single source of truth`,
    (subject) => `Manage ${subject.toLowerCase()} tasks with lightweight workflows and handoffs`,
  ],
  tag: [
    (subject) => `Apply consistent tags to ${subject.toLowerCase()} for search, filtering, and reporting`,
    (subject) => `Classify ${subject.toLowerCase()} using shared labels so teams can triage faster`,
    (subject) => `Tag ${subject.toLowerCase()} with structured categories to keep reporting clean`,
  ],
  schedule: [
    (subject) => `Schedule ${subject.toLowerCase()}, handle conflicts, and surface what's due next`,
    (subject) => `Plan ${subject.toLowerCase()} dates and reminders so deadlines don't slip`,
    (subject) => `Queue ${subject.toLowerCase()} requests and keep the next action obvious`,
  ],
  check: [
    (subject) => `Run a checklist for ${subject.toLowerCase()} and flag anything missing before approval`,
    (subject) => `Verify ${subject.toLowerCase()} requirements with a simple, repeatable checklist`,
    (subject) => `Catch gaps in ${subject.toLowerCase()} early with clear pass/fail steps`,
  ],
  calculate: [
    (subject) => `Enter a few inputs to calculate ${subject.toLowerCase()}, keeping assumptions explicit`,
    (subject) => `Estimate ${subject.toLowerCase()} quickly with repeatable formulas`,
    (subject) => `Compute ${subject.toLowerCase()} scenarios and save the rationale for later`,
  ],
  summarize: [
    (subject) => `Pull key signals into one view for ${subject.toLowerCase()}, with counts and trends`,
    (subject) => `See ${subject.toLowerCase()} status across stages without digging through systems`,
    (subject) => `Create a lightweight dashboard for ${subject.toLowerCase()} and its key metrics`,
  ],
  store: [
    (subject) => `Store ${subject.toLowerCase()} assets and versions so the team always finds the right one`,
    (subject) => `Keep ${subject.toLowerCase()} organized with consistent naming and version history`,
    (subject) => `Build a reusable library for ${subject.toLowerCase()} that stays up to date`,
  ],
  optimize: [
    (subject) => `Optimize ${subject.toLowerCase()} by sequencing steps and cutting avoidable detours`,
    (subject) => `Make ${subject.toLowerCase()} faster by planning the best path up front`,
    (subject) => `Reduce cost and delays by optimizing ${subject.toLowerCase()} decisions`,
  ],
  compare: [
    (subject) => `Compare ${subject.toLowerCase()} options side by side using the same fields`,
    (subject) => `Evaluate ${subject.toLowerCase()} with structured criteria and clear tradeoffs`,
    (subject) => `Make ${subject.toLowerCase()} decisions faster with consistent comparisons`,
  ],
  recommend: [
    (subject) => `Recommend next steps for ${subject.toLowerCase()} based on simple rules or usage signals`,
    (subject) => `Suggest the best option for ${subject.toLowerCase()} given current context`,
    (subject) => `Guide ${subject.toLowerCase()} choices by highlighting the most relevant path`,
  ],
  alert: [
    (subject) => `Flag risks or anomalies in ${subject.toLowerCase()} so someone can review quickly`,
    (subject) => `Catch warning signs in ${subject.toLowerCase()} and route them for follow-up`,
    (subject) => `Highlight issues in ${subject.toLowerCase()} before they turn into bigger problems`,
  ],
};

const CATEGORY_BENEFITS_EN: Record<string, string[]> = {
  Insurance: [
    "Useful for agents and adjusters to keep claims, documents, and renewals moving.",
    "Reduces missed follow-ups by making statuses and deadlines easy to see.",
    "Keeps underwriting, claims, and client comms aligned with less admin work.",
  ],
  "Marketing Agencies": [
    "Keeps clients and creatives aligned on versions, approvals, and deadlines.",
    "Makes it easier to track spend, assets, and feedback without email chains.",
    "Helps teams ship faster by keeping scope changes and sign-offs visible.",
  ],
  "E-Learning / EdTech": [
    "Helps learners and instructors spot progress and blockers quickly.",
    "Makes completion, attempts, and eligibility easy to audit and report.",
    "Keeps engagement signals visible so support can step in early.",
  ],
  Education: [
    "Helps teachers keep day-to-day class ops organized and easy to share.",
    "Makes communication, deadlines, and schedules easier to stay on top of.",
    "Keeps routines consistent without extra spreadsheets.",
  ],
  Healthcare: [
    "Supports clear handoffs between check-in, care, and follow-up.",
    "Keeps clinic operations moving with fewer missing forms and surprises.",
    "Makes patient status and required steps visible at a glance.",
  ],
  Restaurants: [
    "Keeps front-of-house and kitchen aligned in real time.",
    "Reduces missed steps by making status and responsibilities explicit.",
    "Helps teams move faster during peak hours with less confusion.",
  ],
  Retail: [
    "Keeps floor teams aligned on stock, promos, and customer service.",
    "Makes daily operations smoother by centralizing quick checks and tasks.",
    "Improves visibility into what's selling, what's missing, and what needs action.",
  ],
  Logistics: [
    "Helps dispatch and warehouse teams maintain on-time delivery with fewer surprises.",
    "Makes shipment health and exceptions easy to spot and act on.",
    "Keeps routing and documentation organized across handoffs.",
  ],
  "Real Estate": [
    "Helps agents keep leads, showings, and closing milestones from slipping.",
    "Makes it easier to coordinate with buyers, sellers, and vendors.",
    "Keeps documents and follow-ups organized across a long timeline.",
  ],
  Manufacturing: [
    "Helps production teams spot issues early and keep throughput steady.",
    "Improves traceability for batches, defects, and maintenance work.",
    "Keeps shifts aligned on what's next and what needs attention.",
  ],
  "Professional Services": [
    "Helps teams manage matters, time, and deliverables with less admin.",
    "Keeps proposals, conflicts, and billing milestones visible and auditable.",
    "Improves handoffs between seniors and juniors across a project.",
  ],
  "Professional Services (Consulting, Legal, Accounting, etc.)": [
    "Helps teams manage matters, time, and deliverables with less admin.",
    "Keeps proposals, conflicts, and billing milestones visible and auditable.",
    "Improves handoffs between seniors and juniors across a project.",
  ],
  Construction: [
    "Keeps the job site aligned on changes, safety, and daily progress.",
    "Makes permits, inspections, and punch lists easier to coordinate.",
    "Helps avoid rework by keeping the latest versions and decisions visible.",
  ],
  Nonprofits: [
    "Helps teams track donors, grants, volunteers, and impact reporting.",
    "Makes deadlines and relationships easier to manage across programs.",
    "Keeps activity history clear for reporting and stewardship.",
  ],
  Finance: [
    "Keeps budgets, transactions, and portfolio snapshots organized.",
    "Improves clarity on categories, fees, and recurring activity.",
    "Makes it easier to review decisions with consistent records.",
  ],
  Marketing: [
    "Keeps campaigns moving by making approvals, assets, and spend visible.",
    "Reduces context switching with a single view of what's next.",
    "Helps teams report faster with consistent tagging and snapshots.",
  ],
  "Fitness & Wellness": [
    "Great for coaches to personalize plans and track progress over time.",
    "Keeps client habits visible so adjustments are safe and effective.",
    "Makes sessions and milestones easy to review at a glance.",
  ],
  "SaaS/Software Products": [
    "Makes triage and releases easier with consistent signals and ownership.",
    "Helps teams see what users need most and act on it faster.",
    "Keeps integrations and support workflows visible and measurable.",
  ],
  "Travel & Hospitality": [
    "Keeps front desk, housekeeping, and ops in sync.",
    "Makes guest preferences and incidents easy to track across shifts.",
    "Improves service consistency by keeping status and policies visible.",
  ],
  "Media & Content": [
    "Keeps publishing pipelines moving with clear owners and dates.",
    "Makes rights, localization, and repurposing easier to coordinate.",
    "Improves reporting by keeping tags and snapshots consistent.",
  ],
  "Fintech/Financial Services": [
    "Helps teams track compliance, risk, and user money flows in one place.",
    "Makes anomalies and required documents easier to spot and resolve.",
    "Keeps categorization consistent for reporting and decision-making.",
  ],
};

const polishBaseDescriptionEn = (baseDescription: string, action: ActionGroup, seed: number) => {
  const cleaned = stripCites(baseDescription).trim().replace(/\.$/, "");
  if (!cleaned) return "";

  const rest = cleaned.replace(
    /^(Monitors|Tracks|Follows|Records|Logs|Documents|Captures|Aggregates|Summarizes|Provides|Displays|Maintains|Stores|Organizes|Manages|Assigns|Distributes|Schedules|Plans|Flags|Highlights|Alerts|Ensures|Verifies|Identifies|Calculates|Determines|Estimates|Optimizes|Compares|Evaluates|Suggests|Recommends|Segments|Categorizes|Classifies|Marks|Links)\s+/i,
    "",
  );

  const verbBank: Record<ActionGroup, string[]> = {
    track: ["Track", "Follow", "Keep tabs on"],
    log: ["Log", "Record", "Capture"],
    manage: ["Manage", "Coordinate", "Run"],
    tag: ["Tag", "Label", "Classify"],
    schedule: ["Schedule", "Plan", "Queue"],
    check: ["Verify", "Check", "Confirm"],
    calculate: ["Calculate", "Estimate", "Compute"],
    summarize: ["Summarize", "Surface", "See"],
    store: ["Store", "Keep", "Maintain"],
    optimize: ["Optimize", "Improve", "Streamline"],
    compare: ["Compare", "Evaluate", "Review"],
    recommend: ["Recommend", "Suggest", "Guide"],
    alert: ["Flag", "Spot", "Catch"],
  };

  const verb = pick(verbBank[action], seed);
  return sentence(`${verb} ${lowerFirst(rest)}`);
};

export const composeEnglishCopy = (category: string, title: string, baseDescription?: string) => {
  const cleanedTitle = stripCites(title);
  const subject = extractSubjectFromTitleEn(cleanedTitle);
  const action = inferActionGroup(cleanedTitle, baseDescription);
  const seed = hashString(`${category}::${cleanedTitle}`);

  const summary = sentence(pick(SUMMARY_TEMPLATES_EN[action], seed)(subject));

  const first = baseDescription
    ? polishBaseDescriptionEn(baseDescription, action, seed)
    : sentence(pick(SENTENCE1_EN[action], seed)(subject));

  const benefit = pick(CATEGORY_BENEFITS_EN[category] ?? ["Keeps the workflow clear without extra spreadsheets."], seed + 13);
  const details = `${first} ${benefit}`;

  return { summary, details };
};

const stripViPrefix = (value: string) =>
  value
    .trim()
    .replace(
      /^(Theo dõi|Nhật ký|Bảng điều khiển|Tóm tắt|Lập lịch|Kiểm tra|Tính toán|Gắn nhãn|So sánh|Trợ lý|Trạng thái)\s+/i,
      "",
    )
    .trim();

const SUMMARY_TEMPLATES_VI: Record<ActionGroup, Array<(subject: string) => string>> = {
  track: [
    (subject) => `Theo dõi ${subject} gọn trong một màn hình`,
    (subject) => `Bám sát ${subject} theo từng trạng thái`,
    (subject) => `Giữ ${subject} luôn rõ ràng theo mốc thời gian`,
  ],
  log: [
    (subject) => `Ghi lại lịch sử ${subject} nhanh và nhất quán`,
    (subject) => `Lưu vết ${subject} để dễ tra cứu và bàn giao`,
    (subject) => `Ghi nhận ${subject} kèm ngữ cảnh, tránh thất lạc`,
  ],
  manage: [
    (subject) => `Quản lý ${subject} với người phụ trách và hạn chót`,
    (subject) => `Điều phối ${subject} trong một nơi chung`,
    (subject) => `Quản lý ${subject} rõ việc, rõ trạng thái`,
  ],
  tag: [
    (subject) => `Gắn nhãn ${subject} để lọc và báo cáo nhanh`,
    (subject) => `Chuẩn hóa nhãn cho ${subject} để dễ tổng hợp`,
    (subject) => `Phân loại ${subject} nhất quán để xử lý nhanh hơn`,
  ],
  schedule: [
    (subject) => `Lập lịch ${subject} và nhắc hạn quan trọng`,
    (subject) => `Sắp xếp ${subject} theo thứ tự ưu tiên`,
    (subject) => `Theo dõi hạn của ${subject} để không bị trễ`,
  ],
  check: [
    (subject) => `Kiểm tra ${subject} theo checklist chuẩn`,
    (subject) => `Xác minh ${subject} trước khi duyệt hoặc ký`,
    (subject) => `Phát hiện thiếu bước trong ${subject} từ sớm`,
  ],
  calculate: [
    (subject) => `Tính ${subject} nhanh với đầu vào rõ ràng`,
    (subject) => `Ước tính ${subject} trong vài giây`,
    (subject) => `Soạn phép tính ${subject} để lặp lại dễ dàng`,
  ],
  summarize: [
    (subject) => `Xem tổng quan ${subject} chỉ trong một nhìn`,
    (subject) => `Chụp nhanh trạng thái ${subject} theo giai đoạn`,
    (subject) => `Tổng hợp ${subject} với số liệu cốt lõi`,
  ],
  store: [
    (subject) => `Lưu và tái sử dụng ${subject} dễ dàng`,
    (subject) => `Quản lý phiên bản ${subject} trong một nơi`,
    (subject) => `Xây thư viện ${subject} đáng tin cậy`,
  ],
  optimize: [
    (subject) => `Tối ưu ${subject} bằng kế hoạch thông minh hơn`,
    (subject) => `Giảm lãng phí khi xử lý ${subject}`,
    (subject) => `Tăng tốc ${subject} nhờ sắp xếp hợp lý`,
  ],
  compare: [
    (subject) => `So sánh ${subject} theo tiêu chí thống nhất`,
    (subject) => `Đối chiếu ${subject} cạnh nhau để ra quyết định`,
    (subject) => `Chọn phương án ${subject} tốt hơn với bảng so sánh`,
  ],
  recommend: [
    (subject) => `Gợi ý bước tiếp theo cho ${subject}`,
    (subject) => `Đề xuất lựa chọn phù hợp cho ${subject}`,
    (subject) => `Hỗ trợ quyết định ${subject} bằng tín hiệu đơn giản`,
  ],
  alert: [
    (subject) => `Cảnh báo rủi ro của ${subject} trước khi lan rộng`,
    (subject) => `Phát hiện bất thường trong ${subject} từ sớm`,
    (subject) => `Gắn cờ vấn đề của ${subject} để xử lý nhanh`,
  ],
};

const SENTENCE1_VI: Record<ActionGroup, Array<(subject: string) => string>> = {
  track: [
    (subject) => `Theo dõi ${subject} theo từng giai đoạn, kèm người phụ trách và mốc thời gian`,
    (subject) => `Bám sát ${subject} từ đầu đến cuối với trạng thái rõ ràng`,
    (subject) => `Giữ ${subject} luôn rõ "đang ở đâu" và "tiếp theo làm gì"`,
  ],
  log: [
    (subject) => `Ghi nhận ${subject} theo thời gian, kèm ghi chú để dễ tra cứu`,
    (subject) => `Lưu vết ${subject} và ngữ cảnh để bàn giao mượt`,
    (subject) => `Tạo lịch sử ${subject} rõ ràng, thuận tiện cho kiểm tra lại`,
  ],
  manage: [
    (subject) => `Quản lý ${subject} bằng người phụ trách, hạn chót và trạng thái`,
    (subject) => `Điều phối ${subject} trong một luồng đơn giản, dễ bàn giao`,
    (subject) => `Giữ ${subject} chạy đều nhờ phân công và theo dõi tiến độ`,
  ],
  tag: [
    (subject) => `Gắn nhãn ${subject} theo chuẩn chung để tìm kiếm, lọc và tổng hợp nhanh`,
    (subject) => `Phân loại ${subject} để ưu tiên xử lý và báo cáo nhất quán`,
    (subject) => `Chuẩn hóa nhãn cho ${subject} để dữ liệu sạch và dễ đo lường`,
  ],
  schedule: [
    (subject) => `Lập lịch ${subject}, xử lý xung đột và nêu rõ việc sắp đến hạn`,
    (subject) => `Sắp xếp ${subject} theo lịch và nhắc hạn để tránh trễ`,
    (subject) => `Theo dõi hạn của ${subject} để ai cũng biết bước tiếp theo`,
  ],
  check: [
    (subject) => `Chạy checklist cho ${subject} và đánh dấu mục còn thiếu trước khi duyệt`,
    (subject) => `Xác minh ${subject} theo từng bước "đạt/chưa đạt" rõ ràng`,
    (subject) => `Giảm sai sót bằng checklist lặp lại cho ${subject}`,
  ],
  calculate: [
    (subject) => `Nhập vài thông số để tính ${subject}, giữ giả định minh bạch`,
    (subject) => `Ước tính ${subject} nhanh và lưu lại cơ sở tính toán`,
    (subject) => `Tính ${subject} theo công thức chuẩn để dùng lại dễ dàng`,
  ],
  summarize: [
    (subject) => `Tổng hợp tín hiệu chính của ${subject} vào một màn hình, có số liệu và xu hướng`,
    (subject) => `Xem trạng thái ${subject} theo giai đoạn mà không cần lục nhiều hệ thống`,
    (subject) => `Tạo bảng tổng quan ${subject} với các chỉ số quan trọng`,
  ],
  store: [
    (subject) => `Lưu ${subject} và phiên bản để nhóm luôn dùng đúng bản mới nhất`,
    (subject) => `Sắp xếp ${subject} theo cấu trúc rõ ràng để tái sử dụng`,
    (subject) => `Xây thư viện ${subject} có quản lý phiên bản và dễ tìm kiếm`,
  ],
  optimize: [
    (subject) => `Tối ưu ${subject} bằng cách sắp xếp thứ tự hợp lý và giảm vòng lặp thừa`,
    (subject) => `Giảm chi phí và chậm trễ bằng kế hoạch tối ưu cho ${subject}`,
    (subject) => `Tăng hiệu quả ${subject} nhờ quyết định tuyến/chuỗi bước tốt hơn`,
  ],
  compare: [
    (subject) => `So sánh ${subject} cạnh nhau với cùng một bộ tiêu chí`,
    (subject) => `Đối chiếu ${subject} theo trường dữ liệu thống nhất để quyết nhanh`,
    (subject) => `Ra quyết định ${subject} nhanh hơn nhờ bảng so sánh rõ ràng`,
  ],
  recommend: [
    (subject) => `Gợi ý bước tiếp theo cho ${subject} dựa trên tín hiệu đơn giản`,
    (subject) => `Đề xuất lựa chọn cho ${subject} theo bối cảnh hiện tại`,
    (subject) => `Hỗ trợ quyết định ${subject} bằng các quy tắc dễ hiểu`,
  ],
  alert: [
    (subject) => `Gắn cờ rủi ro hoặc bất thường trong ${subject} để rà soát nhanh`,
    (subject) => `Phát hiện vấn đề của ${subject} sớm và chuyển cho người xử lý`,
    (subject) => `Làm nổi bật cảnh báo trong ${subject} trước khi thành sự cố lớn`,
  ],
};

const CATEGORY_BENEFITS_VI: Record<string, string[]> = {
  Insurance: [
    "Hữu ích cho đại lý và bộ phận bồi thường để theo dõi hồ sơ, giấy tờ và nhắc gia hạn.",
    "Giảm bỏ sót follow-up nhờ trạng thái và hạn chót hiển thị rõ.",
    "Giúp thẩm định, bồi thường và chăm sóc khách hàng phối hợp gọn hơn.",
  ],
  "Marketing Agencies": [
    "Giúp team và khách hàng bám sát phê duyệt, phiên bản và deadline.",
    "Giảm vòng email qua lại khi mọi thứ đều có trạng thái rõ.",
    "Dễ báo cáo hơn nhờ nhãn và mốc thời gian thống nhất.",
  ],
  "E-Learning / EdTech": [
    "Giúp học viên và giảng viên nhìn tiến độ và điểm cần hỗ trợ sớm.",
    "Dễ kiểm tra hoàn thành, số lần làm lại và điều kiện chứng chỉ.",
    "Giữ tín hiệu tương tác rõ ràng để can thiệp đúng lúc.",
  ],
  Education: [
    "Giúp giáo viên quản lý việc lớp hằng ngày gọn và dễ chia sẻ.",
    "Bám sát giao tiếp phụ huynh, hạn bài và lịch thi dễ hơn.",
    "Giữ quy trình ổn định mà không cần bảng tính rời rạc.",
  ],
  Healthcare: [
    "Hỗ trợ bàn giao rõ giữa check-in, khám, xét nghiệm và theo dõi.",
    "Giảm thiếu giấy tờ nhờ các bước bắt buộc hiển thị rõ.",
    "Giúp phòng khám nhìn trạng thái bệnh nhân nhanh hơn.",
  ],
  Restaurants: [
    "Giúp phục vụ và bếp phối hợp đồng bộ theo thời gian thực.",
    "Giảm sót bước khi ai làm gì và đang ở đâu đều rõ.",
    "Tăng tốc trong giờ cao điểm với luồng đơn giản, ít nhầm lẫn.",
  ],
  Retail: [
    "Giúp cửa hàng bám sát tồn kho, khuyến mãi và nhiệm vụ trên sàn.",
    "Giảm lộn xộn khi kiểm tra nhanh đều tập trung một chỗ.",
    "Nhìn rõ cái gì bán chạy, cái gì thiếu, và việc gì cần làm.",
  ],
  Logistics: [
    "Giúp điều phối và kho giữ đúng hạn giao với ít bất ngờ hơn.",
    "Dễ phát hiện ngoại lệ để xử lý kịp thời.",
    "Giữ tuyến, giấy tờ và bàn giao giữa các khâu gọn gàng.",
  ],
  "Real Estate": [
    "Giúp môi giới không bỏ sót lead, lịch xem và mốc chốt giao dịch.",
    "Dễ phối hợp với người mua, người bán và nhà thầu dịch vụ.",
    "Giữ hồ sơ và follow-up gọn trong các tiến trình dài ngày.",
  ],
  Manufacturing: [
    "Giúp nhà máy phát hiện vấn đề sớm và giữ nhịp sản xuất ổn định.",
    "Tăng truy vết cho lô, lỗi và bảo trì.",
    "Giữ các ca làm đồng bộ về việc tiếp theo và việc cần chú ý.",
  ],
  "Professional Services": [
    "Giúp quản lý hồ sơ việc, thời gian và đầu việc với ít hành chính hơn.",
    "Giữ đề xuất, xung đột lợi ích và mốc thanh toán rõ ràng, dễ kiểm tra.",
    "Hỗ trợ bàn giao giữa senior và junior trong dự án.",
  ],
  "Professional Services (Consulting, Legal, Accounting, etc.)": [
    "Giúp quản lý hồ sơ việc, thời gian và đầu việc với ít hành chính hơn.",
    "Giữ đề xuất, xung đột lợi ích và mốc thanh toán rõ ràng, dễ kiểm tra.",
    "Hỗ trợ bàn giao giữa senior và junior trong dự án.",
  ],
  Construction: [
    "Giúp công trường bám sát thay đổi, an toàn và tiến độ mỗi ngày.",
    "Dễ điều phối giấy phép, kiểm tra và punch list.",
    "Giảm làm lại khi bản mới nhất và quyết định được hiển thị rõ.",
  ],
  Nonprofits: [
    "Giúp theo dõi nhà tài trợ, grant, tình nguyện và báo cáo tác động.",
    "Quản lý deadline và quan hệ đối tác dễ hơn cho từng chương trình.",
    "Giữ lịch sử hoạt động rõ để báo cáo và chăm sóc nhà tài trợ.",
  ],
  Finance: [
    "Giữ ngân sách, giao dịch và snapshot danh mục rõ ràng.",
    "Dễ xem lại danh mục, phí và các khoản lặp lại.",
    "Giúp quyết định dựa trên dữ liệu nhất quán.",
  ],
  Marketing: [
    "Giữ chiến dịch chạy đều nhờ phê duyệt, asset và chi tiêu hiển thị rõ.",
    "Giảm đổi ngữ cảnh với một nơi biết việc gì tiếp theo.",
    "Dễ tổng hợp số liệu nhờ nhãn và snapshot nhất quán.",
  ],
  "Fitness & Wellness": [
    "Phù hợp cho HLV để cá nhân hóa kế hoạch và theo dõi tiến bộ theo thời gian.",
    "Giữ thói quen và dấu hiệu rủi ro rõ để điều chỉnh an toàn.",
    "Dễ xem lại buổi tập và mốc mục tiêu chỉ trong một nhìn.",
  ],
  "SaaS/Software Products": [
    "Giúp team product/dev xử lý triage và phát hành gọn hơn.",
    "Nhìn rõ người dùng cần gì để ưu tiên đúng.",
    "Giữ tích hợp và support tickets minh bạch, dễ đo lường.",
  ],
  "Travel & Hospitality": [
    "Giúp lễ tân, buồng phòng và vận hành đồng bộ.",
    "Giữ sở thích khách và sự cố rõ ràng qua ca trực.",
    "Tăng nhất quán dịch vụ nhờ trạng thái và quy định hiển thị rõ.",
  ],
  "Media & Content": [
    "Giữ pipeline xuất bản chạy đều với người phụ trách và ngày rõ ràng.",
    "Dễ điều phối quyền sử dụng, bản địa hóa và tái sử dụng nội dung.",
    "Cải thiện báo cáo nhờ nhãn và snapshot thống nhất.",
  ],
  "Fintech/Financial Services": [
    "Giúp theo dõi tuân thủ, rủi ro và luồng tiền trong một nơi.",
    "Dễ phát hiện bất thường và giấy tờ còn thiếu để xử lý nhanh.",
    "Giữ phân loại nhất quán phục vụ báo cáo và quyết định.",
  ],
};

export const composeVietnameseCopy = (categoryKey: string, titleVi: string, action: ActionGroup) => {
  const subject = stripViPrefix(titleVi) || titleVi.trim() || "ý tưởng này";
  const seed = hashString(`${categoryKey}::${titleVi}`);

  const summary = sentence(pick(SUMMARY_TEMPLATES_VI[action], seed)(subject.toLowerCase()));
  const first = sentence(pick(SENTENCE1_VI[action], seed)(subject.toLowerCase()));
  const benefit = pick(
    CATEGORY_BENEFITS_VI[categoryKey] ?? ["Giữ quy trình rõ ràng mà không cần bảng tính rời rạc."],
    seed + 17,
  );
  const details = `${first} ${benefit}`;

  return { summary, details };
};

export const looksVietnamese = (value: string) => /[ăâđêôơưáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(value);

export const shouldAutoUpgradeSeedText = (summary: string, details: string) => {
  const s = summary.trim();
  const d = details.trim();
  if (!s || !d) return true;
  if (s === d) return true;
  if (/\bmicro-tool\b/i.test(s) || /\bmicro-tool\b/i.test(d)) return true;
  if (/^A focused\b/i.test(s)) return true;
  if (/^This idea sits in\b/i.test(d)) return true;
  if (/mobile-first tool review workflow/i.test(d)) return true;
  if (d.split(/\s+/).length < 14) return true;
  return false;
};

export type { ActionGroup };
