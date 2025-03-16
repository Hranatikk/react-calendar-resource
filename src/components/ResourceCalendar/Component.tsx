import React, { memo } from 'react';
import { CalendarData, TComponentProps, TGroupedData } from './types';
import { LeftColumn, RightColumn } from "./components"
import './styles.css';

type TLeftColumnProps = TComponentProps<typeof LeftColumn>
type TRightColumnProps = TComponentProps<typeof RightColumn>

type TProps = Omit<TLeftColumnProps & TRightColumnProps, "calendarData" | "groupData"> & {
  calendarData: CalendarData[]
  groupData: TGroupedData[]
  containerStyle?: React.CSSProperties
}

const Component = ({
  calendarData,
  containerStyle = {},
  eventContainerStyle = {},

  groupBy,
  groupData,
  collapsedGroups,
  toggleGroup,

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
      <LeftColumn
        calendarData={groupData}
        groupBy={groupBy}
        collapsedGroups={collapsedGroups}
        toggleGroup={toggleGroup}
        renderResource={renderResource}
      />

      {/* Right column */}
      <RightColumn
        collapsedGroups={collapsedGroups}
        calendarData={calendarData}
        groupData={groupData}
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
