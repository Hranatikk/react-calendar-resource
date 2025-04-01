import { DragConstraintsProps } from "../../../types"

type Data = {
  left: number
}
type TResult = Data[]

export const getStepData = (dragConstraints: DragConstraintsProps, slotWidth: number): TResult => {
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
}