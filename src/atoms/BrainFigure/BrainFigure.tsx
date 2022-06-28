import * as React from "react"
import Box from "@mui/material/Box"
import { styled } from "@mui/system"
import { keyframes } from "@emotion/react"

const bounce = keyframes`
0% {
  transform: translateY(0);
  }
  50% {
      transform: translateY(10px);
  }
  100% {
      transform: translateY(0);
  }
  `

const shrink = keyframes`
  0% {
      transform: scaleX(1);
  }
  50% {
      transform: scaleX(1.2);
  }
  100% {
      transform: scaleX(1);
  }
  `

const BrainWrapper = styled(Box)`
  width: "auto";
  display: inline-block;

  & img {
    width: 100%;
    animation: ${bounce} 3s infinite;
    z-index: 999;
    position: relative;
  }
`
const BrainShadow = styled("div")`
  margin: auto;
  margin-top: 1em;
  opacity: 0.3;
  width: 80%;
  height: 30px;
  background: #ccc;
  border-radius: 50%;
  animation: ${shrink} 3s infinite;
  z-index: -1;
`

export const BrainFigure = ({ maxWidth }: { maxWidth?: number }) => {
  return (
    <BrainWrapper sx={{ my: 1, maxWidth: maxWidth || 150 }}>
      <img alt="brain" src="./assets/brain.svg" />
      <BrainShadow />
    </BrainWrapper>
  )
}
