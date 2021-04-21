import {useState} from 'react'
import useToggle from '../useToggle'

export default function useDynamicHeightCollapsible(
  numVisibleItems,
  marginBetweenItems
) {
  const [isCollapsed, toggle] = useToggle(true)
  const [contentHeight, setContentHeight] = useState(null)
  const heightRecalculator = ({current}) => {
    let contentHeight = 0
    const {children} = current
    const listLength =
      children.length < numVisibleItems ? children.length : numVisibleItems
    for (let i = 0; i < listLength; i++) {
      contentHeight += children[i].clientHeight
    }
    setContentHeight(contentHeight + marginBetweenItems * numVisibleItems)
  }

  return {
    isCollapsed,
    contentHeight,
    toggle,
    heightRecalculator
  }
}
