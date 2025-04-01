import React,{ memo } from "react"
import { HourSlot } from "../HourSlot"
import { ResourceRow } from "../ResourceRow"
import { TGroupedData, Hour } from "../../types"

type TProps = {
  collapsedGroups: Record<string, boolean>
  groupData: TGroupedData[]
  timelineWidth: number
  slotWidth: number
  hours: Hour[]
}

const Component = ({
  collapsedGroups,
  groupData,
  timelineWidth,
  slotWidth,
  hours,
}: TProps) => {
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
          const groupKey = item.group || "Other"
          const isCollapsed = collapsedGroups[groupKey]

          if (isCollapsed) {
            return (
              <div key={groupIndex} className="rtc-row-placeholder" />
            )
          }

          else {
            return (
              <React.Fragment key={groupIndex}>
                {item.group && (
                  <div className="rtc-row-placeholder" />
                )}

                {item.resources.map((resourceData, resourceIndex) => (
                  <ResourceRow
                    key={`${groupIndex}-${resourceIndex}`}
                    resourceData={resourceData}
                    resourceIndex={resourceIndex}
                    groupData={item}
                  />
                ))}
            </React.Fragment>
            )
          }
        })}
      </div>
    </div>
  )
}

export default memo(Component)
