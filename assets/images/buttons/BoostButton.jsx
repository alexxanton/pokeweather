import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={220}
    height={155}
    fill="none"
    viewBox="24 8 172 107"
    {...props}
  >
    <Rect width={172} height={107} x={24} y={8} fill="#A334D7" rx={15} />
    <G fill="#FFE0E0" clipPath="url(#a)">
      <Path d="M102.281 100a3.734 3.734 0 0 1-3.51-2.406l-5.991-15.58a2.416 2.416 0 0 0-1.383-1.383l-15.585-5.996a3.76 3.76 0 0 1 0-7.02l15.581-5.992a2.415 2.415 0 0 0 1.382-1.382l5.996-15.585a3.758 3.758 0 0 1 5.64-1.751 3.754 3.754 0 0 1 1.38 1.751l5.992 15.58a2.41 2.41 0 0 0 1.382 1.383l15.49 5.96a3.83 3.83 0 0 1 2.501 3.624 3.73 3.73 0 0 1-2.406 3.432l-15.58 5.992a2.418 2.418 0 0 0-1.383 1.382l-5.996 15.585a3.732 3.732 0 0 1-3.51 2.406ZM84.234 49.469a2.206 2.206 0 0 1-2.058-1.414l-2.536-6.593a1.097 1.097 0 0 0-.633-.633l-6.593-2.536a2.206 2.206 0 0 1 0-4.117l6.593-2.536a1.099 1.099 0 0 0 .633-.633l2.513-6.535a2.256 2.256 0 0 1 1.815-1.456 2.206 2.206 0 0 1 2.325 1.398l2.536 6.593a1.1 1.1 0 0 0 .633.633l6.593 2.535a2.207 2.207 0 0 1 0 4.118l-6.593 2.536a1.095 1.095 0 0 0-.633.633l-2.536 6.593a2.206 2.206 0 0 1-2.059 1.414ZM131.156 61.5a2.406 2.406 0 0 1-2.245-1.543l-3.435-8.929a1.198 1.198 0 0 0-.692-.691l-8.928-3.435a2.405 2.405 0 0 1 0-4.491l8.928-3.435a1.206 1.206 0 0 0 .692-.692l3.409-8.865a2.475 2.475 0 0 1 1.981-1.59 2.126 2.126 0 0 1 1.511.376c.439.312.746.777.872 1.305l3.435 8.928a1.198 1.198 0 0 0 .692.692l8.928 3.435a2.404 2.404 0 0 1 1.119 3.607c-.275.4-.665.709-1.119.883l-8.928 3.435a1.21 1.21 0 0 0-.692.692l-3.435 8.928a2.232 2.232 0 0 1-.872 1.305 2.126 2.126 0 0 1-1.511.376l.29-.291Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M64 24h128v128H64z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
