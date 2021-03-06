import PropTypes from 'prop-types'

import Switch from '../../../Switch'
import Select from '../../../Select'
import Checkbox from '../../../Checkbox'
import InlineButton from '../../../InlineButton'
import Radio from '../../../Radio'

import {FIELDS, DISPLAYS} from '../../index'

const PickerField = ({
  field,
  tabIndex,
  onChange,
  onFocus,
  onBlur,
  errors,
  alerts,
  renderer
}) => {
  if (field.display === DISPLAYS[FIELDS.PICKER].SWITCH) {
    return (
      <Switch
        switchField={field}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
        errors={errors}
        alerts={alerts}
        renderer={renderer}
      />
    )
  } else if (
    field.display === DISPLAYS[FIELDS.PICKER].AUTOCOMPLETE ||
    field.display === DISPLAYS[FIELDS.PICKER].DROPDOWN
  ) {
    return (
      <Select
        select={field}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
        errors={errors}
        alerts={alerts}
        renderer={renderer}
      />
    )
  } else if (field.display === DISPLAYS[FIELDS.PICKER].RADIO) {
    return (
      <Radio
        radio={field}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
        errors={errors}
        alerts={alerts}
        renderer={renderer}
      />
    )
  } else if (field.display === DISPLAYS[FIELDS.PICKER].CHECKBOX) {
    return (
      <Checkbox
        checkbox={field}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
        errors={errors}
        alerts={alerts}
        renderer={renderer}
      />
    )
  } else if (field.display === DISPLAYS[FIELDS.PICKER].BUTTON_INLINE) {
    return (
      <InlineButton
        inlineButton={field}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
        errors={errors}
        alerts={alerts}
        renderer={renderer}
      />
    )
  } else {
    // TODO: should be removed (backwards compatibility)
    return (
      <Select
        select={field}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
        errors={errors}
        alerts={alerts}
        renderer={renderer}
      />
    )
  }
}

PickerField.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  tabIndex: PropTypes.number,
  field: PropTypes.object,
  errors: PropTypes.object,
  alerts: PropTypes.object,
  renderer: PropTypes.func
}

export default PickerField
