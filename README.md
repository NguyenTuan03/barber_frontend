# 💈 T99 Barber Shop - Frontend Application

Đây là phần giao diện người dùng (Frontend) của hệ thống quản lý và đặt lịch **T99 Barber Shop**, được xây dựng bằng **Next.js** (App Router), **Tailwind CSS v4** và **TypeScript**. 

Giao diện được thiết kế hiện đại, mượt mà với hiệu ứng chuyển động tinh tế, đáp ứng đầy đủ trải nghiệm đặt lịch nhanh chóng cho khách hàng và trang quản trị trực quan cho nhân viên/chủ tiệm.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

* **Framework chính:** Next.js 16.2.10 (App Router) & React 19.2.4
* **Styling (CSS):** Tailwind CSS v4 & PostCSS
* **Ngôn ngữ:** TypeScript & HTML5
* **Quản lý gói:** `pnpm` (Workspace configured)
* **Xử lý Đa ngôn ngữ (i18n):** Tích hợp qua cấu trúc thư mục/routing i18n (`next-intl` hoặc `react-i18next`).

---

## ✨ Các Tính Năng Nổi Bật

### 1. Trang Chủ Đa Ngôn Ngữ (Landing Page i18n)
* Hỗ trợ chuyển đổi nhanh Tiếng Việt / Tiếng Anh qua nút chuyển đổi ngôn ngữ (Language Switcher) trên Header.
* Các text tĩnh được lưu trữ cục bộ trong file ngôn ngữ (JSON).
* Các nội dung động (dịch vụ, thợ cắt tóc) được tải trực tiếp từ Backend API theo ngôn ngữ người dùng lựa chọn (gửi kèm header `Accept-Language` hoặc query param `?locale=...`).

### 2. Luồng Đặt Lịch Hẹn Trực Tuyến (5-Step Booking Flow)
* **Bước 1 (Chọn dịch vụ):** Chọn một hoặc nhiều dịch vụ, hệ thống sẽ tự động tính toán tổng số tiền và tổng thời gian ước lượng.
* **Bước 2 (Chọn Barber):** Chọn thợ cắt tóc yêu thích hoặc chọn "Sắp xếp thợ bất kỳ" để tối ưu hóa thời gian.
* **Bước 3 (Chọn Ngày & Giờ):** Chọn ngày trong tuần và khung giờ làm việc còn trống (các khung giờ thợ đã kẹt lịch sẽ tự động ẩn đi).
* **Bước 4 (Thông tin liên hệ):** Điền Tên, Số điện thoại (bắt buộc) và Ghi chú thêm cho thợ.
* **Bước 5 (Hoàn tất):** Màn hình hiển thị thông báo đặt lịch thành công, lưu thông tin locale của khách hàng vào hệ thống để phục vụ việc gửi thông báo sau đó.

### 3. Trang Quản Trị Hệ Thống (Admin & Barber Dashboard)
* **Dashboard dành cho Thợ (Barber):** Giao diện riêng tư, chỉ hiển thị lịch hẹn được phân công cho thợ đó trong ngày, cho phép đổi trạng thái lịch thành "Đã xong".
* **Dashboard dành cho Chủ tiệm (Admin):** Quản lý toàn bộ danh sách lịch hẹn của các thợ, thay đổi nội dung trang chủ (CMS song ngữ), quản lý thông tin thợ cắt tóc, danh sách dịch vụ và giá tiền.

---

## 📁 Cấu Trúc Thư Mục Quan Trọng

```text
barber_frontend/
├── app/                  # Thư mục chứa các Pages, Layouts và Stylesheets của Next.js (App Router)
│   ├── globals.css       # File cấu hình CSS toàn cục (Tailwind v4 imports)
│   ├── layout.tsx        # Layout gốc định nghĩa font chữ Geist và cấu trúc HTML
│   └── page.tsx          # Trang chủ chính (Landing Page)
├── public/               # Chứa các tài nguyên tĩnh như hình ảnh, biểu tượng (logos, icons)
├── package.json          # Danh sách dependencies và scripts
├── tsconfig.json         # Cấu hình TypeScript
└── next.config.ts        # Cấu hình Next.js
```

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy Local

### Điều Kiện Cần Thiết
* Đã cài đặt **Node.js** (Phiên bản gợi ý: >= 18)
* Đã cài đặt trình quản lý gói **pnpm** (`npm install -g pnpm`)

### Các Bước Cài Đặt

1. **Di chuyển vào thư mục frontend:**
   ```bash
   cd barber_frontend
   ```

2. **Cài đặt các thư viện cần thiết:**
   ```bash
   pnpm install
   ```

3. **Khởi chạy ứng dụng ở chế độ phát triển (Development):**
   Mặc định Next.js sẽ chạy trên cổng 3000, tuy nhiên do Backend API Rails cũng chạy trên cổng 3000 nên bạn cần cấu hình cổng 3001 cho Frontend:
   ```bash
   pnpm dev --port 3001
   ```
   Sau khi khởi chạy thành công, truy cập trình duyệt tại địa chỉ: [http://localhost:3001](http://localhost:3001)

4. **Biên dịch và đóng gói cho production:**
   ```bash
   pnpm build
   # Chạy phiên bản production sau khi build thành công
   pnpm start
   ```

5. **Kiểm tra và sửa lỗi cú pháp (Linting):**
   ```bash
   pnpm lint
   ```

---

## 🔌 Kết Nối Với Backend API

* **Địa chỉ Backend API:** `http://localhost:3000` (được cấu hình qua biến môi trường hoặc file cấu hình Axios/Fetch).
* **Header Đa Ngôn Ngữ:** Khi gửi request đến backend, hãy đính kèm header `Accept-Language: vi` hoặc `Accept-Language: en` để Backend API trả về thông tin đã được dịch chuẩn xác theo ngôn ngữ hiện tại của UI.
* **Xác Thực (Auth):** Khi Admin hoặc Barber đăng nhập thành công, nhận token JWT từ endpoint `/api/v1/login`, lưu trữ trong Cookie hoặc LocalStorage và đính kèm vào header `Authorization: Bearer <token>` đối với mỗi request tiếp theo để xác thực quyền truy cập.

---

## 📄 Tài Liệu Tham Khảo Thêm
* [Tài liệu đề xuất dự án (BRD)](file:///Applications/Tuan/BarberShop/barber_frontend/BRD%20-%20T99%20barbershop.md)
* [Đặc tả yêu cầu phần mềm (SRS)](file:///Applications/Tuan/BarberShop/barber_frontend/SRS%20-%20T99%20barbershop.md)
