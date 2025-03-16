import React, { memo } from 'react';
import { TGroupedData, Resource } from '../../types';

type TComponentProps = {
  calendarData: TGroupedData[];
  groupBy?: string;
  renderResource?: (resource: Resource) => React.ReactNode;
  collapsedGroups: Record<string, boolean>;
  toggleGroup: (group: string) => void;
};

const Component = ({
  calendarData,
  groupBy,
  renderResource,
  collapsedGroups,
  toggleGroup,
}: TComponentProps) => {
  return (
    <div className="rtc-left-column">
      <div className="rtc-left-header">Resource</div>

      {calendarData.map((groupData, groupIndex) => {
        const groupKey = groupData.group || 'Other';
        const isCollapsed = collapsedGroups[groupKey];

        return (
          <React.Fragment key={groupIndex}>
            {groupBy && groupData.group && (
              <div className="rtc-group-header" onClick={() => toggleGroup(groupKey)}>
                <span className="rtc-group-toggle">{isCollapsed ? '▸' : '▾'}</span>
                {groupKey}
              </div>
            )}

            {isCollapsed ? (
              <div className="rtc-user-placeholder-collapsed" />
            ) : (
              groupData.resources.map((resourceData, index) => (
                <div key={index} className="rtc-user">
                  {renderResource ? renderResource(resourceData.resource) : resourceData.resource.title}
                </div>
              ))
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default memo(Component);
