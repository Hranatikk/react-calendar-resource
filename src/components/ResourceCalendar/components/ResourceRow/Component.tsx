import React, { memo } from "react"
import { CalendarData, Hour } from "../../types"
import { Event } from "../Event"
import { GhostEvent } from "../GhostEvent"
import { TimeSlot } from "../TimeSlot"

type TProps = {
  resourceData: CalendarData
  resourceIndex: number
  hours: Hour[]
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void
}

const Component = ({
  hours,
  resourceData,
  resourceIndex,
  onDragOver,
  onDragLeave,
  onDrop,
  onDoubleClick,
}: TProps) => {
  return (
    <div
      className="rtc-row"
      onDragOver={(e) => onDragOver(e, resourceIndex)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, resourceIndex)}
      onDoubleClick={(e) => onDoubleClick(e, resourceIndex)}
    >
      {/* Time slots */}
      {hours.map((hourObj, index) => <TimeSlot key={index} index={index} />)}

      {/* Ghost element during drag */}
      <GhostEvent resourceIndex={resourceIndex} />

      {/* Normal events */}
      {resourceData.events.map((evt, eventIndex) => (
        <Event
          key={eventIndex}
          resourceIndex={resourceIndex}
          eventIndex={eventIndex}
          event={evt}
          resourceData={resourceData}
        />
      ))}
    </div>
  )
}

export default memo(Component)
