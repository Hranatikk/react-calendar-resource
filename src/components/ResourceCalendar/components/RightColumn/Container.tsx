import { useCalendarContext } from "../../../../context/CalendarContext"
import Component from "./Component"

const Container = () => {
  const { groupData, timelineWidth, slotWidth, hours, collapsedGroups } = useCalendarContext()

  return (
    <Component
      groupData={groupData}
      timelineWidth={timelineWidth}
      slotWidth={slotWidth}
      hours={hours}
      collapsedGroups={collapsedGroups}
    />
  )
}

export default Container
