import * as React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function MapPinIcon({ size = "1.75rem", className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: size, height: size }}
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

export function PhoneIcon({ size = "1.75rem", className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: size, height: size }}
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.622c0-1.272.78-2.319 1.938-2.67 1.15-.35 2.4-.1 3.248.672l1.637 1.513c.636.587.828 1.503.483 2.274l-.79 1.777c-.33.742-.15 1.62.454 2.186l3.41 3.142a2.182 2.182 0 0 0 2.122.421l1.792-.706c.76-.3 1.666-.085 2.22.524l1.652 1.815c.677.744.75 1.84.174 2.58a12.35 12.35 0 0 1-5.467 4.093c-1.127.394-2.365.19-3.21-.607l-9.03-8.312A9.09 9.09 0 0 1 2.25 6.622Z"
      />
    </svg>
  );
}

export function ClockIcon({ size = "1.75rem", className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{ width: size, height: size }}
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
