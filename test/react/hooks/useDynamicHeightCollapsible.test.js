import {act, cleanup, renderHook} from '@testing-library/react-hooks'
import {useDynamicHeightCollapsible} from '../../../components/react/hooks/src'

describe('useDynamicHeightCollapsible hook', () => {
  afterEach(cleanup)

  it('should return an array. [Boolean, Number, {toggler, heightRecalculator}]', () => {
    const {result} = renderHook(() => useDynamicHeightCollapsible(5, 0))
    const {
      isCollapsed,
      contentHeight,
      toggle,
      heightRecalculator
    } = result.current

    expect(typeof isCollapsed).toBe('boolean')
    expect(contentHeight).toBe(null)
    expect(typeof toggle).toBe('function')
    expect(typeof heightRecalculator).toBe('function')
  })

  it('should initialize the isCollapsed with true by default', () => {
    const {result} = renderHook(() => useDynamicHeightCollapsible(5, 0))
    const {isCollapsed} = result.current

    expect(isCollapsed).toBe(true)
  })

  it('should toggle the isCollapsed prop', () => {
    const {result} = renderHook(() => useDynamicHeightCollapsible(5, 0))
    const {toggle} = result.current

    expect(result.current.isCollapsed).toBe(true)

    act(() => {
      toggle()
    })
    expect(result.current.isCollapsed).toBe(false)

    act(() => {
      toggle()
    })
    expect(result.current.isCollapsed).toBe(true)
  })

  it('should recalculate the heigh', () => {
    const {result} = renderHook(() => useDynamicHeightCollapsible(5, 0))
    const {heightRecalculator} = result.current

    expect(result.current.contentHeight).toBe(null)

    act(() => {
      heightRecalculator({current: {children: [{clientHeight: 8}]}})
    })
    expect(result.current.contentHeight).toBe(8)
  })

  it('should recalculate the heigh with margin', () => {
    const {result} = renderHook(() => useDynamicHeightCollapsible(5, 2))
    const {heightRecalculator} = result.current

    expect(result.current.contentHeight).toBe(null)

    act(() => {
      heightRecalculator({current: {children: [{clientHeight: 8}]}})
    })
    expect(result.current.contentHeight).toBe(18)
  })
})
