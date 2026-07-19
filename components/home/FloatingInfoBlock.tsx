import { ClockIcon, MapPinIcon, PhoneIcon } from "../common/Icons";
import { InfoBlockTypeEnum } from "@/enum/AppEnum";
import { SiteSetting } from "@/services/siteSettings/getSiteSettingsApi";
import { safeParseJson } from "@/utils/parser";

export interface FloatingInfoBlockItem {
  type: string;
  title: string;
  content: string[];
}

type FloatingInfoBlockProps = {
  tBanner: (key: string) => string;
  setting: SiteSetting | null;
}

export default function FloatingInfoBlock({
  tBanner,
  setting,
}: FloatingInfoBlockProps) {
  const data = safeParseJson<FloatingInfoBlockItem[]>(setting?.value);
  const addressItem = data?.find((item) => item.type === InfoBlockTypeEnum.ADDRESS);
  const phoneItem = data?.find((item) => item.type === InfoBlockTypeEnum.PHONE);
  const hoursItem = data?.find((item) => item.type === InfoBlockTypeEnum.HOURS);

  return (
    <section className="relative z-20 w-full max-w-5xl mx-auto -mt-16 md:-mt-20 px-4 mb-16">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl shadow-[0_24px_50px_rgba(0,0,0,0.06)] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-100 dark:divide-zinc-800 p-6 md:p-8">

        {/* Col 1: Address */}
        <div className="flex flex-col items-center text-center p-4 md:p-6 gap-3">
          <div className="text-amber-500 mb-1">
            <MapPinIcon />
          </div>
          <h3 className="text-xs uppercase font-extrabold tracking-[0.2em] text-zinc-950 dark:text-white">
            {addressItem?.title || tBanner("addressTitle")}
          </h3>
          {addressItem?.content && addressItem.content.length > 0 ? (
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold max-w-[28ch] leading-relaxed uppercase flex flex-col gap-0.5">
              {addressItem.content.map((text, idx) => (
                <span key={idx}>{text}</span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold max-w-[28ch] leading-relaxed uppercase">
              {tBanner("addressVal")}
            </p>
          )}
        </div>

        {/* Col 2: Phone */}
        <div className="flex flex-col items-center text-center p-4 md:p-6 gap-3">
          <div className="text-amber-500 mb-1">
            <PhoneIcon />
          </div>
          <h3 className="text-xs uppercase font-extrabold tracking-[0.2em] text-zinc-950 dark:text-white">
            {phoneItem?.title || tBanner("phoneTitle")}
          </h3>
          {phoneItem?.content && phoneItem.content.length > 0 ? (
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold flex flex-col gap-1">
              {phoneItem.content.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="hover:text-amber-500 transition-colors"
                >
                  {phone}
                </a>
              ))}
            </div>
          ) : (
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold flex flex-col gap-1">
              <a href={`tel:${tBanner("phoneVal1")}`} className="hover:text-amber-500 transition-colors">
                {tBanner("phoneVal1")}
              </a>
            </div>
          )}
        </div>

        {/* Col 3: Hours */}
        <div className="flex flex-col items-center text-center p-4 md:p-6 gap-3">
          <div className="text-amber-500 mb-1">
            <ClockIcon />
          </div>
          <h3 className="text-xs uppercase font-extrabold tracking-[0.2em] text-zinc-950 dark:text-white">
            {hoursItem?.title || tBanner("hoursTitle")}
          </h3>
          {hoursItem?.content && hoursItem.content.length > 0 ? (
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold flex flex-col gap-0.5 uppercase">
              {hoursItem.content.map((time, idx) => (
                <span key={idx}>{time}</span>
              ))}
            </div>
          ) : (
            <div className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold flex flex-col gap-0.5 uppercase">
              <span>{tBanner("hoursVal1")}</span>
              <span>{tBanner("hoursVal2")}</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}