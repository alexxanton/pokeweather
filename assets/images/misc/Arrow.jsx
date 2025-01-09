import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={69}
    height={69}
    fill="none"
    {...props}
  >
    <Path
      fill="#FEF7FF"
      stroke="#000"
      strokeWidth={2}
      d="M 7 37 H 54.7102 L 51 39 L 54 43 L 63.7929 34.5 L 54 26 L 51 30 L 54.7102 32.125 H 7 Z"
    />
  </Svg>
)
export default SvgComponent
