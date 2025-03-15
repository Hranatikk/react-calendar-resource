import React, { memo } from 'react';
import { Hour } from '../../types';

type TComponentProps = {
  index: number
  slotWidth: number
  hoursLength: number
  hour: Hour
}

const Component = ({
  index,
  slotWidth,
  hoursLength,
  hour,
}: TComponentProps) => {
  return (
    <div
      className="rtc-time-slot"
      style={{
        left: index * slotWidth,
        width: slotWidth,
        borderRight: index === hoursLength - 1 ? 'none' : undefined,
      }}
    >
      {hour.label}
    </div>
  );
};

export default memo(Component);
