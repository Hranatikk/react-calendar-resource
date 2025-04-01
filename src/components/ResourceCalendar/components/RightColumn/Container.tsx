import { useCalendarContext } from "../../../../context/CalendarContext"
import Component from "./Component"

const Container = () => {
  const { groupData, timelineWidth, hours, collapsedGroups } = useCalendarContext()

  return (
    <Component
      groupData={groupData}
      timelineWidth={timelineWidth}
      hours={hours}
      collapsedGroups={collapsedGroups}
    />
  )
}

export default Container
