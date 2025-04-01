import { memo } from "react"
import { Hour } from "../../types"

type TComponentProps = {
  slotWidth: number
  left: number
  hour: Hour
  borderRight: "none" | undefined
}

const Component = ({
  slotWidth,
  left,
  borderRight,
  hour,
}: TComponentProps) => {
  return (
    <div
      className="rtc-time-slot"
      style={{
        borderRight,
        left,
        width: slotWidth,
      }}
    >
      {hour.label}
    </div>
  )
}

export default memo(Component)
