import { memo } from 'react';
import { HourSlot } from "../HourSlot";
import { ResourceRow } from "../ResourceRow";
import { TComponentProps, TGroupedData } from '../../types';

type THourSlotProps = TComponentProps<typeof HourSlot>;
type TResourceRowProps = TComponentProps<typeof ResourceRow>;

type TProps = Omit<THourSlotProps & TResourceRowProps, "groupData"> & {
  groupData: TGroupedData[]
  timelineWidth: number;
  collapsedGroups: Record<string, boolean>;
};

type TOmitProps = Omit<TProps, "index" | "hoursLength" | "hour" | "resourceIndex" | "resourceData">;

const Component = ({
  calendarData,
  groupData,
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
  collapsedGroups,
}: TOmitProps & { collapsedGroups: Record<string, boolean> }) => {
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

        {groupData.map((item, groupIndex) => {
          const groupKey = item.group || 'Other';
          const isCollapsed = collapsedGroups[groupKey];

          if (isCollapsed) {
            return (
              <div key={groupIndex} className="rtc-row-placeholder" />
            );
          }

          else {
            return (
              <>
                {item.group && (
                  <div key={groupIndex} className="rtc-row-placeholder" />
                )}

                {item.resources.map((resourceData, resourceIndex) => (
                  <ResourceRow
                    key={`${groupIndex}-${resourceIndex}`}
                    resourceData={resourceData}
                    resourceIndex={resourceIndex}
                    calendarData={calendarData}
                    groupData={item}
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
            </>
            )
          }
        })}
      </div>
    </div>
  );
};

export default memo(Component);
