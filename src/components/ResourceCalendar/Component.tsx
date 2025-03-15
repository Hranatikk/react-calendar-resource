import React, { memo } from 'react';
import { TComponentProps } from './types';
import { LeftColumn, RightColumn } from "./components"
import './styles.css';

type TLeftColumnProps = TComponentProps<typeof LeftColumn>
type TRightColumnProps = TComponentProps<typeof RightColumn>

type TProps = TLeftColumnProps & TRightColumnProps & {
  containerStyle?: React.CSSProperties
}

const Component = ({
  calendarData,
  containerStyle = {},
  eventContainerStyle = {},

  dragDataRef,
  dropIndicator,
  hours,
  startHourValue,
  slotWidth,
  timelineWidth,

  renderResource,
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
    <div className="rtc-container" style={containerStyle}>
      {/* Left column */}
      <LeftColumn calendarData={calendarData} renderResource={renderResource} />

      {/* Right column */}
      <RightColumn
        calendarData={calendarData}
        timelineWidth={timelineWidth}
        slotWidth={slotWidth}
        hours={hours}
        eventContainerStyle={eventContainerStyle}
        dragDataRef={dragDataRef}
        dropIndicator={dropIndicator}
        startHourValue={startHourValue}
        renderEvent={renderEvent}
        renderInitialEvent={renderInitialEvent}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onDoubleClick={onDoubleClick}
      />
    </div>
  );
};

export default memo(Component);
