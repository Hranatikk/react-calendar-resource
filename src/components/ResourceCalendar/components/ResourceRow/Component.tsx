import React, { memo } from 'react';
import { CalendarData, Hour, TComponentProps } from '../../types';
import { Event } from "../Event"
import { GhostEvent } from "../GhostEvent"
import { TimeSlot } from "../TimeSlot"


type TEventProps = Omit<TComponentProps<typeof Event>, "eventIndex" | "event">
type TGhostEventProps = TComponentProps<typeof GhostEvent>
type TTimeSlotProps = Omit<TComponentProps<typeof TimeSlot>, "index" | "hoursLength">

type TProps = TEventProps & TGhostEventProps & TTimeSlotProps & {
  resourceData: CalendarData
  resourceIndex: number
  hours: Hour[]
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void
}

const Component = ({
  calendarData,
  eventContainerStyle = {},
  dragDataRef,
  dropIndicator,
  hours,
  startHourValue,
  slotWidth,
  resourceData,
  resourceIndex,
  renderEvent,
  renderInitialEvent,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onDoubleClick,
}: TProps) => {
  return (
    <div
      key={resourceIndex}
      className="rtc-row"
      onDragOver={(e) => onDragOver(e, resourceIndex)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, resourceIndex)}
      onDoubleClick={(e) => onDoubleClick(e, resourceIndex)}
    >
      {/* Time slots */}
      {hours.map((hourObj, index) => (
        <TimeSlot
          key={index}
          index={index}
          slotWidth={slotWidth}
          hoursLength={hours.length}
        />
      ))}

      {/* Ghost element during drag */}
      <GhostEvent
        calendarData={calendarData}
        eventContainerStyle={eventContainerStyle}
        dragDataRef={dragDataRef}
        dropIndicator={dropIndicator}
        slotWidth={slotWidth}
        resourceIndex={resourceIndex}
        renderEvent={renderEvent}
        renderInitialEvent={renderInitialEvent}
      />

      {/* Normal events */}
      {resourceData.events.map((evt, eventIndex) => (
        <Event
          key={eventIndex}
          resourceIndex={resourceIndex}
          eventIndex={eventIndex}
          event={evt}
          resourceData={resourceData}
          eventContainerStyle={eventContainerStyle}
          dragDataRef={dragDataRef}
          dropIndicator={dropIndicator}
          startHourValue={startHourValue}
          slotWidth={slotWidth}
          renderEvent={renderEvent}
          renderInitialEvent={renderInitialEvent}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
};

export default memo(Component);
