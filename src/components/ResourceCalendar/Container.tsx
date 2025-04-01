import React, { useState, useMemo, useRef } from "react"
import Component from "./Component"
import { 
  CalendarData, DragData, DropIndicator, Hour, 
  ResourceCalendarTimelineProps, TGroupedData 
} from "./types"
import { CalendarContext } from "../../context/CalendarContext"

const CalendarProvider = ({
  data,
  selectedDate,
  containerStyle = {},
  renderResource,
  renderEvent,
  onEventDragEnd,
  onDoubleClick,
  eventContainerStyle = {},
  startHour,
  endHour,
  dragConstraints = { minuteStep: 15, preventOverlap: true, showMinuteStepDivider: false },
  groupBy,
  slotWidth = 120,
}: ResourceCalendarTimelineProps) => {
  const [calendarData, setCalendarData] = useState(data)
  const [dropIndicator, setDropIndicator] = useState<DropIndicator>(null)
  const dragDataRef = useRef<DragData>(null)

  const startHourValue = typeof startHour === "number" ? startHour : 0
  const endHourValue = typeof endHour === "number" ? endHour : 23

  const hours: Hour[] = useMemo(
    () =>
      Array.from({ length: endHourValue - startHourValue + 1 }, (_, i) => {
        const hour = startHourValue + i
        return { hour, label: hour.toString().padStart(2, "0") + ":00" }
      }),
    [startHourValue, endHourValue]
  )

  const timelineWidth = useMemo(() => (endHourValue - startHourValue + 1) * slotWidth, [endHourValue, startHourValue, slotWidth])

  const groupedData: TGroupedData[] = useMemo(() => {
    if (!groupBy) return [{ group: null, resources: calendarData }]

    const groups = calendarData.reduce((acc, resourceData) => {
      const groupKey = resourceData.resource[groupBy] || "Other"
      if (!acc[groupKey]) acc[groupKey] = []
      acc[groupKey].push(resourceData)
      return acc
    }, {} as Record<string, CalendarData[]>)

    return Object.entries(groups).map(([group, resources]) => ({ group, resources }))
  }, [calendarData, groupBy])

  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (group: string) => {
    setCollapsedGroups(prev => ({ ...prev, [group]: !prev[group] }))
  }

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, destinationIndex: number) => {
    if (!onDoubleClick) return
    const boundingRect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - boundingRect.left
    const pixelsPerMinute = slotWidth / 60
    const minutesFromStart = clickX / pixelsPerMinute
    const totalMinutes = minutesFromStart + startHourValue * 60
    const newHour = Math.floor(totalMinutes / 60)
    const newMinutes = Math.floor(totalMinutes % 60)
    const clickedTime = new Date(selectedDate)
    clickedTime.setHours(newHour, newMinutes, 0, 0)
    onDoubleClick(clickedTime, calendarData[destinationIndex].resource)
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, resourceIndex: number, eventIndex: number) => {
    const eventItem = calendarData[resourceIndex].events[eventIndex]
    const duration = (new Date(eventItem.end).getTime() - new Date(eventItem.start).getTime()) / 60000
    const offsetX = e.nativeEvent.offsetX
    const dragData = { resourceIndex, eventIndex, duration, offsetX }
    dragDataRef.current = dragData
    e.dataTransfer.effectAllowed = "move"

    const emptyImg = document.createElement("img")
    emptyImg.src = "data:image/gifbase64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    emptyImg.style.position = "absolute"
    emptyImg.style.top = "-1000px"
    emptyImg.style.left = "-1000px"
    document.body.appendChild(emptyImg)
    e.dataTransfer.setDragImage(emptyImg, 0, 0)

    setTimeout(() => {
      document.body.removeChild(emptyImg)
    }, 0)

    e.dataTransfer.setData("text/plain", JSON.stringify(dragData))
    document.body.style.cursor = "move"
  }

  const handleDragEnd = () => {
    dragDataRef.current = null
    document.body.style.cursor = "default"
    setDropIndicator(null)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, destinationIndex: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    const boundingRect = e.currentTarget.getBoundingClientRect()
    const dropX = e.clientX - boundingRect.left
    const dragOffset = dragDataRef.current ? dragDataRef.current.offsetX : 0
    const effectiveDropX = dropX - dragOffset
    if (effectiveDropX < 0 || effectiveDropX > timelineWidth) {
      setDropIndicator(null)
      return
    }
    const pixelsPerMinute = slotWidth / 60
    const stepPx = (dragConstraints.minuteStep || 15) * pixelsPerMinute
    const roundedEffectiveDropX = Math.round(effectiveDropX / stepPx) * stepPx
    const minutesFromStart = roundedEffectiveDropX / pixelsPerMinute
    const totalMinutes = minutesFromStart + startHourValue * 60
    const newHour = Math.floor(totalMinutes / 60)
    const newMinutes = totalMinutes % 60
    const candidateStart = new Date(selectedDate)
    candidateStart.setHours(newHour, newMinutes, 0, 0)

    let valid = true
    if (dragConstraints.preventOverlap && dragDataRef.current) {
      const duration = dragDataRef.current.duration
      const candidateEnd = new Date(candidateStart)
      candidateEnd.setMinutes(candidateEnd.getMinutes() + duration)

      const eventsInRow = calendarData[destinationIndex].events
      const sourceIndex = dragDataRef.current.resourceIndex
      const eventIndex = dragDataRef.current.eventIndex
      const filteredEvents =
        sourceIndex === destinationIndex
          ? eventsInRow.filter((_, idx) => idx !== eventIndex)
          : eventsInRow

      valid = !filteredEvents.some((evt) => {
        const evtStart = new Date(evt.start)
        const evtEnd = new Date(evt.end)
        return candidateStart < evtEnd && candidateEnd > evtStart
      })
    }
    setDropIndicator({
      rowIndex: destinationIndex,
      x: roundedEffectiveDropX,
      time: candidateStart,
      valid,
    })
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const { clientX, clientY } = e
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      document.body.style.cursor = "default"
      setDropIndicator(null)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, destinationIndex: number) => {
    e.preventDefault()
    e.stopPropagation()

    if (!dropIndicator || !dropIndicator.valid) {
      handleDragEnd()
      return
    }

    let dragData
    try {
      dragData = JSON.parse(e.dataTransfer.getData("text/plain"))
    } catch {
      return
    }

    const sourceIndex = dragData.resourceIndex
    const eventIndex = dragData.eventIndex
    const candidateStart = dropIndicator.time

    setCalendarData((prevData) => {
      const newData = prevData.map((resource) => ({
        ...resource,
        events: resource.events.map((evt) => ({ ...evt })),
      }))
      const sourceEvents = newData[sourceIndex].events
      const eventItem = sourceEvents[eventIndex]
      const oldStart = new Date(eventItem.start)
      const oldEnd = new Date(eventItem.end)
      const duration = (oldEnd.getTime() - oldStart.getTime()) / 60000
      const newEnd = new Date(candidateStart)
      newEnd.setMinutes(newEnd.getMinutes() + duration)
      const updatedEvent = { ...eventItem, start: candidateStart, end: newEnd }
      if (sourceIndex === destinationIndex) {
        newData[sourceIndex].events = sourceEvents.map((evt, idx) =>
          idx === eventIndex ? updatedEvent : evt
        )
      } else {
        newData[sourceIndex].events = sourceEvents.filter((_, idx) => idx !== eventIndex)
        newData[destinationIndex].events.push(updatedEvent)
      }
      return newData
    })

    if (onEventDragEnd) {
      onEventDragEnd(
        candidateStart,
        calendarData[destinationIndex].resource,
        calendarData[sourceIndex].events[eventIndex]
      )
    }

    document.body.style.cursor = "default"
    dragDataRef.current = null
    setDropIndicator(null)
    e.dataTransfer.clearData()
  }

  const contextValue = {
    calendarData,
    collapsedGroups,
    containerStyle,
    dragConstraints,
    dragDataRef,
    dropIndicator,
    eventContainerStyle,
    groupBy: (groupBy as string),
    groupData: groupedData,
    hours,
    slotWidth,
    startHourValue,
    timelineWidth,
    toggleGroup,

    renderEvent,
    renderResource,

    onDoubleClick: handleDoubleClick,
    onDragEnd: handleDragEnd,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDragStart: handleDragStart,
    onDrop: handleDrop,
  }

  return (
    <CalendarContext.Provider value={contextValue}>
      <Component
        calendarData={calendarData}
        collapsedGroups={collapsedGroups}
        containerStyle={containerStyle}
        groupBy={groupBy as string}
        groupData={groupedData}
        hours={hours}
        slotWidth={slotWidth}
        timelineWidth={timelineWidth}
        toggleGroup={toggleGroup}

        renderResource={renderResource}
      />
    </CalendarContext.Provider>
  )
}

export default CalendarProvider