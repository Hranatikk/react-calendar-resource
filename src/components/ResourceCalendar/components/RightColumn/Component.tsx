import React, { memo } from 'react';
import { HourSlot } from "../HourSlot"
import { ResourceRow } from "../ResourceRow"
import { TComponentProps } from '../../types';

type THourSlotProps = TComponentProps<typeof HourSlot>
type TResourceRowProps = TComponentProps<typeof ResourceRow>

type TProps = THourSlotProps & TResourceRowProps & {
  timelineWidth: number
}

type TOmitProps = Omit<TProps, "index" | "hoursLength" | "hour" | "resourceIndex" | "resourceData">

const Component = ({
  calendarData,
  timelineWidth,
  slotWidth,
  hours,
  eventContainerStyle,
  dragDataRef,
  dropIndicator,
  startHourValue,
  renderEvent,
  renderInitialEvent,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onDoubleClick,
}: TOmitProps) => {
  return (
    <div className="rtc-right-column">
      <div className="rtc-timeline" style={{ width: timelineWidth }}>

        {/* Header row */}
        <div className="rtc-time-header">
          {hours.map((hourObj, index) => (
            <HourSlot
              key={index}
              index={index}
              slotWidth={slotWidth}
              hoursLength={hours.length}
              hour={hourObj}
            />
          ))}
        </div>

        {/* Timeline rows */}
        {calendarData.map((resourceData, resourceIndex) => (
          <ResourceRow
            key={resourceIndex}
            resourceData={resourceData}
            resourceIndex={resourceIndex}
            calendarData={calendarData}
            eventContainerStyle={eventContainerStyle}
            dragDataRef={dragDataRef}
            dropIndicator={dropIndicator}
            hours={hours}
            startHourValue={startHourValue}
            slotWidth={slotWidth}
            renderEvent={renderEvent}
            renderInitialEvent={renderInitialEvent}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onDoubleClick={onDoubleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Component);
