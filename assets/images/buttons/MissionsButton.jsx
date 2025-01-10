import * as React from "react"
import Svg, { Rect, Path, Circle } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={158}
    height={155}
    fill="none"
    viewBox="24 8 110 110"
    {...props}
  >
    <Rect
      width={109.301}
      height={107}
      x={24.215}
      y={8}
      fill="#663399"
      rx={15}
    />
    <Path
      fill="white"
      d="M79 75h-3.857a3 3 0 0 1-2.989-2.737l-3.867-44A3 3 0 0 1 71.275 25h15.45a3 3 0 0 1 2.988 3.263l-3.867 44A3 3 0 0 1 82.856 75H79Z"
    />
    <Circle
      cx={79}
      cy={93}
      r={10}
      fill="white"
      stroke="663399"
      strokeWidth={4}
    />
  </Svg>
)
export default SvgComponent
