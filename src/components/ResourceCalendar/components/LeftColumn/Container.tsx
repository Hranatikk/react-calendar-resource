import { useCalendarContext } from "../../../../context/CalendarContext"
import Component from "./Component"

const Container = () => {
  const {
    collapsedGroups,
    groupData,
    groupBy,
    toggleGroup,
    renderResource,
  } = useCalendarContext()

  return (
    <Component
      collapsedGroups={collapsedGroups}
      groupedData={groupData}
      groupBy={groupBy}
      toggleGroup={toggleGroup}
      renderResource={renderResource}
    />
  )
}

export default Container
