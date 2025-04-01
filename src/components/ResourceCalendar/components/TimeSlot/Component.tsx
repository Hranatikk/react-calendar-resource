import { memo } from "react"

type TComponentProps = {
  index: number
  slotWidth: number
  hoursLength: number
  stepData: {
    left: number
  }[]
}

const Component = ({
  index,
  slotWidth,
  hoursLength,
  stepData,
}: TComponentProps) => {
  return (
    <div
      key={index}
    className={`rtc-time-slot ${index % 2 == 0 && "rtc-time-slot-unavailable"}`}
      style={{
        left: index * slotWidth,
        width: slotWidth,
        borderRight: index === hoursLength - 1 ? "none" : undefined,
      }}
    >
      {stepData.map((step, stepIndex) => (
        <div key={`${stepIndex}-${index}`} className="rtc-hour-step-divider" style={{ left: step.left }} />
      ))}
    </div>
  )
}

export default memo(Component)
