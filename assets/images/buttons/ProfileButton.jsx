import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={71}
    height={71}
    fill="none"
    {...props}
  >
    <Circle
      cx={35.5}
      cy={35.5}
      r={31.5}
      fill="red"
    />
    <Path fill="white" d="M57 63H14s9.626-23 21.5-23S57 63 57 63Z" />
    <Circle
      cx={35.5}
      cy={35.5}
      r={31.5}
      fill="none"
      stroke="black"
      strokeWidth={8}
    />
    <Circle cx={36} cy={24} r={11} fill="white" />
  </Svg>
)
export default SvgComponent
