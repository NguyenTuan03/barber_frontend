import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Áp dụng middleware cho trang chủ và các đường dẫn ngôn ngữ vi/en
  // Đồng thời bỏ qua các thư mục hệ thống như _next, ảnh tĩnh, api, v.v.
  matcher: ["/", "/(vi|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
