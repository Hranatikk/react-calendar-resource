import React, { memo } from "react"
import { LeftColumn, RightColumn } from "./components"
import "./styles.css"

type TProps = {
  containerStyle?: React.CSSProperties
}

const Component = ({
  containerStyle = {},
}: TProps) => {
  return (
    <div className="rtc-container" style={containerStyle}>
      {/* Left column */}
      <LeftColumn />

      {/* Right column */}
      <RightColumn />
    </div>
  )
}

export default memo(Component)
