import * as React from "react"
import Svg, { Path, Circle, Text } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 144.083 180"
      {...props}
    >
      <Path d="M121.928 62.099L73.479 24.514 25.028 62.099l3.678 4.74 9.305-7.217v61.981h16.605V110.08h37.727v11.523h16.605V59.622l9.303 7.217 3.677-4.74zm-18.98 53.505h-4.605V104.08H48.616v11.523H44.01V59.279h58.938v56.325z" />
      <Circle cx={73.479} cy={81.977} r={10.338} />
      <Path d="M40.542 26.42l5.182 5.183-4.242 4.241-5.182-5.183zm75.721-1.436l5.181 5.183-4.242 4.242-5.182-5.183zM31.811 47.196l-5.181-5.182 4.242-4.242 5.181 5.182zm-4.474-24.799l4.242 4.242-5.183 5.182-4.242-4.242zm76.489 6.613l4.241 4.242-5.182 5.182-4.242-4.242zm11.781 9.76l4.242 4.242-5.182 5.183-4.242-4.242z" />
      <Text
        y={159}
        fontSize={5}
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      >
        {"Created by Chanut is Industries"}
      </Text>
      <Text
        y={164}
        fontSize={5}
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      >
        {"from the Noun Project"}
      </Text>
    </Svg>
  )
}

export default SvgComponent