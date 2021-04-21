export default function ReactHooks() {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      "[@s-ui/react-hooks] can't be used as a standalone package.\nYou must import a specific hook."
    )
  }
  return null
}

export {default as useBoolean} from './useBoolean'
export {default as useControlledState} from './useControlledState'
export {default as useDebounce} from './useDebounce'
export {default as useEventListener} from './useEventListener'
export {default as useLegacyState} from './useLegacyState'
export {default as useMediaQuery} from './useMediaQuery'
export {default as useMergeRefs} from './useMergeRefs'
export {default as useMount} from './useMount'
export {default as useOnClickOutside} from './useOnClickOutside'
export {default as useOnScreen, useNearScreen} from './useOnScreen'
export {default as useOrientation, orientations} from './useOrientation'
export {default as usePrevious} from './usePrevious'
export {default as useScroll} from './useScroll'
export {default as useSteps} from './useSteps'
export {default as useSwipe} from './useSwipe'
export {default as useToggle} from './useToggle'
export {default as useDynamicHeightCollapsible} from './useDynamicHeightCollapsible'
