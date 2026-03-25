import type { Idea } from "../types";

export type Locale = "vi" | "en";

export const uiCopy = {
  vi: {
    appName: "Phòng thí nghiệm micro-tool",
    headline: "Chấm ý tưởng nhanh",
    subheadline:
      "Bảng rà soát ưu tiên cho mobile, có thẻ danh mục, chấm sao, ghi chú, lọc nhanh, và chế độ xem ngẫu nhiên từng ý tưởng một.",
    visible: "Hiển thị",
    twoStar: "2 sao",
    threeStar: "3 sao",
    hidden: "Ẩn",
    searchPlaceholder: "Tìm ý tưởng, ghi chú hoặc danh mục",
    randomOne: "Ngẫu nhiên 1 ý tưởng",
    addIdea: "Thêm ý tưởng",
    allCategories: "Tất cả",
    allRatings: "Tất cả mức sao",
    twoStarOnly: "Chỉ 2 sao",
    threeStarOnly: "Chỉ 3 sao",
    ideasInView: "ý tưởng đang hiển thị",
    imported: "Đã nhập",
    custom: "Tự tạo",
    show: "Hiện",
    hide: "Ẩn",
    sourceSeed: "Đã nhập",
    sourceCustom: "Tự tạo",
    rateThisIdea: "Chấm điểm ý tưởng này",
    oneStarHidden: "1 sao sẽ tự động ẩn khỏi danh sách chính.",
    note: "Ghi chú",
    source: "Nguồn",
    addQuickThought: "Thêm nhận xét ngắn, rủi ro hoặc bước tiếp theo",
    editIdea: "Sửa ý tưởng",
    close: "Đóng",
    saveIdea: "Lưu ý tưởng",
    cancel: "Hủy",
    title: "Tiêu đề",
    titlePlaceholder: "Ví dụ: công cụ cảnh báo chậm giao hàng",
    category: "Danh mục",
    summary: "Tóm tắt",
    details: "Chi tiết",
    initialRating: "Mức sao ban đầu",
    unset: "Chưa chọn",
    randomReview: "Xem ngẫu nhiên",
    previous: "Trước",
    reshuffle: "Xáo lại",
    skip: "Bỏ qua",
    openDetails: "Mở chi tiết",
    saveToDatabase: "Lưu vào cơ sở dữ liệu công khai",
    allDone: "Xong rồi",
    noMoreVisibleIdeas: "Không còn ý tưởng nào phù hợp trong lượt xem ngẫu nhiên này.",
    closeRandomMode: "Đóng chế độ ngẫu nhiên",
    noVisibleIdeas: "Không có ý tưởng hiển thị",
    noVisibleIdeasBody: "Hãy xóa bộ lọc hoặc bắt đầu chế độ ngẫu nhiên từ toàn bộ danh sách.",
    resetFilters: "Đặt lại bộ lọc",
    noNoteYet: "Chưa có ghi chú",
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    english: "Tiếng Anh",
    categoryShown: "Danh mục",
    fromDatabase: "Từ cơ sở dữ liệu công khai",
    saveError: "Không thể lưu vào cơ sở dữ liệu công khai.",
    loadError: "Không thể tải ý tưởng.",
    noMatch: "Không có ý tưởng nào khớp với bộ lọc hiện tại.",
    mobileBlurb:
      "Giao diện di động với danh mục có thể thu gọn, chấm điểm bằng sao, ghi chú và nút xem ngẫu nhiên từng ý tưởng một.",
    defaultDraftSummary: "Một ý tưởng vi mô gọn nhẹ, phù hợp cho quy trình di động.",
    defaultDraftDetails:
      "Ý tưởng này phù hợp khi bạn cần một thao tác ngắn, trạng thái rõ ràng và luồng làm việc gọn gàng trên điện thoại.",
    importedLabel: "Đã nhập",
    customLabel: "Tự tạo",
  },
  en: {
    appName: "Micro Tool Lab",
    headline: "Fast Idea Review",
    subheadline:
      "A mobile-first review board with categories, star ratings, notes, quick filters, and a one-idea-at-a-time random mode.",
    visible: "Visible",
    twoStar: "2-star",
    threeStar: "3-star",
    hidden: "Hidden",
    searchPlaceholder: "Search ideas, notes, or categories",
    randomOne: "Random one idea",
    addIdea: "Add idea",
    allCategories: "All",
    allRatings: "All ratings",
    twoStarOnly: "2-star only",
    threeStarOnly: "3-star only",
    ideasInView: "ideas in view",
    imported: "Imported",
    custom: "Custom",
    show: "Show",
    hide: "Hide",
    sourceSeed: "Imported",
    sourceCustom: "Custom",
    rateThisIdea: "Rate this idea",
    oneStarHidden: "1-star ideas are hidden from the main list automatically.",
    note: "Note",
    source: "Source",
    addQuickThought: "Add a quick thought, risk, or next step",
    editIdea: "Edit idea",
    close: "Close",
    saveIdea: "Save idea",
    cancel: "Cancel",
    title: "Title",
    titlePlaceholder: "Shipment delay alert tool",
    category: "Category",
    summary: "Summary",
    details: "Details",
    initialRating: "Initial rating",
    unset: "Unset",
    randomReview: "Random review",
    previous: "Previous",
    reshuffle: "Reshuffle",
    skip: "Skip",
    openDetails: "Open details",
    saveToDatabase: "Save to the public database",
    allDone: "All done",
    noMoreVisibleIdeas: "There are no more visible ideas in this randomized queue.",
    closeRandomMode: "Close random mode",
    noVisibleIdeas: "No visible ideas",
    noVisibleIdeasBody: "Try clearing filters or start random mode from the full list.",
    resetFilters: "Reset filters",
    noNoteYet: "No note yet",
    language: "Language",
    vietnamese: "Vietnamese",
    english: "English",
    categoryShown: "Category",
    fromDatabase: "From public database",
    saveError: "Unable to save to the public database.",
    loadError: "Failed to load ideas.",
    noMatch: "No ideas match the current filters.",
    mobileBlurb:
      "A mobile-first interface with collapsible categories, star ratings, notes, and a one-idea-at-a-time random review flow.",
    defaultDraftSummary: "A compact micro-tool idea for mobile-friendly workflows.",
    defaultDraftDetails:
      "This idea works best when the workflow needs one short action, a clear status, and a tidy handoff on mobile.",
    importedLabel: "Imported",
    customLabel: "Custom",
  },
} as const;

export const categoryLabels: Record<string, Record<Locale, string>> = {
  Education: { vi: "Giáo dục", en: "Education" },
  Healthcare: { vi: "Y tế", en: "Healthcare" },
  Restaurants: { vi: "Nhà hàng", en: "Restaurants" },
  Retail: { vi: "Bán lẻ", en: "Retail" },
  Logistics: { vi: "Logistics", en: "Logistics" },
  "Real Estate": { vi: "Bất động sản", en: "Real Estate" },
  Manufacturing: { vi: "Sản xuất", en: "Manufacturing" },
  "Professional Services": { vi: "Dịch vụ chuyên nghiệp", en: "Professional Services" },
  Construction: { vi: "Xây dựng", en: "Construction" },
  Nonprofits: { vi: "Phi lợi nhuận", en: "Nonprofits" },
  Finance: { vi: "Tài chính", en: "Finance" },
  Marketing: { vi: "Tiếp thị", en: "Marketing" },
  "Fitness & Wellness": { vi: "Thể hình & Sức khỏe", en: "Fitness & Wellness" },
  "SaaS/Software Products": { vi: "SaaS / Phần mềm", en: "SaaS/Software Products" },
  "Travel & Hospitality": { vi: "Du lịch & Lưu trú", en: "Travel & Hospitality" },
  "Media & Content": { vi: "Truyền thông & Nội dung", en: "Media & Content" },
  "Fintech/Financial Services": {
    vi: "Fintech / Dịch vụ tài chính",
    en: "Fintech/Financial Services",
  },
};

export const seedTitleLabels: Record<string, Record<Locale, string>> = {
  "Student attendance tracking tool": {
    vi: "Công cụ theo dõi chuyên cần học sinh",
    en: "Student attendance tracking tool",
  },
  "Homework submission review tool": {
    vi: "Công cụ duyệt bài tập nộp",
    en: "Homework submission review tool",
  },
  "Gradebook management tool": {
    vi: "Công cụ quản lý sổ điểm",
    en: "Gradebook management tool",
  },
  "Classroom seating planner tool": {
    vi: "Công cụ sắp xếp chỗ ngồi lớp học",
    en: "Classroom seating planner tool",
  },
  "Lesson plan approval tool": {
    vi: "Công cụ phê duyệt giáo án",
    en: "Lesson plan approval tool",
  },
  "Student behavior logging tool": {
    vi: "Công cụ ghi nhận hành vi học sinh",
    en: "Student behavior logging tool",
  },
  "Parent communication log tool": {
    vi: "Công cụ nhật ký liên lạc phụ huynh",
    en: "Parent communication log tool",
  },
  "Extracurricular activity sign-up tool": {
    vi: "Công cụ đăng ký hoạt động ngoại khóa",
    en: "Extracurricular activity sign-up tool",
  },
  "Resource booking management tool": {
    vi: "Công cụ quản lý đặt tài nguyên",
    en: "Resource booking management tool",
  },
  "Exam scheduling coordination tool": {
    vi: "Công cụ điều phối lịch thi",
    en: "Exam scheduling coordination tool",
  },
  "Student progress tagging tool": {
    vi: "Công cụ gắn nhãn tiến độ học sinh",
    en: "Student progress tagging tool",
  },
  "Curriculum content versioning tool": {
    vi: "Công cụ quản lý phiên bản nội dung chương trình học",
    en: "Curriculum content versioning tool",
  },
  "Field trip consent form tool": {
    vi: "Công cụ biểu mẫu xin phép dã ngoại",
    en: "Field trip consent form tool",
  },
  "Teacher professional development tracking tool": {
    vi: "Công cụ theo dõi phát triển chuyên môn giáo viên",
    en: "Teacher professional development tracking tool",
  },
  "Alumni contact update tool": {
    vi: "Công cụ cập nhật liên hệ cựu học sinh",
    en: "Alumni contact update tool",
  },
  "Patient check-in management tool": {
    vi: "Công cụ quản lý tiếp nhận bệnh nhân",
    en: "Patient check-in management tool",
  },
  "Medication administration tracking tool": {
    vi: "Công cụ theo dõi cấp phát thuốc",
    en: "Medication administration tracking tool",
  },
  "Appointment scheduling tool": {
    vi: "Công cụ đặt lịch hẹn",
    en: "Appointment scheduling tool",
  },
  "Vital signs recording tool": {
    vi: "Công cụ ghi nhận dấu hiệu sinh tồn",
    en: "Vital signs recording tool",
  },
  "Lab result notification tool": {
    vi: "Công cụ thông báo kết quả xét nghiệm",
    en: "Lab result notification tool",
  },
  "Patient allergy flagging tool": {
    vi: "Công cụ đánh dấu dị ứng bệnh nhân",
    en: "Patient allergy flagging tool",
  },
  "Medical history update tool": {
    vi: "Công cụ cập nhật bệnh sử",
    en: "Medical history update tool",
  },
  "Discharge instruction generation tool": {
    vi: "Công cụ tạo hướng dẫn xuất viện",
    en: "Discharge instruction generation tool",
  },
  "Equipment sterilization logging tool": {
    vi: "Công cụ ghi log khử khuẩn thiết bị",
    en: "Equipment sterilization logging tool",
  },
  "Staff shift handover tool": {
    vi: "Công cụ bàn giao ca nhân viên",
    en: "Staff shift handover tool",
  },
  "Insurance claim status tool": {
    vi: "Công cụ tra cứu trạng thái bảo hiểm",
    en: "Insurance claim status tool",
  },
  "Patient feedback collection tool": {
    vi: "Công cụ thu thập phản hồi bệnh nhân",
    en: "Patient feedback collection tool",
  },
  "Medical supply reorder tool": {
    vi: "Công cụ đặt lại vật tư y tế",
    en: "Medical supply reorder tool",
  },
  "Consent form digital signing tool": {
    vi: "Công cụ ký số biểu mẫu đồng ý",
    en: "Consent form digital signing tool",
  },
  "Bed occupancy status tool": {
    vi: "Công cụ theo dõi tình trạng giường bệnh",
    en: "Bed occupancy status tool",
  },
  "Order tracking tool": { vi: "Công cụ theo dõi đơn hàng", en: "Order tracking tool" },
  "Table assignment tool": { vi: "Công cụ phân bàn", en: "Table assignment tool" },
  "Staff scheduling tool": { vi: "Công cụ xếp ca nhân sự", en: "Staff scheduling tool" },
  "Inventory ingredient depletion tool": {
    vi: "Công cụ theo dõi hao hụt nguyên liệu",
    en: "Inventory ingredient depletion tool",
  },
  "Reservation booking tool": { vi: "Công cụ đặt chỗ", en: "Reservation booking tool" },
  "Daily specials update tool": {
    vi: "Công cụ cập nhật món đặc biệt trong ngày",
    en: "Daily specials update tool",
  },
  "Customer feedback capture tool": {
    vi: "Công cụ ghi nhận phản hồi khách hàng",
    en: "Customer feedback capture tool",
  },
  "Supplier delivery confirmation tool": {
    vi: "Công cụ xác nhận giao hàng từ nhà cung cấp",
    en: "Supplier delivery confirmation tool",
  },
  "Recipe cost calculator tool": {
    vi: "Công cụ tính giá vốn công thức",
    en: "Recipe cost calculator tool",
  },
  "Waste tracking logging tool": { vi: "Công cụ ghi nhận thất thoát", en: "Waste tracking logging tool" },
  "Employee tip distribution tool": {
    vi: "Công cụ chia tip cho nhân viên",
    en: "Employee tip distribution tool",
  },
  "Menu item availability tool": {
    vi: "Công cụ theo dõi món còn hay hết",
    en: "Menu item availability tool",
  },
  "Kitchen prep list generation tool": {
    vi: "Công cụ tạo danh sách sơ chế bếp",
    en: "Kitchen prep list generation tool",
  },
  "Customer loyalty point update tool": {
    vi: "Công cụ cập nhật điểm khách hàng thân thiết",
    en: "Customer loyalty point update tool",
  },
  "Table cleaning status tool": {
    vi: "Công cụ theo dõi trạng thái dọn bàn",
    en: "Table cleaning status tool",
  },
  "Product stock level viewer tool": {
    vi: "Công cụ xem mức tồn kho sản phẩm",
    en: "Product stock level viewer tool",
  },
  "Customer purchase history tool": {
    vi: "Công cụ lịch sử mua hàng khách",
    en: "Customer purchase history tool",
  },
  "Daily sales report tool": { vi: "Công cụ báo cáo doanh số ngày", en: "Daily sales report tool" },
  "Supplier order placement tool": {
    vi: "Công cụ đặt hàng nhà cung cấp",
    en: "Supplier order placement tool",
  },
  "Employee shift assignment tool": {
    vi: "Công cụ phân ca nhân viên",
    en: "Employee shift assignment tool",
  },
  "Price tag printing tool": { vi: "Công cụ in thẻ giá", en: "Price tag printing tool" },
  "Return processing initiation tool": {
    vi: "Công cụ khởi tạo xử lý đổi trả",
    en: "Return processing initiation tool",
  },
  "Product display compliance tool": {
    vi: "Công cụ kiểm tra trưng bày sản phẩm",
    en: "Product display compliance tool",
  },
  "Customer loyalty program enrollment tool": {
    vi: "Công cụ ghi danh chương trình khách hàng thân thiết",
    en: "Customer loyalty program enrollment tool",
  },
  "Promotion activation scheduling tool": {
    vi: "Công cụ lên lịch kích hoạt khuyến mãi",
    en: "Promotion activation scheduling tool",
  },
  "Fitting room availability tool": {
    vi: "Công cụ xem phòng thử đồ trống",
    en: "Fitting room availability tool",
  },
  "Store transfer request tool": {
    vi: "Công cụ yêu cầu chuyển hàng giữa cửa hàng",
    en: "Store transfer request tool",
  },
  "Product review moderation tool": {
    vi: "Công cụ kiểm duyệt đánh giá sản phẩm",
    en: "Product review moderation tool",
  },
  "Gift card balance checker tool": {
    vi: "Công cụ kiểm tra số dư thẻ quà tặng",
    en: "Gift card balance checker tool",
  },
  "Visual merchandising feedback tool": {
    vi: "Công cụ phản hồi trưng bày trực quan",
    en: "Visual merchandising feedback tool",
  },
  "Shipment tracking status tool": {
    vi: "Công cụ theo dõi trạng thái lô hàng",
    en: "Shipment tracking status tool",
  },
  "Route optimization planning tool": {
    vi: "Công cụ lập kế hoạch tối ưu tuyến đường",
    en: "Route optimization planning tool",
  },
  "Warehouse slotting assignment tool": {
    vi: "Công cụ phân ô kho",
    en: "Warehouse slotting assignment tool",
  },
  "Delivery manifest generation tool": {
    vi: "Công cụ tạo phiếu giao hàng",
    en: "Delivery manifest generation tool",
  },
  "Fleet maintenance scheduling tool": {
    vi: "Công cụ lên lịch bảo trì đội xe",
    en: "Fleet maintenance scheduling tool",
  },
  "Package dimension entry tool": {
    vi: "Công cụ nhập kích thước kiện hàng",
    en: "Package dimension entry tool",
  },
  "Driver availability update tool": {
    vi: "Công cụ cập nhật lịch rảnh tài xế",
    en: "Driver availability update tool",
  },
  "Customs document preparation tool": {
    vi: "Công cụ chuẩn bị chứng từ hải quan",
    en: "Customs document preparation tool",
  },
  "Loading dock scheduling tool": {
    vi: "Công cụ xếp lịch bến bốc dỡ",
    en: "Loading dock scheduling tool",
  },
  "Damaged goods reporting tool": {
    vi: "Công cụ báo cáo hàng hỏng",
    en: "Damaged goods reporting tool",
  },
  "Fuel consumption logging tool": {
    vi: "Công cụ ghi nhận tiêu hao nhiên liệu",
    en: "Fuel consumption logging tool",
  },
  "Container temperature monitoring tool": {
    vi: "Công cụ theo dõi nhiệt độ container",
    en: "Container temperature monitoring tool",
  },
  "Proof of delivery capture tool": {
    vi: "Công cụ lưu bằng chứng giao hàng",
    en: "Proof of delivery capture tool",
  },
  "Freight cost estimation tool": {
    vi: "Công cụ ước tính chi phí vận chuyển",
    en: "Freight cost estimation tool",
  },
  "Last-mile delivery status tool": {
    vi: "Công cụ theo dõi giao hàng chặng cuối",
    en: "Last-mile delivery status tool",
  },
  "Property listing creation tool": {
    vi: "Công cụ tạo tin đăng bất động sản",
    en: "Property listing creation tool",
  },
  "Client viewing schedule tool": {
    vi: "Công cụ xếp lịch xem nhà cho khách",
    en: "Client viewing schedule tool",
  },
  "Offer submission tracking tool": {
    vi: "Công cụ theo dõi nộp đề nghị mua",
    en: "Offer submission tracking tool",
  },
  "Document signing request tool": {
    vi: "Công cụ yêu cầu ký tài liệu",
    en: "Document signing request tool",
  },
  "Maintenance request logging tool": {
    vi: "Công cụ ghi nhận yêu cầu bảo trì",
    en: "Maintenance request logging tool",
  },
  "Property valuation calculator tool": {
    vi: "Công cụ tính giá trị bất động sản",
    en: "Property valuation calculator tool",
  },
  "Agent commission tracking tool": {
    vi: "Công cụ theo dõi hoa hồng môi giới",
    en: "Agent commission tracking tool",
  },
  "Lease agreement generation tool": {
    vi: "Công cụ tạo hợp đồng thuê",
    en: "Lease agreement generation tool",
  },
  "Open house visitor registration tool": {
    vi: "Công cụ đăng ký khách tham quan nhà mở",
    en: "Open house visitor registration tool",
  },
  "Tenant communication log tool": {
    vi: "Công cụ nhật ký liên lạc với người thuê",
    en: "Tenant communication log tool",
  },
  "Property expense categorization tool": {
    vi: "Công cụ phân loại chi phí bất động sản",
    en: "Property expense categorization tool",
  },
  "Market trend data visualization tool": {
    vi: "Công cụ trực quan hóa xu hướng thị trường",
    en: "Market trend data visualization tool",
  },
  "Contract clause library tool": {
    vi: "Công cụ thư viện điều khoản hợp đồng",
    en: "Contract clause library tool",
  },
  "Lead source attribution tool": {
    vi: "Công cụ gán nguồn khách tiềm năng",
    en: "Lead source attribution tool",
  },
  "Property inspection checklist tool": {
    vi: "Công cụ danh sách kiểm tra bất động sản",
    en: "Property inspection checklist tool",
  },
  "Production order creation tool": {
    vi: "Công cụ tạo lệnh sản xuất",
    en: "Production order creation tool",
  },
  "Machine status monitoring tool": {
    vi: "Công cụ giám sát trạng thái máy",
    en: "Machine status monitoring tool",
  },
  "Quality control inspection tool": {
    vi: "Công cụ kiểm tra chất lượng",
    en: "Quality control inspection tool",
  },
  "Raw material inventory tracking tool": {
    vi: "Công cụ theo dõi tồn kho nguyên vật liệu",
    en: "Raw material inventory tracking tool",
  },
  "Workstation assignment tool": {
    vi: "Công cụ phân công trạm làm việc",
    en: "Workstation assignment tool",
  },
  "Defect logging and categorization tool": {
    vi: "Công cụ ghi nhận và phân loại lỗi",
    en: "Defect logging and categorization tool",
  },
  "Maintenance request submission tool": {
    vi: "Công cụ gửi yêu cầu bảo trì",
    en: "Maintenance request submission tool",
  },
  "Bill of materials viewer tool": {
    vi: "Công cụ xem định mức vật tư",
    en: "Bill of materials viewer tool",
  },
  "Production line output tracking tool": {
    vi: "Công cụ theo dõi sản lượng dây chuyền",
    en: "Production line output tracking tool",
  },
  "Tooling usage logging tool": {
    vi: "Công cụ ghi nhận sử dụng dụng cụ",
    en: "Tooling usage logging tool",
  },
  "Safety incident reporting tool": {
    vi: "Công cụ báo cáo sự cố an toàn",
    en: "Safety incident reporting tool",
  },
  "Component traceability tagging tool": {
    vi: "Công cụ gắn nhãn truy xuất linh kiện",
    en: "Component traceability tagging tool",
  },
  "Energy consumption monitoring tool": {
    vi: "Công cụ giám sát tiêu thụ năng lượng",
    en: "Energy consumption monitoring tool",
  },
  "Supplier component quality rating tool": {
    vi: "Công cụ đánh giá chất lượng linh kiện nhà cung cấp",
    en: "Supplier component quality rating tool",
  },
  "Finished goods dispatch tool": {
    vi: "Công cụ xuất hàng thành phẩm",
    en: "Finished goods dispatch tool",
  },
  "Client project initiation tool": {
    vi: "Công cụ khởi tạo dự án khách hàng",
    en: "Client project initiation tool",
  },
  "Time entry logging tool": { vi: "Công cụ ghi chép thời gian", en: "Time entry logging tool" },
  "Invoice generation tool": { vi: "Công cụ tạo hóa đơn", en: "Invoice generation tool" },
  "Meeting scheduling tool": { vi: "Công cụ xếp lịch họp", en: "Meeting scheduling tool" },
  "Task progress update tool": { vi: "Công cụ cập nhật tiến độ công việc", en: "Task progress update tool" },
  "Client feedback collection tool": {
    vi: "Công cụ thu thập phản hồi khách hàng",
    en: "Client feedback collection tool",
  },
  "Contract renewal notification tool": {
    vi: "Công cụ nhắc gia hạn hợp đồng",
    en: "Contract renewal notification tool",
  },
  "Resource allocation planning tool": {
    vi: "Công cụ lập kế hoạch phân bổ nguồn lực",
    en: "Resource allocation planning tool",
  },
  "Expense claim submission tool": {
    vi: "Công cụ nộp yêu cầu thanh toán chi phí",
    en: "Expense claim submission tool",
  },
  "Knowledge base article creation tool": {
    vi: "Công cụ tạo bài viết cơ sở tri thức",
    en: "Knowledge base article creation tool",
  },
  "Client communication history tool": {
    vi: "Công cụ lịch sử trao đổi với khách hàng",
    en: "Client communication history tool",
  },
  "Proposal template selection tool": {
    vi: "Công cụ chọn mẫu đề xuất",
    en: "Proposal template selection tool",
  },
  "Skill matrix update tool": { vi: "Công cụ cập nhật ma trận kỹ năng", en: "Skill matrix update tool" },
  "Project budget tracking tool": { vi: "Công cụ theo dõi ngân sách dự án", en: "Project budget tracking tool" },
  "Deliverable approval request tool": {
    vi: "Công cụ yêu cầu phê duyệt đầu ra",
    en: "Deliverable approval request tool",
  },
  "Project task assignment tool": {
    vi: "Công cụ phân công nhiệm vụ dự án",
    en: "Project task assignment tool",
  },
  "Daily site report tool": { vi: "Công cụ báo cáo công trường hằng ngày", en: "Daily site report tool" },
  "Material order tracking tool": { vi: "Công cụ theo dõi đơn vật tư", en: "Material order tracking tool" },
  "Equipment usage logging tool": { vi: "Công cụ ghi nhận sử dụng thiết bị", en: "Equipment usage logging tool" },
  "Safety inspection checklist tool": {
    vi: "Công cụ danh sách kiểm tra an toàn",
    en: "Safety inspection checklist tool",
  },
  "Subcontractor payment approval tool": {
    vi: "Công cụ phê duyệt thanh toán nhà thầu phụ",
    en: "Subcontractor payment approval tool",
  },
  "Change order request tool": { vi: "Công cụ yêu cầu thay đổi hạng mục", en: "Change order request tool" },
  "Blueprint version control tool": { vi: "Công cụ quản lý phiên bản bản vẽ", en: "Blueprint version control tool" },
  "Permit application status tool": { vi: "Công cụ theo dõi trạng thái xin phép", en: "Permit application status tool" },
  "Site visitor log tool": { vi: "Công cụ nhật ký khách ra vào công trường", en: "Site visitor log tool" },
  "Progress photo capture tool": { vi: "Công cụ chụp ảnh tiến độ", en: "Progress photo capture tool" },
  "Tool inventory checkout tool": { vi: "Công cụ mượn/trả dụng cụ", en: "Tool inventory checkout tool" },
  "Hazard identification tagging tool": {
    vi: "Công cụ gắn nhãn nhận diện nguy cơ",
    en: "Hazard identification tagging tool",
  },
  "Waste disposal tracking tool": { vi: "Công cụ theo dõi xử lý rác thải", en: "Waste disposal tracking tool" },
  "Project milestone update tool": { vi: "Công cụ cập nhật cột mốc dự án", en: "Project milestone update tool" },
  "Donor contact management tool": { vi: "Công cụ quản lý liên hệ nhà tài trợ", en: "Donor contact management tool" },
  "Donation tracking entry tool": { vi: "Công cụ ghi nhận khoản quyên góp", en: "Donation tracking entry tool" },
  "Volunteer shift scheduling tool": { vi: "Công cụ xếp ca tình nguyện viên", en: "Volunteer shift scheduling tool" },
  "Grant application status tool": { vi: "Công cụ theo dõi đơn xin tài trợ", en: "Grant application status tool" },
  "Event registration management tool": {
    vi: "Công cụ quản lý đăng ký sự kiện",
    en: "Event registration management tool",
  },
  "Campaign performance monitoring tool": {
    vi: "Công cụ theo dõi hiệu quả chiến dịch",
    en: "Campaign performance monitoring tool",
  },
  "Beneficiary impact reporting tool": {
    vi: "Công cụ báo cáo tác động lên người thụ hưởng",
    en: "Beneficiary impact reporting tool",
  },
  "Fundraising goal progress tool": { vi: "Công cụ theo dõi mục tiêu gây quỹ", en: "Fundraising goal progress tool" },
  "Communication outreach logging tool": {
    vi: "Công cụ ghi nhận hoạt động truyền thông tiếp cận",
    en: "Communication outreach logging tool",
  },
  "Membership renewal reminder tool": {
    vi: "Công cụ nhắc gia hạn hội viên",
    en: "Membership renewal reminder tool",
  },
  "Volunteer skill matching tool": { vi: "Công cụ ghép kỹ năng tình nguyện viên", en: "Volunteer skill matching tool" },
  "Program expense categorization tool": {
    vi: "Công cụ phân loại chi phí chương trình",
    en: "Program expense categorization tool",
  },
  "Advocacy action tracking tool": { vi: "Công cụ theo dõi hoạt động vận động", en: "Advocacy action tracking tool" },
  "Board meeting minute distribution tool": {
    vi: "Công cụ phân phối biên bản họp hội đồng",
    en: "Board meeting minute distribution tool",
  },
  "Impact story collection tool": { vi: "Công cụ thu thập câu chuyện tác động", en: "Impact story collection tool" },
  "Transaction categorization tool": { vi: "Công cụ phân loại giao dịch", en: "Transaction categorization tool" },
  "Budget allocation adjustment tool": { vi: "Công cụ điều chỉnh phân bổ ngân sách", en: "Budget allocation adjustment tool" },
  "Expense receipt upload tool": { vi: "Công cụ tải lên hóa đơn chi tiêu", en: "Expense receipt upload tool" },
  "Invoice approval routing tool": { vi: "Công cụ luồng duyệt hóa đơn", en: "Invoice approval routing tool" },
  "Payment reconciliation matching tool": {
    vi: "Công cụ đối soát thanh toán",
    en: "Payment reconciliation matching tool",
  },
  "Account balance inquiry tool": { vi: "Công cụ tra cứu số dư tài khoản", en: "Account balance inquiry tool" },
  "Fraud alert flagging tool": { vi: "Công cụ gắn cờ cảnh báo gian lận", en: "Fraud alert flagging tool" },
  "Investment portfolio performance tool": {
    vi: "Công cụ theo dõi hiệu suất danh mục đầu tư",
    en: "Investment portfolio performance tool",
  },
  "Loan application status tool": { vi: "Công cụ theo dõi trạng thái vay", en: "Loan application status tool" },
  "Audit trail generation tool": { vi: "Công cụ tạo dấu vết kiểm toán", en: "Audit trail generation tool" },
  "Compliance document review tool": { vi: "Công cụ duyệt tài liệu tuân thủ", en: "Compliance document review tool" },
  "Financial report customization tool": { vi: "Công cụ tùy biến báo cáo tài chính", en: "Financial report customization tool" },
  "Risk assessment scoring tool": { vi: "Công cụ chấm điểm rủi ro", en: "Risk assessment scoring tool" },
  "Currency exchange rate update tool": {
    vi: "Công cụ cập nhật tỷ giá tiền tệ",
    en: "Currency exchange rate update tool",
  },
  "Tax document preparation tool": { vi: "Công cụ chuẩn bị chứng từ thuế", en: "Tax document preparation tool" },
  "Campaign performance tracking tool": {
    vi: "Công cụ theo dõi hiệu quả chiến dịch",
    en: "Campaign performance tracking tool",
  },
  "Content calendar scheduling tool": { vi: "Công cụ xếp lịch nội dung", en: "Content calendar scheduling tool" },
  "Social media post drafting tool": { vi: "Công cụ soạn bài đăng mạng xã hội", en: "Social media post drafting tool" },
  "Email list segmentation tool": { vi: "Công cụ phân khúc danh sách email", en: "Email list segmentation tool" },
  "Ad spend budget allocation tool": { vi: "Công cụ phân bổ ngân sách quảng cáo", en: "Ad spend budget allocation tool" },
  "Customer journey mapping tool": { vi: "Công cụ vẽ hành trình khách hàng", en: "Customer journey mapping tool" },
  "A/B test result analysis tool": { vi: "Công cụ phân tích kết quả A/B test", en: "A/B test result analysis tool" },
  "SEO keyword ranking tool": { vi: "Công cụ theo dõi thứ hạng từ khóa SEO", en: "SEO keyword ranking tool" },
  "Website traffic source tool": { vi: "Công cụ nguồn lưu lượng website", en: "Website traffic source tool" },
  "Lead qualification tagging tool": { vi: "Công cụ gắn nhãn đủ điều kiện khách tiềm năng", en: "Lead qualification tagging tool" },
  "Brand asset library tool": { vi: "Công cụ thư viện tài sản thương hiệu", en: "Brand asset library tool" },
  "Competitor activity monitoring tool": {
    vi: "Công cụ giám sát hoạt động đối thủ",
    en: "Competitor activity monitoring tool",
  },
  "Customer survey deployment tool": { vi: "Công cụ triển khai khảo sát khách hàng", en: "Customer survey deployment tool" },
  "Marketing automation rule creation tool": {
    vi: "Công cụ tạo quy tắc tự động hóa tiếp thị",
    en: "Marketing automation rule creation tool",
  },
  "Influencer collaboration tracking tool": {
    vi: "Công cụ theo dõi hợp tác với KOL/KOC",
    en: "Influencer collaboration tracking tool",
  },
};

export const translateCategory = (category: string, locale: Locale) =>
  categoryLabels[category]?.[locale] ?? category;

const cleanSeedTitle = (value: string) => value.replace(/\[cite:\s*\d+\]/g, "").trim();

const viPhraseReplacements: Array<[RegExp, string]> = [
  [/\bclient workout plan\b/g, "kế hoạch tập luyện khách hàng"],
  [/\bsession attendance\b/g, "điểm danh buổi tập"],
  [/\bfitness goal progress\b/g, "tiến độ mục tiêu thể hình"],
  [/\bexercise library\b/g, "thư viện bài tập"],
  [/\bnutrition habit\b/g, "thói quen dinh dưỡng"],
  [/\bbody[- ]?metric\b/g, "chỉ số cơ thể"],
  [/\btrainer schedule conflict\b/g, "xung đột lịch huấn luyện viên"],
  [/\bgroup challenge progress\b/g, "tiến độ thử thách nhóm"],
  [/\bfeature request\b/g, "yêu cầu tính năng"],
  [/\bbug priority\b/g, "mức độ ưu tiên lỗi"],
  [/\brelease note version\b/g, "phiên bản ghi chú phát hành"],
  [/\buser onboarding\b/g, "nhập môn người dùng"],
  [/\btrial-to-paid conversion\b/g, "chuyển đổi dùng thử sang trả phí"],
  [/\bapi usage quota\b/g, "hạn mức sử dụng API"],
  [/\bfeature adoption heatmap\b/g, "bản đồ nhiệt mức độ dùng tính năng"],
  [/\bguest reservation status\b/g, "trạng thái đặt phòng"],
  [/\broom cleaning status\b/g, "trạng thái dọn phòng"],
  [/\bcheck-in document\b/g, "giấy tờ nhận phòng"],
  [/\bupsell opportunity\b/g, "cơ hội bán thêm"],
  [/\bguest preference\b/g, "sở thích khách"],
  [/\bhousekeeping task\b/g, "nhiệm vụ dọn phòng"],
  [/\bguest incident\b/g, "sự cố khách"],
  [/\barticle draft status\b/g, "trạng thái bản nháp bài viết"],
  [/\bcontent calendar task\b/g, "lịch nội dung"],
  [/\bwriter assignment\b/g, "phân công người viết"],
  [/\bimage rights\b/g, "quyền ảnh"],
  [/\bpublishing approval\b/g, "phê duyệt xuất bản"],
  [/\bcopyright expiration\b/g, "hết hạn bản quyền"],
  [/\banalytics metric snapshot\b/g, "ảnh chụp chỉ số"],
  [/\bcontent localization\b/g, "bản địa hóa nội dung"],
  [/\bloan application status\b/g, "trạng thái hồ sơ vay"],
  [/\bcredit score snapshot\b/g, "ảnh chụp điểm tín dụng"],
  [/\btransaction category\b/g, "danh mục giao dịch"],
  [/\bcompliance requirement\b/g, "yêu cầu tuân thủ"],
  [/\border tracking\b/g, "theo dõi đơn hàng"],
  [/\btable assignment\b/g, "phân bàn"],
  [/\bstaff scheduling\b/g, "xếp ca nhân viên"],
  [/\bdaily sales summary\b/g, "tóm tắt doanh thu ngày"],
  [/\bcustomer feedback collection\b/g, "thu thập phản hồi khách hàng"],
  [/\breservation waitlist\b/g, "danh sách chờ đặt bàn"],
  [/\bspecial-diet request\b/g, "yêu cầu chế độ ăn"],
  [/\bstaff shift checklist\b/g, "checklist ca làm"],
  [/\bvendor delivery log\b/g, "nhật ký giao hàng nhà cung cấp"],
  [/\bstore inventory count\b/g, "kiểm kê cửa hàng"],
  [/\bprice tag change\b/g, "thay đổi nhãn giá"],
  [/\breturn reason tagging\b/g, "gắn nhãn lý do trả hàng"],
  [/\bcustomer loyalty tier\b/g, "hạng khách thân thiết"],
  [/\bpromotion performance\b/g, "hiệu quả khuyến mãi"],
  [/\bshelf placement planner\b/g, "kế hoạch trưng bày kệ"],
  [/\bshipment tracking status\b/g, "trạng thái lô hàng"],
  [/\bdelivery route planner\b/g, "lập tuyến giao hàng"],
  [/\bdriver duty log\b/g, "nhật ký ca lái xe"],
  [/\bwarehouse zone assignment\b/g, "phân khu kho"],
  [/\bfreight cost estimation\b/g, "ước tính cước vận chuyển"],
  [/\bcustoms clearance status\b/g, "trạng thái thông quan"],
  [/\bproperty listing status\b/g, "trạng thái tin đăng"],
  [/\blead follow-up reminder\b/g, "nhắc theo dõi khách tiềm năng"],
  [/\bcommission split calculator\b/g, "tính chia hoa hồng"],
  [/\bproperty inspection checklist\b/g, "checklist kiểm tra bất động sản"],
  [/\bshowing schedule planner\b/g, "lịch xem nhà"],
  [/\bmachine uptime logging\b/g, "ghi thời gian máy chạy"],
  [/\bdefect type tagging\b/g, "gắn nhãn loại lỗi"],
  [/\bwork order progress\b/g, "tiến độ lệnh sản xuất"],
  [/\braw material consumption\b/g, "tiêu hao nguyên liệu"],
  [/\bquality control checklist\b/g, "checklist kiểm tra chất lượng"],
  [/\bsafety incident log\b/g, "nhật ký sự cố an toàn"],
  [/\bproduction batch tracking\b/g, "theo dõi lô sản xuất"],
  [/\bclient contact log\b/g, "nhật ký liên hệ khách hàng"],
  [/\bdocument version comparison\b/g, "so sánh phiên bản tài liệu"],
  [/\bconflict of interest checker\b/g, "kiểm tra xung đột lợi ích"],
  [/\bmatter status dashboard\b/g, "bảng điều khiển trạng thái hồ sơ"],
  [/\btask delegation\b/g, "phân công nhiệm vụ"],
  [/\bmeeting agenda library\b/g, "thư viện chương trình họp"],
  [/\bblueprint version\b/g, "phiên bản bản vẽ"],
  [/\bdaily site report\b/g, "báo cáo công trường ngày"],
  [/\bwork-in-progress photography\b/g, "ảnh tiến độ"],
  [/\bpunch list\b/g, "danh sách sửa lỗi"],
  [/\bdonor contact history\b/g, "lịch sử liên hệ nhà tài trợ"],
  [/\bgrant application status\b/g, "trạng thái hồ sơ tài trợ"],
  [/\bvolunteer shift log\b/g, "nhật ký ca tình nguyện"],
  [/\bcampaign impact tagging\b/g, "gắn nhãn tác động chiến dịch"],
  [/\bevent attendance\b/g, "điểm danh sự kiện"],
  [/\bprogram outcome metric\b/g, "chỉ số kết quả chương trình"],
  [/\bin-kind donation\b/g, "quyên góp hiện vật"],
  [/\bbeneficiary intake form\b/g, "biểu mẫu tiếp nhận người thụ hưởng"],
  [/\breporting deadline reminder\b/g, "nhắc thời hạn báo cáo"],
  [/\bcommunity feedback\b/g, "phản hồi cộng đồng"],
];

const viTitleReplacements: Array<[RegExp, string]> = [
  [/\bclient\b/g, "khách hàng"],
  [/\bcustomer\b/g, "khách hàng"],
  [/\bguest\b/g, "khách"],
  [/\buser\b/g, "người dùng"],
  [/\bstaff\b/g, "nhân viên"],
  [/\btrainer\b/g, "huấn luyện viên"],
  [/\bworkout plan\b/g, "kế hoạch tập luyện"],
  [/\bworkout\b/g, "tập luyện"],
  [/\bexercise\b/g, "bài tập"],
  [/\bfitness\b/g, "thể hình"],
  [/\bwellness\b/g, "sức khỏe"],
  [/\bnutrition\b/g, "dinh dưỡng"],
  [/\bbody[- ]?metric\b/g, "chỉ số cơ thể"],
  [/\bsession attendance\b/g, "điểm danh buổi"],
  [/\bgoal progress\b/g, "tiến độ mục tiêu"],
  [/\bschedule conflict\b/g, "xung đột lịch"],
  [/\bequipment maintenance\b/g, "bảo trì thiết bị"],
  [/\bmembership type\b/g, "loại hội viên"],
  [/\bclass capacity\b/g, "sức chứa lớp"],
  [/\binjury risk\b/g, "rủi ro chấn thương"],
  [/\bsleep habit\b/g, "thói quen ngủ"],
  [/\bwellness coach\b/g, "huấn luyện viên sức khỏe"],
  [/\bgroup challenge\b/g, "thử thách nhóm"],
  [/\bexercise video\b/g, "video bài tập"],
  [/\bfeature request\b/g, "yêu cầu tính năng"],
  [/\bbug priority\b/g, "độ ưu tiên lỗi"],
  [/\brelease note\b/g, "ghi chú phát hành"],
  [/\bonboarding\b/g, "nhập môn"],
  [/\btrial-to-paid conversion\b/g, "chuyển từ dùng thử sang trả phí"],
  [/\bapi usage quota\b/g, "hạn mức sử dụng API"],
  [/\bfield customization\b/g, "tùy chỉnh trường"],
  [/\bupgrade path\b/g, "lộ trình nâng cấp"],
  [/\bfeature deprecation\b/g, "ngừng hỗ trợ tính năng"],
  [/\bpermission role\b/g, "vai trò quyền truy cập"],
  [/\bintegration status\b/g, "trạng thái tích hợp"],
  [/\bsupport ticket\b/g, "phiếu hỗ trợ"],
  [/\bfeature adoption heatmap\b/g, "bản đồ nhiệt mức độ sử dụng tính năng"],
  [/\bannouncement[s]? targeting\b/g, "nhắm mục tiêu thông báo"],
  [/\bguest reservation status\b/g, "trạng thái đặt phòng"],
  [/\broom cleaning status\b/g, "trạng thái dọn phòng"],
  [/\bcheck-in document\b/g, "giấy tờ nhận phòng"],
  [/\bupsell opportunity\b/g, "cơ hội bán thêm"],
  [/\bguest preference\b/g, "sở thích khách"],
  [/\bloyalty stay\b/g, "số đêm tích lũy"],
  [/\bhousekeeping task\b/g, "nhiệm vụ dọn phòng"],
  [/\bmaintenance request\b/g, "yêu cầu bảo trì"],
  [/\bguest incident\b/g, "sự cố của khách"],
  [/\blocal attraction\b/g, "điểm tham quan gần đó"],
  [/\bgroup booking\b/g, "đặt nhóm"],
  [/\bhouse rule\b/g, "nội quy"],
  [/\bearly check-in\b/g, "nhận phòng sớm"],
  [/\blate check-out\b/g, "trả phòng muộn"],
  [/\bguest feedback\b/g, "phản hồi khách"],
  [/\barticle draft\b/g, "bản nháp bài viết"],
  [/\bcontent calendar\b/g, "lịch nội dung"],
  [/\btopic tagging\b/g, "gắn nhãn chủ đề"],
  [/\bwriter assignment\b/g, "phân công người viết"],
  [/\bimage rights\b/g, "quyền sử dụng hình ảnh"],
  [/\bpublishing approval\b/g, "phê duyệt xuất bản"],
  [/\bcopyright expiration\b/g, "hết hạn bản quyền"],
  [/\baudio-clip asset\b/g, "tài sản âm thanh"],
  [/\bepisode release\b/g, "phát hành tập"],
  [/\binterview transcript\b/g, "bản chép lời phỏng vấn"],
  [/\bcontent repurposing\b/g, "tái sử dụng nội dung"],
  [/\bseo keyword\b/g, "từ khóa SEO"],
  [/\banalytics metric snapshot\b/g, "ảnh chụp chỉ số phân tích"],
  [/\bcontributor contract\b/g, "hợp đồng cộng tác viên"],
  [/\bcontent localization\b/g, "bản địa hóa nội dung"],
  [/\bloan application\b/g, "hồ sơ vay"],
  [/\bcredit score snapshot\b/g, "ảnh chụp điểm tín dụng"],
  [/\btransaction category\b/g, "danh mục giao dịch"],
  [/\bbudget line\b/g, "dòng ngân sách"],
  [/\binvestment goal\b/g, "mục tiêu đầu tư"],
  [/\bfee type\b/g, "loại phí"],
  [/\baccount relationship\b/g, "quan hệ tài khoản"],
  [/\bcompliance requirement\b/g, "yêu cầu tuân thủ"],
  [/\bkyc document\b/g, "tài liệu KYC"],
  [/\bpayment method\b/g, "phương thức thanh toán"],
  [/\bfraud indicator\b/g, "dấu hiệu gian lận"],
  [/\brisk profile\b/g, "hồ sơ rủi ro"],
  [/\bsubscription billing\b/g, "thanh toán thuê bao"],
  [/\btax category\b/g, "danh mục thuế"],
  [/\bportfolio allocation\b/g, "phân bổ danh mục"],
  [/\border tracking\b/g, "theo dõi đơn hàng"],
  [/\btable assignment\b/g, "phân bàn"],
  [/\bstaff scheduling\b/g, "lập lịch nhân viên"],
  [/\bingredient inventory\b/g, "tồn kho nguyên liệu"],
  [/\bdaily sales summary\b/g, "tóm tắt doanh thu hằng ngày"],
  [/\bmenu item popularity\b/g, "độ phổ biến món"],
  [/\bcustomer feedback collection\b/g, "thu thập phản hồi khách hàng"],
  [/\breservation waitlist\b/g, "danh sách chờ đặt bàn"],
  [/\bspecial-diet request\b/g, "yêu cầu chế độ ăn đặc biệt"],
  [/\bkitchen station status\b/g, "trạng thái quầy bếp"],
  [/\bstaff shift checklist\b/g, "danh sách việc ca làm"],
  [/\bvendor delivery log\b/g, "nhật ký giao hàng nhà cung cấp"],
  [/\bwaste tracking\b/g, "theo dõi lãng phí"],
  [/\bloyalty program points\b/g, "điểm chương trình khách thân thiết"],
  [/\btable turnover timer\b/g, "bộ đếm vòng bàn"],
  [/\bstore inventory count\b/g, "kiểm kê cửa hàng"],
  [/\bprice tag change\b/g, "thay đổi nhãn giá"],
  [/\breturn reason tagging\b/g, "gắn nhãn lý do trả hàng"],
  [/\bcustomer loyalty tier\b/g, "hạng khách thân thiết"],
  [/\bpromotion performance\b/g, "hiệu quả khuyến mãi"],
  [/\bshelf placement planner\b/g, "lập kế hoạch trưng bày kệ"],
  [/\bloss prevention incident log\b/g, "nhật ký sự cố chống thất thoát"],
  [/\bemployee task checklist\b/g, "danh sách việc nhân viên"],
  [/\bvendor rebate\b/g, "hoàn tiền nhà cung cấp"],
  [/\bproduct category tagging\b/g, "gắn nhãn danh mục sản phẩm"],
  [/\bclearance item status\b/g, "trạng thái hàng thanh lý"],
  [/\bonline to offline order\b/g, "đơn hàng online-to-offline"],
  [/\bstaff training completion\b/g, "hoàn thành đào tạo nhân viên"],
  [/\bcustomer size preference\b/g, "sở thích kích cỡ khách hàng"],
  [/\bgift card balance\b/g, "số dư thẻ quà tặng"],
  [/\bshipment tracking status\b/g, "trạng thái theo dõi lô hàng"],
  [/\bdelivery route planner\b/g, "lập tuyến giao hàng"],
  [/\bdriver duty log\b/g, "nhật ký ca lái xe"],
  [/\bwarehouse zone assignment\b/g, "phân khu kho"],
  [/\bfreight cost estimation\b/g, "ước tính chi phí vận chuyển"],
  [/\bimport document status\b/g, "trạng thái giấy tờ nhập khẩu"],
  [/\bvehicle maintenance\b/g, "bảo trì xe"],
  [/\bdock door scheduling\b/g, "lịch cửa bốc dỡ"],
  [/\bcargo damage log\b/g, "nhật ký hư hại hàng hóa"],
  [/\bcarrier performance\b/g, "hiệu suất nhà vận chuyển"],
  [/\bcustoms clearance status\b/g, "trạng thái thông quan"],
  [/\bpickup request\b/g, "yêu cầu nhận hàng"],
  [/\blast-mile delivery status\b/g, "trạng thái giao chặng cuối"],
  [/\bload weight logging\b/g, "ghi nhận trọng lượng hàng"],
  [/\bhazardous material tag\b/g, "thẻ hàng nguy hiểm"],
  [/\bproperty listing status\b/g, "trạng thái tin đăng"],
  [/\blead follow-up reminder\b/g, "nhắc theo dõi khách tiềm năng"],
  [/\bopen house visitor\b/g, "khách tham quan mở bán"],
  [/\bcommission split calculator\b/g, "tính chia hoa hồng"],
  [/\blease term\b/g, "thời hạn thuê"],
  [/\bproperty inspection checklist\b/g, "danh sách kiểm tra bất động sản"],
  [/\btenant screening status\b/g, "trạng thái sàng lọc người thuê"],
  [/\bmarket price comparison\b/g, "so sánh giá thị trường"],
  [/\bshowing schedule planner\b/g, "lập lịch xem nhà"],
  [/\bcontract milestone\b/g, "cột mốc hợp đồng"],
  [/\butility read-in readout\b/g, "ghi chỉ số đồng hồ tiện ích"],
  [/\bproperty renovation log\b/g, "nhật ký cải tạo bất động sản"],
  [/\bneighborhood data tagging\b/g, "gắn nhãn dữ liệu khu vực"],
  [/\boffer status comparison\b/g, "so sánh trạng thái đề nghị"],
  [/\bmachine uptime logging\b/g, "ghi nhận thời gian hoạt động máy"],
  [/\bdefect type tagging\b/g, "gắn nhãn loại lỗi"],
  [/\bwork order progress\b/g, "tiến độ lệnh sản xuất"],
  [/\braw material consumption\b/g, "tiêu hao nguyên liệu"],
  [/\bquality control checklist\b/g, "danh sách kiểm tra chất lượng"],
  [/\bshift productivity\b/g, "năng suất theo ca"],
  [/\btool calibration schedule\b/g, "lịch hiệu chuẩn dụng cụ"],
  [/\bsafety incident log\b/g, "nhật ký sự cố an toàn"],
  [/\bproduction batch tracking\b/g, "theo dõi lô sản xuất"],
  [/\bmaintenance work order\b/g, "lệnh bảo trì"],
  [/\bsupplier quality score\b/g, "điểm chất lượng nhà cung cấp"],
  [/\bcapacity planning helper\b/g, "trợ lý lập kế hoạch năng lực"],
  [/\bchange order tracking\b/g, "theo dõi thay đổi đơn hàng"],
  [/\bwaste material logging\b/g, "ghi nhận vật liệu thải"],
  [/\bequipment location\b/g, "vị trí thiết bị"],
  [/\bclient contact log\b/g, "nhật ký liên hệ khách hàng"],
  [/\bproposal status\b/g, "trạng thái đề xuất"],
  [/\btime entry verification\b/g, "xác minh thời gian làm việc"],
  [/\bdocument version comparison\b/g, "so sánh phiên bản tài liệu"],
  [/\bconflict of interest checker\b/g, "kiểm tra xung đột lợi ích"],
  [/\bmatter status dashboard\b/g, "bảng điều khiển trạng thái hồ sơ"],
  [/\bbilling milestone\b/g, "cột mốc tính phí"],
  [/\bexpertise skill tagging\b/g, "gắn nhãn chuyên môn"],
  [/\bknowledge base tagging\b/g, "gắn nhãn cơ sở tri thức"],
  [/\bclient project timeline\b/g, "dòng thời gian dự án khách hàng"],
  [/\bretainer usage\b/g, "mức sử dụng gói duy trì"],
  [/\btask delegation\b/g, "phân công nhiệm vụ"],
  [/\bmeeting agenda library\b/g, "thư viện chương trình họp"],
  [/\bengagement risk tagging\b/g, "gắn nhãn rủi ro hợp đồng"],
  [/\bblueprint version\b/g, "phiên bản bản vẽ"],
  [/\btrade subcontractor\b/g, "nhà thầu phụ"],
  [/\bchange order\b/g, "thay đổi hạng mục"],
  [/\bdaily site report\b/g, "báo cáo công trường hằng ngày"],
  [/\bsafety inspection\b/g, "kiểm tra an toàn"],
  [/\bmaterial delivery\b/g, "giao vật liệu"],
  [/\bwork-in-progress photography\b/g, "nhật ký ảnh tiến độ"],
  [/\bpunch list\b/g, "danh sách sửa lỗi"],
  [/\bcrane and equipment\b/g, "cẩu và thiết bị"],
  [/\bpermit status\b/g, "trạng thái giấy phép"],
  [/\bquality inspection\b/g, "kiểm tra chất lượng"],
  [/\bsubcontractor safety training\b/g, "đào tạo an toàn nhà thầu phụ"],
  [/\bsite access\b/g, "ra vào công trường"],
  [/\bweather disruption\b/g, "gián đoạn do thời tiết"],
  [/\bconstruction cost variance\b/g, "chênh lệch chi phí xây dựng"],
  [/\bdonor contact history\b/g, "lịch sử liên hệ nhà tài trợ"],
  [/\bgrant application status\b/g, "trạng thái hồ sơ tài trợ"],
  [/\bvolunteer shift log\b/g, "nhật ký ca tình nguyện"],
  [/\bcampaign impact tagging\b/g, "gắn nhãn tác động chiến dịch"],
  [/\bevent attendance\b/g, "điểm danh sự kiện"],
  [/\bprogram outcome metric\b/g, "chỉ số kết quả chương trình"],
  [/\bdonation source\b/g, "nguồn đóng góp"],
  [/\bin-kind donation\b/g, "quyên góp hiện vật"],
  [/\bbeneficiary intake form\b/g, "biểu mẫu tiếp nhận người thụ hưởng"],
  [/\bvolunteer skill\b/g, "kỹ năng tình nguyện viên"],
  [/\bmatching gift\b/g, "quà tặng đối ứng"],
  [/\breporting deadline reminder\b/g, "nhắc thời hạn báo cáo"],
  [/\bpartner organization\b/g, "tổ chức đối tác"],
  [/\badvocacy action\b/g, "hành động vận động"],
  [/\bcommunity feedback\b/g, "phản hồi cộng đồng"],
];

const translateGeneratedSeedTitleVi = (title: string) => {
  const cleaned = cleanSeedTitle(title).replace(/\s*tool$/i, "").replace(/\s*tracker$/i, "").trim();
  let value = cleaned.toLowerCase();
  for (const [pattern, replacement] of viPhraseReplacements) {
    value = value.replace(pattern, replacement);
  }
  for (const [pattern, replacement] of viTitleReplacements) {
    value = value.replace(pattern, replacement);
  }

  value = value
    .replace(/\s+/g, " ")
    .replace(/\b(of|and|the|to|for|from|in|on|at|with|by)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!value) return "Ý tưởng";

  const suffixPrefix = /dashboard$/.test(cleaned)
    ? "Bảng điều khiển"
    : /summary$/.test(cleaned)
      ? "Tóm tắt"
      : /planner$/.test(cleaned) || /scheduler$/.test(cleaned) || /schedule$/.test(cleaned)
        ? "Lập lịch"
        : /checker$/.test(cleaned)
          ? "Kiểm tra"
          : /calculator$/.test(cleaned)
            ? "Tính toán"
            : /log$/.test(cleaned) || /logging tool$/.test(cleaned)
              ? "Nhật ký"
              : /tracking tool$/.test(cleaned) || /tracker$/.test(cleaned) || /status tracker$/.test(cleaned)
                ? "Theo dõi"
                : /tagging tool$/.test(cleaned)
                  ? "Gắn nhãn"
                  : /comparison tool$/.test(cleaned)
                    ? "So sánh"
                      : /status tool$/.test(cleaned)
                        ? "Trạng thái"
                        : /helper$/.test(cleaned)
                          ? "Trợ lý"
                          : "";

  const alreadyNatural = /^(trạng thái|theo dõi|bảng điều khiển|tóm tắt|lập lịch|kiểm tra|tính toán|nhật ký|gắn nhãn|so sánh|trợ lý|phân|xếp|báo cáo|điểm danh|nhắc|quyền|thư viện|danh sách|ảnh|phê duyệt|phân khu|lập tuyến|ghi|tiến độ|cải tạo|hành động|phản hồi)/.test(
    value,
  );

  if (alreadyNatural) {
    return value;
  }

  return suffixPrefix ? `${suffixPrefix} ${value}`.replace(/\s+/g, " ").trim() : value;
};

export const translateSeedTitle = (title: string, locale: Locale) => {
  const cleaned = cleanSeedTitle(title);
  const explicit = seedTitleLabels[cleaned]?.[locale];
  if (explicit) return explicit;
  if (locale === "vi") {
    return translateGeneratedSeedTitleVi(cleaned);
  }
  return cleaned;
};

export const getUiCopy = (locale: Locale) => uiCopy[locale];

export const getDisplayIdea = (idea: Idea, locale: Locale) => {
  const ui = getUiCopy(locale);
  const isSeed = idea.source === "seed";
  const category = translateCategory(idea.category, locale);
  const title = isSeed ? translateSeedTitle(idea.title, locale) : idea.title;
  const summary =
    isSeed && locale === "vi"
      ? `Công cụ vi mô cho ${stripTrailingToolSuffix(title, locale)} trong lĩnh vực ${category.toLowerCase()}.`
      : isSeed && locale === "en"
        ? idea.summary
        : idea.summary;
  const details =
    isSeed && locale === "vi"
      ? [
          `Ý tưởng này thuộc nhóm ${category.toLowerCase()} và xoay quanh ${stripTrailingToolSuffix(title, locale).toLowerCase()}.`,
          "Nó phù hợp khi quy trình cần một thao tác ngắn, trạng thái rõ ràng và bàn giao gọn trên di động.",
          "Điều đó khiến nó rất hợp với luồng rà soát ý tưởng nhanh của ứng dụng này.",
        ].join(" ")
      : isSeed && locale === "en"
        ? idea.details
        : idea.details;

  return {
    title,
    category,
    summary,
    details,
    note: idea.note,
    sourceLabel: isSeed ? ui.sourceSeed : ui.sourceCustom,
    importedLabel: isSeed ? ui.importedLabel : ui.customLabel,
  };
};

export const getDraftSummary = (locale: Locale, category: string, title: string) => {
  if (locale === "vi") {
    return `Một ý tưởng vi mô gọn nhẹ cho ${translateCategory(category, locale).toLowerCase()} xoay quanh ${title.trim().toLowerCase()}.`;
  }
  return `A compact micro-tool idea for ${category.toLowerCase()} focused on ${title.trim().toLowerCase()}.`;
};

export const getDraftDetails = (locale: Locale, category: string, title: string) => {
  if (locale === "vi") {
    return [
      `Ý tưởng này phù hợp cho danh mục ${translateCategory(category, locale).toLowerCase()} và tập trung vào ${title.trim().toLowerCase()}.`,
      "Nó hiệu quả nhất khi người dùng chỉ cần một thao tác ngắn, một trạng thái rõ ràng và bàn giao nhanh trên di động.",
    ].join(" ");
  }
  return [
    `This idea works best in ${category.toLowerCase()} when the workflow centers on ${title.trim().toLowerCase()}.`,
    "It works best when the workflow needs one short action, a clear status, and a tidy handoff on mobile.",
  ].join(" ");
};

const stripTrailingToolSuffix = (value: string, locale: Locale) => {
  if (locale === "vi") {
    return value.replace(/^(Công cụ|Nhật ký|Bảng điều khiển|Tóm tắt)\s+/i, "").trim();
  }
  return value.replace(/\s*tool$/i, "").trim();
};
