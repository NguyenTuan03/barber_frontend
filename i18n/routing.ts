import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // Danh sách các ngôn ngữ được hỗ trợ
  locales: ["vi", "en"],
  // Ngôn ngữ mặc định
  defaultLocale: "vi",
  // Chỉ thêm tiền tố ngôn ngữ khi cần thiết (ví dụ: /en, còn ngôn ngữ mặc định /vi sẽ chạy trực tiếp tại /)
  localePrefix: "as-needed",
});

// Các wrapper được viết lại theo chuẩn i18n để định hướng trong trang
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
