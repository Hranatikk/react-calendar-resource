import React, { memo } from 'react';
import { CalendarData, Resource } from '../../types';

type TComponentProps = {
  calendarData: CalendarData[]
  renderResource?: (resource: Resource) => React.ReactNode;
}

const Component = ({
  calendarData,
  renderResource,
}: TComponentProps) => {
  return (
    <div className="rtc-left-column">
      <div className="rtc-left-header">Resource</div>
      {calendarData.map((resourceData, index) => (
        <div key={index} className="rtc-user">
          {renderResource
            ? renderResource(resourceData.resource)
            : resourceData.resource.title}
        </div>
      ))}
    </div>
  );
};

export default memo(Component);
