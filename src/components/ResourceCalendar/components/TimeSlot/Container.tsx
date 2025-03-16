import { useMemo } from 'react';
import { DragConstraintsProps, TComponentProps } from '../../types';
import Component from "./Component"

type TProps = Omit<TComponentProps<typeof Component>, "stepData"> & {
  dragConstraints: DragConstraintsProps
}

const Container = ({dragConstraints, slotWidth, ...props}: TProps) => {
  
  const data = useMemo(() => {
    if (!dragConstraints.showMinuteStepDivider || !dragConstraints.minuteStep) {
      return []
    } else {
      const numberOfCell = Math.round(60 / dragConstraints.minuteStep)
      const numberOfDivider = numberOfCell - 1
      const dividerStepInPx = slotWidth / numberOfCell

      const arrayOfRows = Array.from(Array(numberOfDivider).keys()).map((i, index) => {
        return {
          left: (dividerStepInPx * (index+1)) - 1,
        }
      })

      return arrayOfRows
    }
  }, [dragConstraints, slotWidth])

  return (
    <Component {...props} slotWidth={slotWidth} stepData={data} />
  );
};

export default Container;
