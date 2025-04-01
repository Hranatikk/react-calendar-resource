import { useCallback } from "react"
import { TComponentProps } from "../../types"
import Component from "./Component"
import type { CalendarEvent, Resource } from "../../types"
import { getPastelColor } from "../../helpers"
import { getEventStyles } from "./helpers/getEventStyles"
import { useCalendarContext } from "../../../../context/CalendarContext"

type TProps = Pick<
  TComponentProps<typeof Component>, 
  "event" | "eventIndex"| "resourceIndex" | "resourceData"
>

const Container = ({
  resourceIndex,
  eventIndex,
  resourceData,
  event,
}: TProps) => {
  const { 
    dragDataRef,
    dropIndicator,
    eventContainerStyle,
    slotWidth,
    startHourValue,

    renderEvent,
    onDragStart,
    onDragEnd,
   } = useCalendarContext()

  const { left, width, opacity } = getEventStyles(
    dragDataRef,
    dropIndicator,
    event,
    eventIndex,
    resourceIndex,
    slotWidth,
    startHourValue,
  )

  const renderInitialEvent = useCallback((evt: CalendarEvent, resource: Resource) => {
    const resourceColor = getPastelColor(resource.title ?? "")

    return (
      <>
        <div className="rtc-event-item">
          {evt.title}
        </div>

        <div className="rtc-event-background" style={{ backgroundColor: resourceColor }} />
      </>
    )
  }, [])

  return (
    <Component
      resourceIndex={resourceIndex}
      eventIndex={eventIndex}
      event={event}
      resourceData={resourceData}
      eventContainerStyle={eventContainerStyle}
      
      dragDataRef={dragDataRef}
      dropIndicator={dropIndicator}
      startHourValue={startHourValue}
      slotWidth={slotWidth}

      left={left}
      width={width}
      opacity={opacity}
    
      renderEvent={renderEvent}
      renderInitialEvent={renderInitialEvent}
    
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />

  )
}

export default Container
