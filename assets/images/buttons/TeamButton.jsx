import * as React from "react"
import Svg, { Rect, Circle, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={158}
    height={155}
    fill="none"
    viewBox="24 8 110 110"
    {...props}
  >
    <Rect width={109.301} height={107} x={24.108} y={8} fill="#FF1C1C" rx={15} />
    <Circle cx={78.5} cy={61.5} r={39.5} stroke="white" strokeWidth={8} />
    <Path stroke="white" strokeWidth={8} d="M40 62h78" />
    <Circle
      cx={79}
      cy={62}
      r={13}
      fill="#FF1C1C"
      stroke="white"
      strokeWidth={8}
    />
  </Svg>
)
export default SvgComponent
