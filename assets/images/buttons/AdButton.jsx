import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={158}
    height={155}
    fill="none"
    viewBox="24 8 110 110"
    {...props}
  >
    <Rect width={109.301} height={107} x={24} y={8} fill="red" rx={15} />
    <Path fill="white" d="M107 62.5 64.25 87.182V37.818L107 62.5Z" />
  </Svg>
)
export default SvgComponent
