import React, { memo } from 'react';
import { CalendarData, CalendarEvent, DragData, DropIndicator, Resource } from '../../types';

type TComponentProps = {
  resourceIndex: number
  eventIndex: number
  event: CalendarEvent
  resourceData: CalendarData
  eventContainerStyle?: React.CSSProperties;
  
  dragDataRef: React.RefObject<DragData>
  dropIndicator: DropIndicator
  startHourValue: number
  slotWidth: number
  left: number
  width: number
  opacity: number

  renderEvent?: (event: CalendarEvent, resource: Resource) => React.ReactNode;
  renderInitialEvent: (event: CalendarEvent, resource: Resource) => React.ReactNode;

  onDragStart: (e: React.DragEvent<HTMLDivElement>, resourceIndex: number, eventIndex: number) => void
  onDragEnd: () => void
}

const Component = ({
  resourceIndex,
  eventIndex,
  event,
  resourceData,
  eventContainerStyle = {},
  left,
  width,
  opacity,

  renderEvent,
  renderInitialEvent,

  onDragStart,
  onDragEnd,
}: TComponentProps) => {
  return (
    <div
      className="rtc-event"
      draggable
      onDragStart={(e) => onDragStart(e, resourceIndex, eventIndex)}
      onDragEnd={onDragEnd}
      style={{
        left,
        width,
        opacity,
        backgroundColor: eventContainerStyle.backgroundColor || '#fff',
        ...eventContainerStyle,
      }}
    >
      {renderEvent ? renderEvent(event, resourceData.resource) : renderInitialEvent(event, resourceData.resource)}
    </div>

  );
};

export default memo(Component);
