import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={220}
    height={155}
    fill="none"
    viewBox="24 8 172 107"
    {...props}
  >
    <Rect width={172} height={107} x={24} y={8} fill="#FF1C1C" rx={15} />
    <Path
      fill="white"
      stroke="#FF1C1C"
      strokeWidth={4}
      d="m119.283 51.852 17.462-8.005-12.077 17.768-.65.957.505 1.04 8.532 17.574-19.849-7.135-.923-.332-.827.526-22.639 14.4 5.67-17.974.513-1.624-1.522-.765-10.836-5.448 10.762-4.87 1.176-.531V40.412l7.303 8.26 2.232 2.524 1.147-3.168 4.579-12.644 6.777 15.454.817 1.862 1.848-.848Z"
    />
    <Path
      stroke="white"
      strokeWidth={4}
      d="m111.495 29.197-2.009-4.581-1.703 4.703-5.135 14.18-8.57-9.693-3.498-3.956V54.852l-13.404 6.065-3.818 1.727 3.744 1.882 13.058 6.565-6.809 21.587-1.652 5.236 4.633-2.947 26.443-16.82 23.546 8.463 4.62 1.661-2.144-4.416-10.17-20.948 15.457-22.743 4.031-5.93-6.518 2.988-22.132 10.147-7.97-18.172Z"
    />
  </Svg>
)
export default SvgComponent
