import React from "react";

const DEFAULT_WAI_ARIA_ATTRIBUTE = {
  "aria-busy": true,
  role: "progressbar",
};

type Style = {
  [key: string]: string;
};

interface BaseProps {
  height?: string | number;
  width?: string | number;
  color?: string;
  ariaLabel?: string;
  wrapperStyle?: Style;
  wrapperClass?: string;
  visible?: boolean;
}

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

interface LoaderProps extends Omit<BaseProps, "color"> {
  borderColor?: string;
  barColor?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  visible = true,
  height = "80",
  width = "80",
  wrapperClass = "m-auto",
  wrapperStyle = {},
  ariaLabel = "progress-bar-loading",
  borderColor = "#F4442E",
  barColor = "#51E5FF",
}) => {
  return !visible ? null : (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <svg
        width={width}
        height={height}
        xmlns={SVG_NAMESPACE}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className={wrapperClass}
        style={wrapperStyle}
        aria-label={ariaLabel}
        data-testid="progress-bar-svg"
        {...DEFAULT_WAI_ARIA_ATTRIBUTE}
      >
        <defs>
          <clipPath
            x="0"
            y="0"
            width="100"
            height="100"
            id="lds-progress-cpid-5009611b8a418"
          >
            <rect x="0" y="0" width="66.6667" height="100">
              <animate
                attributeName="width"
                calcMode="linear"
                values="0;100;100"
                keyTimes="0;0.5;1"
                dur="1"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
              <animate
                attributeName="x"
                calcMode="linear"
                values="0;0;100"
                keyTimes="0;0.5;1"
                dur="1"
                begin="0s"
                repeatCount="indefinite"
              ></animate>
            </rect>
          </clipPath>
        </defs>
        <path
          fill="none"
          strokeWidth="2.7928"
          d="M82,63H18c-7.2,0-13-5.8-13-13v0c0-7.2,5.8-13,13-13h64c7.2,0,13,5.8,13,13v0C95,57.2,89.2,63,82,63z"
          stroke={borderColor}
        ></path>
        <path
          d="M81.3,58.7H18.7c-4.8,0-8.7-3.9-8.7-8.7v0c0-4.8,3.9-8.7,8.7-8.7h62.7c4.8,0,8.7,3.9,8.7,8.7v0C90,54.8,86.1,58.7,81.3,58.7z"
          fill={barColor}
          clipPath="url(#lds-progress-cpid-5009611b8a418)"
        ></path>
      </svg>
    </div>
  );
};

export default Loader;
