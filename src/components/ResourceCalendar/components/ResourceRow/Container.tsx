import { useMemo } from "react"
import { TComponentProps, TGroupedData } from "../../types"
import Component from "./Component"
import { useCalendarContext } from "../../../../context/CalendarContext"

type TProps = Pick<
  TComponentProps<typeof Component>,
  "resourceData" | "resourceIndex"
> & {
  groupData: TGroupedData
}

const Container = ({ resourceData, resourceIndex, groupData }: TProps) => {
  const {
    calendarData,
    hours,
    onDragOver,
    onDragLeave,
    onDrop,
    onDoubleClick
  } = useCalendarContext()

  const index = useMemo(() => calendarData.findIndex((i) =>
    i.resource.id === groupData.resources[resourceIndex].resource.id
  ), [calendarData, groupData, resourceIndex])

  return (
    <Component
      hours={hours}
      resourceData={resourceData}
      resourceIndex={index}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDoubleClick={onDoubleClick}
    />
  )
}

export default Container
