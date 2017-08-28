/* eslint-disable react/prop-types */
import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import Menu from '@schibstedspain/sui-svgiconset/lib/Menu'
import DropdownBasic from '@schibstedspain/sui-dropdown-basic'
import DropdownUser from '@schibstedspain/sui-dropdown-user'
import DefaultCallToAction from './default-call-to-action'

const DEFAULT_NAV_WRAP_STYLE = {
  top: 'inherit',
  left: 'inherit',
  height: 'inherit',
  width: 'inherit'
}

/**
 * Topbar containing a dropdown with user data (login, logout, secured links...).
 */
class TopbarUser extends Component {
  constructor (...args) {
    super(...args)

    this._topbarUserNode = null
    this._topbarUserToggleNode = null
    this._verticalScrollPosition = null

    this.state = {
      menuExpanded: false,
      isToggleHidden: false,
      navWrapStyle: DEFAULT_NAV_WRAP_STYLE
    }
  }

  componentDidMount () {
    this._setToggleDisplayState()
    window.addEventListener('resize', this._setToggleDisplayState)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._setToggleDisplayState)
  }

  componentWillUpdate (nextProps, { menuExpanded, isToggleHidden }) {
    if (menuExpanded && !isToggleHidden) {
      this._lockBodyScroll()
    } else {
      this._unlockBodyScroll()
    }
  }

  /**
   * Lock body element scroll.
   */
  _lockBodyScroll = () => {
    this._verticalScrollPosition = window.scrollY
    window.document.documentElement.classList.add('html-has-scroll-disabled')
    window.document.body.classList.add('body-has-scroll-disabled')
    this.props.elementsToKeepScrollOnToggleMenu.forEach(selector => {
      document.querySelector(selector).style.transform = `translate3d(0, -${this._verticalScrollPosition}px, 0)`
    })
  }

  /**
   * Unlock body element scroll.
   */
  _unlockBodyScroll = () => {
    this.props.elementsToKeepScrollOnToggleMenu.forEach(selector => {
      document.querySelector(selector).style.transform = ''
    })
    window.document.documentElement.classList.remove('html-has-scroll-disabled')
    window.document.body.classList.remove('body-has-scroll-disabled')
    window.scrollTo(0, this._verticalScrollPosition)
  }

  /**
   * Set the display state for toggle button.
   */
  _setToggleDisplayState = () => {
    const { display } = window.getComputedStyle(this._topbarUserToggleNode)
    const isToggleHidden = display === 'none'

    if (!isToggleHidden) { this._setNavWrapStyles() }
    if (isToggleHidden !== this.state.isToggleHidden) {
      this.setState({ isToggleHidden })
    }
  }

  /**
   * Set navigation wrap inline styles.
   */
  _setNavWrapStyles = () => {
    const { top, left, height, width } = this._topbarUserNode.getBoundingClientRect()
    const navWrapTop = top + height

    this.setState({
      navWrapStyle: {
        top: navWrapTop,
        left,
        height: window.innerHeight - navWrapTop,
        width
      }
    })
  }

  /**
   * Toggle menu state: expanded/collapsed.
   */
  _toggleMenu = () => {
    const { menuExpanded } = this.state

    this.setState({ menuExpanded: !menuExpanded })
  }

  /**
   * Render main navigation function.
   */
  _renderNavMain = isToggleHidden => ({
    icon,
    label: text,
    menu,
    arrowButtonIcon
  }, index) => {
    return (
      <DropdownBasic
        key={index}
        button={{ icon, text, arrowButtonIcon }}
        menu={menu}
        expandOnMouseOver={isToggleHidden}
      />
    )
  }

  /**
   * Handle click on navigation wrap.
   */
  _handleNavWrapClick = ({ target, currentTarget }) => {
    const { menuExpanded } = this.state

    if (menuExpanded && target === currentTarget) {
      this._toggleMenu()
    }
  }

  render () {
    const { menuExpanded, isToggleHidden, navWrapStyle } = this.state
    const {
      callToActionComponent: CallToActionComponent,
      toggleIcon: ToggleIcon,
      brand,
      navMain,
      navUser,
      navCTA,
      linkFactory: Link
    } = this.props
    const { name: brandName, url: brandUrl } = brand
    const { avatar, name, menu } = navUser
    const navWrapClassName = cx('sui-TopbarUser-navWrap', {
      'is-expanded': menuExpanded
    })

    return (
      <div
        ref={node => { this._topbarUserNode = node }}
        className='sui-TopbarUser'
      >
        <div className='sui-TopbarUser-wrap'>
          <button
            ref={node => { this._topbarUserToggleNode = node }}
            className='sui-TopbarUser-toggle'
            onClick={this._toggleMenu}
          >
            <ToggleIcon svgClass='sui-TopbarUser-toggleIcon' />
          </button>
          <Link href={brandUrl} className='sui-TopbarUser-brand' title={brandName}>
            {brandName}
          </Link>
          <div
            className={navWrapClassName}
            style={isToggleHidden ? DEFAULT_NAV_WRAP_STYLE : navWrapStyle}
            onClick={this._handleNavWrapClick}
          >
            <div className='sui-TopbarUser-nav'>
              <div className='sui-TopbarUser-navMain'>
                {navMain.map(this._renderNavMain(isToggleHidden))}
                {navCTA && <CallToActionComponent url={navCTA.url} text={navCTA.text} icon={navCTA.icon} notifications={navCTA.notifications} linkFactory={Link} className='sui-TopbarUser-ctaText' />}
              </div>
              <div className='sui-TopbarUser-navUser'>
                <DropdownUser
                  user={{ avatar, name }}
                  menu={menu}
                  expandOnMouseOver
                />
              </div>
            </div>
          </div>
        </div>
        {navCTA && <CallToActionComponent url={navCTA.url} text={navCTA.text} icon={navCTA.icon} notifications={navCTA.notifications} linkFactory={Link} className='sui-TopbarUser-ctaButton' />}
      </div>
    )
  }
}

TopbarUser.displayName = 'TopbarUser'

TopbarUser.propTypes = {
  /**
   * Optional toggle icon.
   */
  toggleIcon: PropTypes.func,
  /**
   * Brand object.
   */
  brand: PropTypes.shape({
    /**
     * Brand url.
     */
    url: PropTypes.string.isRequired,
    /**
     * Brand name.
     */
    name: PropTypes.string.isRequired
  }).isRequired,
  /**
   * Component to use as Call to Action
   */
  callToActionComponent: PropTypes.func,
  /**
   * Main navigation containing an array of dropdown menus.
   */
  navMain: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Nav optional icon.
     */
    icon: PropTypes.func,
    /**
     * Nav label.
     */
    label: PropTypes.string,
    /**
     * Nav menu.
     */
    menu: PropTypes.arrayOf(PropTypes.shape({
      /**
       * Nav menu section title.
       */
      title: PropTypes.string,
      /**
       * Nav menu section links.
       */
      links: PropTypes.arrayOf(PropTypes.shape({
        /**
         * Menu link text.
         */
        text: PropTypes.string.isRequired,
        /**
         * Menu link url.
         */
        url: PropTypes.string.isRequired
      }))
    }))
  })),
  /**
   * Dropdown user object.
   */
  navUser: PropTypes.shape({
    /**
     * User name.
     */
    name: PropTypes.string.isRequired,
    /**
     * User avatar.
     */
    avatar: PropTypes.string.isRequired,
    /**
     * User menu.
     */
    menu: PropTypes.arrayOf(PropTypes.shape({
      /**
       * Menu links text.
       */
      text: PropTypes.string.isRequired,
      /**
       * Menu links url.
       */
      url: PropTypes.string.isRequired,
      /**
       * Menu links icon.
       */
      icon: PropTypes.func.isRequired
    }))
  }).isRequired,
  /**
   * CTA data.
   */
  navCTA: PropTypes.shape({
    /**
     * Call to action url.
     */
    url: PropTypes.string.isRequired,
    /**
     * Call to action optional icon.
     */
    icon: PropTypes.func,
    /**
     * Call to action text.
     */
    text: PropTypes.string.isRequired,
    /**
     * Notifications to be displayed in the CTA.
     */
    notifications: PropTypes.number
  }),
  /**
   * Factory for the component that will hold any link.
   */
  linkFactory: PropTypes.func,
  /**
   * Array of elements to keep scroll while side menu is being toggled (since
   * we are fixing the `body` element position due to momentum scrolling on iOS).
   */
  elementsToKeepScrollOnToggleMenu: PropTypes.arrayOf(PropTypes.string)
}

TopbarUser.defaultProps = {
  toggleIcon: Menu,
  callToActionComponent: DefaultCallToAction,
  linkFactory: ({ href, className, children, title }) =>
    <a href={href} className={className} title={title}>{children}</a>,
  elementsToKeepScrollOnToggleMenu: [
    '.mt-Container',
    '.mt-SharedFooter'
  ]
}

export default TopbarUser
