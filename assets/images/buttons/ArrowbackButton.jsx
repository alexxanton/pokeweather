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
      d="m22.497 37.375 16.1 16.1L34.5 57.5l-23-23 23-23 4.097 4.025-16.1 16.1H57.5v5.75H22.497Z"
    />
  </Svg>
)
export default SvgComponent
