import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import SuiButton from '@s-ui/react-atom-button'
import SuiModal from '@s-ui/react-molecule-modal'
import IconClose from './components/IconClose'
import InfoCard from './components/InfoCard'

export default function TcfFirstLayer({
  loadUserConsent,
  getVendorList,
  saveUserConsent,
  openSecondLayer
}) {
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
  const [state, setState] = useState(null)
  const [vendorListState, setVendorListState] = useState(null)
  const [modalOpen, setModalOpen] = useState(true)

  useEffect(() => {
    const loadConsent = async () => {
      const {purpose} = await loadUserConsent()
      setState({purposes: purpose})
    }
    const loadVendorList = async () => {
      const {purposes} = await getVendorList()
      setVendorListState({purposes})
    }
    loadConsent()
    loadVendorList()
  }, [getVendorList, loadUserConsent])

  const handleSettingsClick = () => {
    openSecondLayer()
  }
  const formatConsentObject = ({purpose = {}}) => {
    if (!purpose.consents) {
      purpose.consents = {}
    }
    if (!purpose.legitimateInterests) {
      purpose.legitimateInterests = {}
    }
    Object.keys(vendorListState.purposes).forEach(key => {
      if (!purpose.consents[key]) {
        purpose.consents[key] = false
      }
      if (!purpose.legitimateInterests[key]) {
        purpose.legitimateInterests[key] = false
      }
    })
    return purpose
  }
  const handleSaveExitClick = () => {
    saveUserConsent(
      formatConsentObject({
        purpose: state.purposes
      })
    )
    setModalOpen(false)
  }
  const handleAcceptAll = () => {
    setState(prevState => {
      const {purposes} = prevState
      const {consents} = purposes
      for (const key in vendorListState.purposes) {
        consents[key] = true
      }
      return {
        purposes: {consents}
      }
    })
    setSaveButtonDisabled(false)
  }
  const handlePurposesChange = ({index, value, name}) => {
    setSaveButtonDisabled(false)
    setState(prevState => {
      const {consents} = prevState[name]
      consents[index] = !value
      return {[name]: {consents}}
    })
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }
  return (
    <div className="sui-TcfFirstLayer">
      <SuiModal
        isOpen={modalOpen}
        closeOnOutsideClick
        closeOnEscKeyDown
        header={<strong>TcfFirstLayer</strong>}
        iconClose={<IconClose />}
        onClose={handleCloseModal}
      >
        {state && vendorListState && (
          <InfoCard
            name="purposes"
            title="We care about your privacy"
            descriptions={vendorListState.purposes}
            state={state.purposes}
            onStateChange={handlePurposesChange}
          />
        )}
        <br />
        <br />
        <SuiButton onClick={handleSettingsClick}>Manage Settings</SuiButton>
        <SuiButton onClick={handleSaveExitClick} disabled={saveButtonDisabled}>
          Save and Exit
        </SuiButton>
        <SuiButton onClick={handleAcceptAll}>Accept All</SuiButton>
      </SuiModal>
    </div>
  )
}

TcfFirstLayer.displayName = 'TcfFirstLayer'
TcfFirstLayer.propTypes = {
  openSecondLayer: PropTypes.func,
  loadUserConsent: PropTypes.func,
  getVendorList: PropTypes.func,
  saveUserConsent: PropTypes.func
}
