import React, { memo } from 'react';
import { CalendarData, CalendarEvent, DragData, DropIndicator, Resource } from '../../types';

type TComponentProps = {
  calendarData: CalendarData[]
  eventContainerStyle?: React.CSSProperties;
  
  dragDataRef: React.RefObject<DragData>
  dropIndicator: DropIndicator
  slotWidth: number
  resourceIndex: number

  renderEvent?: (event: CalendarEvent, resource: Resource) => React.ReactNode;
  renderInitialEvent: (event: CalendarEvent, resource: Resource) => React.ReactNode;
}

const Component = ({
  calendarData,
  eventContainerStyle = {},

  dragDataRef,
  dropIndicator,
  slotWidth,
  resourceIndex,

  renderEvent,
  renderInitialEvent,
}: TComponentProps) => {

  if (!dropIndicator || dropIndicator.rowIndex !== resourceIndex || !dragDataRef.current) {
    return null
  }

  return (
  <div
    className="rtc-ghost-event"
    style={{
      left: dropIndicator.x,
      width: dragDataRef.current.duration * (slotWidth / 60),
      backgroundColor: eventContainerStyle.backgroundColor || '#fff',
      ...eventContainerStyle,
    }}
  >
    {renderEvent
      ? renderEvent(
        calendarData[dragDataRef.current.resourceIndex].events[dragDataRef.current.eventIndex],
        calendarData[dragDataRef.current.resourceIndex].resource
      )
      : renderInitialEvent(calendarData[dragDataRef.current.resourceIndex].events[dragDataRef.current.eventIndex],
        calendarData[dragDataRef.current.resourceIndex].resource)}
  </div>
  );
};

export default memo(Component);
