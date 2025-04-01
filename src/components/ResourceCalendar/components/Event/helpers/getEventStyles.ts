import type { DragData, DropIndicator, CalendarEvent } from "../../../types"

type TResult = {
  opacity: number
  left: number
  width: number
}

export const getEventStyles = (
  dragDataRef: React.RefObject<DragData>,
  dropIndicator: DropIndicator,
  event: CalendarEvent,
  eventIndex: number,
  resourceIndex: number,
  slotWidth: number,
  startHourValue: number,
): TResult => {
  let opacity = 1

  if (
    dragDataRef.current &&
    dragDataRef.current.resourceIndex === resourceIndex &&
    dragDataRef.current.eventIndex === eventIndex &&
    dropIndicator
  ) {
    opacity = 0.3
  }
  const eventStart = new Date(event.start)
  const eventEnd = new Date(event.end)
  const startMinutes =
    eventStart.getHours() * 60 + eventStart.getMinutes() - startHourValue * 60
  const endMinutes =
    eventEnd.getHours() * 60 + eventEnd.getMinutes() - startHourValue * 60
  const pixelsPerMinute = slotWidth / 60
  const left = startMinutes * pixelsPerMinute
  const width = (endMinutes - startMinutes) * pixelsPerMinute

  return { opacity, left, width }
}