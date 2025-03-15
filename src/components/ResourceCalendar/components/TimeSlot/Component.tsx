import React, { memo } from 'react';

type TComponentProps = {
  index: number
  slotWidth: number
  hoursLength: number
}

const Component = ({
  index,
  slotWidth,
  hoursLength,
}: TComponentProps) => {
  return (
    <div
      key={index}
      className="rtc-time-slot"
      style={{
        left: index * slotWidth,
        width: slotWidth,
        borderRight: index === hoursLength - 1 ? 'none' : undefined,
      }}
    />
  );
};

export default memo(Component);
