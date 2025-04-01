import { useCallback, useContext } from "react"
import { TComponentProps } from "../../types"
import Component from "./Component"
import type { CalendarEvent, Resource } from "../../types"
import { getPastelColor } from "../../helpers"
import { useCalendarContext } from "../../../../context/CalendarContext"

type TProps = Pick<TComponentProps<typeof Component>, "resourceIndex">

const Container = ({ resourceIndex }: TProps) => {
  const {
    calendarData,
    eventContainerStyle,
    dragDataRef,
    dropIndicator,
    slotWidth,
    renderEvent,
  } = useCalendarContext()

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
      calendarData={calendarData}
      eventContainerStyle={eventContainerStyle}
      dragDataRef={dragDataRef}
      dropIndicator={dropIndicator}
      resourceIndex={resourceIndex}
      slotWidth={slotWidth}
      renderEvent={renderEvent}
      renderInitialEvent={renderInitialEvent}
    />
  )
}

export default Container
