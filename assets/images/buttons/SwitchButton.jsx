import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg width={608} height={741} fill="none" viewBox="0 0 108 108" {...props}>
    <G filter="url(#filter0_d_2_131)">
      <Path
        fill="#FF1C1C"
        d="M32.255 21.071c0-4.455 5.386-6.685 8.535-3.536L73.974 50.72a5 5 0 0 1 0 7.071L40.79 90.974c-3.15 3.15-8.535.92-8.535-3.535V21.07Z"
      />
      <Path
        stroke="#000"
        strokeWidth={8}
        d="M43.619 14.707c-5.67-5.67-15.364-1.654-15.364 6.364V87.44c0 8.018 9.694 12.033 15.364 6.364l33.183-33.184a9 9 0 0 0 0-12.728L43.62 14.707Z"
      />
    </G>
  </Svg>
)
export default SvgComponent
