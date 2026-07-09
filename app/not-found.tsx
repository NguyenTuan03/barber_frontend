"use client";

import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="vi" className="h-full">
      <body className="h-full bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center antialiased">
        {/* 404 Badge */}
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 p-0.5 border border-zinc-800 shadow-inner flex items-center justify-center mb-6">
          <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center text-amber-500 font-mono font-extrabold text-lg">
            404
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider mb-2 font-sans">
          Page Not Found / Không Tìm Thấy Trang
        </h1>

        <p className="text-xs md:text-sm text-zinc-400 max-w-[45ch] mb-8 leading-relaxed">
          The requested page could not be found. Please check the URL or return to the home page.
          <span className="block mt-1 text-zinc-500">
            Trang yêu cầu không tồn tại. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
          </span>
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold tracking-wide transition-all active:scale-[0.98] shadow-sm"
        >
          Go Back Home / Quay về trang chủ
        </Link>
      </body>
    </html>
  );
}
