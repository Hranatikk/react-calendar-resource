import { useMemo } from "react"
import { DragConstraintsProps, TComponentProps } from "../../types"
import Component from "./Component"
import { getStepData } from "./helpers/getStepData"
import { useCalendarContext } from "../../../../context/CalendarContext"

type TProps = Pick<TComponentProps<typeof Component>, "index">

const Container = ({ index }: TProps) => {
  const { dragConstraints, slotWidth, hours } = useCalendarContext()
  const data = useMemo(() => getStepData(dragConstraints, slotWidth), [dragConstraints, slotWidth])

  return (
    <Component index={index} slotWidth={slotWidth} stepData={data} hoursLength={hours.length} />
  )
}

export default Container
