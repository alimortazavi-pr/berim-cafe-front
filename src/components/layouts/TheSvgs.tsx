import { FC } from "react";

export const MenuIconSvg: FC<any> = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size || width || 24}
    height={size || height || 24}
    fill={filled ? fill : "none"}
    {...props}
  >
    <path
      d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z"
      fillRule="nonzero"
    />
  </svg>
);
