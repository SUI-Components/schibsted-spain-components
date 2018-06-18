import React from 'react'
import PropTypes from 'prop-types'

import Button from '@schibstedspain/sui-atom-button'

import {Consents} from '../Consents'

import {CLASS} from '../settings'

export const CmpModal = ({
  consentKey,
  logo,
  onAccept,
  onCancel,
  onToggleAll,
  onToggleConsent,
  purposes,
  vendors,
  purposeConsents,
  vendorConsents
}) => {
  console.log({
    purposes,
    vendors,
    purposeConsents,
    vendorConsents
  })

  return (
    <div className={CLASS}>
      <div className={`${CLASS}-content`}>
        <header className={`${CLASS}-header`}>
          <img
            alt="Schibsted Spain logo"
            className={`${CLASS}-logo`}
            src={logo}
          />
        </header>
        <section className={`${CLASS}-inner`}>
          <h2>Tu privacidad es importante para nosotros</h2>
          <p>
            Puedes dar tu consentimiento de manera individual a cada partner.
            Ver la lista de todos los propósitos para los cuales utilizan tus
            datos para tener más información. En algunos casos, las empresas
            pueden revelar que usan tus datos sin pedir tu consentimiento, en
            función de intereses legítimos. Puedes hacer click en su política de
            privacidad para obtener más información al respecto o para
            rechazarlo.
          </p>
          <Consents
            consents={purposeConsents}
            key={`purposes-${consentKey}`}
            list={purposes}
            onToggleAll={onToggleAll}
            onToggleConsent={onToggleConsent}
            title="Autorizo:"
          />
          <Consents
            consents={vendorConsents}
            isVendor
            key={`vendors-${consentKey}`}
            list={vendors}
            onToggleAll={onToggleAll}
            onToggleConsent={onToggleConsent}
            title="Para los siguientes anunciantes y partners:"
          />
        </section>
        <footer className={`${CLASS}-footer`}>
          <Button onClick={onCancel} type="tertiary" size="small">
            Cancelar
          </Button>
          <Button onClick={onAccept} type="primary" size="large">
            Guardar y salir
          </Button>
        </footer>
      </div>
    </div>
  )
}

CmpModal.propTypes = {
  consentKey: PropTypes.string,
  lang: PropTypes.string,
  logo: PropTypes.string,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  onToggleAll: PropTypes.func,
  onToggleConsent: PropTypes.func,
  purposes: PropTypes.array,
  vendors: PropTypes.array,
  purposeConsents: PropTypes.object,
  vendorConsents: PropTypes.object
}
