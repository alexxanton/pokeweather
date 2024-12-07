import * as React from "react"
import Svg, { Rect, Circle, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={324}
    height={154}
    fill="none"
    viewBox="24 8 275.517 106"
    {...props}
  >
    <Rect width={275.517} height={106} x={24} y={8} fill="#FF1C1C" rx={15} />
    <Circle
      cx={261}
      cy={64}
      r={23}
      fill="#FF1C1C"
      stroke="white"
      strokeWidth={8}
    />
    <Path
      fill="white"
      stroke="#FF1C1C"
      strokeWidth={8}
      d="M253 66v4h16V27h-16v39Z"
    />
    <Path
      fill="white"
      d="m39.661 72.975 1.36-7.92c2.934.72 5.587 1.08 7.96 1.08 1.2 0 2.254-.014 3.16-.04a27.98 27.98 0 0 0 2.48-.24v-2.4l-4.32-.36c-1.946-.187-3.573-.507-4.88-.96-1.306-.454-2.36-1.067-3.16-1.84a7.123 7.123 0 0 1-1.68-2.84c-.32-1.12-.48-2.427-.48-3.92 0-2.054.214-3.76.64-5.12.427-1.387 1.107-2.494 2.04-3.32.934-.854 2.134-1.454 3.6-1.8 1.494-.347 3.307-.52 5.44-.52 4.24 0 8.08.4 11.52 1.2l-1.2 7.68c-2.986-.48-5.373-.72-7.16-.72-1.786 0-3.306.08-4.56.24v2.36l3.44.32c2.107.213 3.867.573 5.28 1.08 1.414.48 2.547 1.12 3.4 1.92a6.4 6.4 0 0 1 1.84 2.84c.374 1.093.56 2.346.56 3.76 0 2.026-.266 3.733-.8 5.12-.533 1.386-1.173 2.44-1.92 3.16-.613.586-1.373 1.053-2.28 1.4-.906.32-1.866.56-2.88.72-1.013.16-2.04.253-3.08.28-1.013.053-1.933.08-2.76.08-2.08 0-4.08-.107-6-.32a51.432 51.432 0 0 1-5.56-.92Zm38.496.52h-9.6v-22.8l9.6-1.2v24Zm-10.12-28.52c0-.72.08-1.32.24-1.8.16-.507.44-.907.84-1.2.4-.32.947-.547 1.64-.68.693-.134 1.573-.2 2.64-.2 1.066 0 1.933.066 2.6.2.693.133 1.24.36 1.64.68.4.293.68.693.84 1.2.16.48.24 1.08.24 1.8s-.08 1.32-.24 1.8c-.16.48-.44.88-.84 1.2-.4.293-.947.506-1.64.64-.667.106-1.534.16-2.6.16-.773 0-1.494-.027-2.16-.08-.64-.054-1.2-.2-1.68-.44a2.766 2.766 0 0 1-1.12-1.16c-.267-.507-.4-1.214-.4-2.12Zm13.654 35 1.24-7.16c2.747.933 5.933 1.4 9.56 1.4.533 0 .987-.014 1.36-.04.4 0 .707-.014.92-.04v-1.68c-1.44 0-2.613-.027-3.52-.08-.907-.08-1.587-.187-2.04-.32-.907-.24-1.48-.48-1.72-.72-.293-.24-.467-.427-.52-.56-.053-.16-.08-.387-.08-.68l1.44-4.12c-2.293-.427-4.04-1.294-5.24-2.6-1.2-1.334-1.8-3.4-1.8-6.2 0-2.774.947-4.867 2.84-6.28 1.893-1.414 4.96-2.12 9.2-2.12.773 0 1.493.026 2.16.08.667.026 1.307.093 1.92.2l4.2-3.2 5.04 4.84-2.76 3.2c.427 1.093.64 2.533.64 4.32 0 1.253-.147 2.346-.44 3.28a5.32 5.32 0 0 1-1.48 2.36c-.667.64-1.547 1.146-2.64 1.52-1.093.346-2.453.586-4.08.72l-.2 1.16c1.733.106 3.2.28 4.4.52 1.2.213 2.173.56 2.92 1.04.747.48 1.28 1.093 1.6 1.84.347.746.52 1.693.52 2.84 0 1.92-.387 3.413-1.16 4.48-.773 1.066-1.787 1.853-3.04 2.36-1.227.506-2.627.813-4.2.92a67.98 67.98 0 0 1-4.68.16c-3.173 0-6.627-.48-10.36-1.44Zm8.64-22.8v3.12h1.48c1.147 0 1.987-.12 2.52-.36.533-.24.8-.787.8-1.64v-3.12h-1.52c-1.147 0-1.987.12-2.52.36-.507.24-.76.786-.76 1.64Zm18.343-7.68h4.8l2.4 2.4c2.96-2.08 6.16-3.12 9.6-3.12 2.267 0 4.027.493 5.28 1.48 1.28.96 1.92 2.306 1.92 4.04v19.2h-9.6v-16.8h-1.48c-1.093 0-1.92.12-2.48.36-.56.213-.84.706-.84 1.48v14.96h-9.6v-24Zm39.587 12c0-4.294 1-7.48 3-9.56 2-2.107 5.24-3.16 9.72-3.16s7.72 1.053 9.72 3.16c2 2.08 3 5.266 3 9.56 0 4.293-1 7.493-3 9.6-2 2.08-5.24 3.12-9.72 3.12-4.373 0-7.587-1.027-9.64-3.08-2.053-2.054-3.08-5.267-3.08-9.64Zm10.32-3.68v9.4h1.48c1.173 0 2.013-.12 2.52-.36.533-.24.8-.8.8-1.68v-9.4h-1.48c-1.173 0-2.027.12-2.56.36-.507.24-.76.8-.76 1.68Zm18.48-8.32h9.6v17.72h1.48c1.174 0 2.014-.12 2.52-.36.534-.24.8-.8.8-1.68v-15.68h9.6v24h-4.8l-2.8-2.72c-1.92 2.293-4.653 3.44-8.2 3.44-2.853 0-4.933-.6-6.24-1.8-1.306-1.227-1.96-3.267-1.96-6.12v-16.8Zm29.761 6.2h-2.4v-6.2h2.4v-3.84l9.6-2.4v6.24h3.32v6.2h-3.32v10.92c.4.08.84.16 1.32.24.48.053.986.093 1.52.12l-.44 7.04c-4.374 0-7.227-.24-8.56-.72-1.12-.4-1.974-.907-2.56-1.52-.587-.64-.88-1.574-.88-2.8v-13.28Z"
    />
  </Svg>
)
export default SvgComponent
