/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const os = require('os')
const React = require('react')
const ImmutableComponent = require('../../../js/components/immutableComponent')
const locale = require('../../../js/l10n')
const currentWindow = require('../currentWindow')
const cx = require('../../../js/lib/classSet')

class WindowCaptionButtons extends ImmutableComponent {
  constructor () {
    super()
    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onMinimizeClick = this.onMinimizeClick.bind(this)
    this.onMaximizeClick = this.onMaximizeClick.bind(this)
    this.onCloseClick = this.onCloseClick.bind(this)
    this.osClass = this.getPlatformCssClass()
  }

  get maximizeTitle () {
    return this.props.windowMaximized
      ? 'windowCaptionButtonRestore'
      : 'windowCaptionButtonMaximize'
  }

  getPlatformCssClass () {
    switch (os.platform()) {
      case 'win32':
        if (/6.1./.test(os.release())) {
          return 'win7'
        } else {
          return 'win10'
        }
      default:
        return 'hidden'
    }
  }

  onMinimizeClick (e) {
    currentWindow.minimize()
  }

  onMaximizeClick (e) {
    return (!currentWindow.isMaximized()) ? currentWindow.maximize() : currentWindow.unmaximize()
  }

  onCloseClick (e) {
    currentWindow.close()
  }

  onDoubleClick (e) {
    if (!e.target.className.includes('navigatorWrapper')) {
      return
    }
    this.onMaximizeClick(e)
  }

  render () {
    return <div className={cx({
      fullscreen: this.props.windowMaximized,
      windowCaptionButtons: true
    })}>
      <div className={'container ' + this.osClass}>
        <button
          className={cx({
            fullscreen: this.props.windowMaximized,
            captionButton: true,
            minimize: true
          })}
          onClick={this.onMinimizeClick}
          title={locale.translation('windowCaptionButtonMinimize')}>
          <div className='widget' />
        </button>
        <button
          className={cx({
            fullscreen: this.props.windowMaximized,
            captionButton: true,
            maximize: true
          })}
          onClick={this.onMaximizeClick}
          title={locale.translation(this.maximizeTitle)}>
          <div className='widget'>
            <div className='widget1' />
            <div className='widget2' />
            <div className='widget3' />
            <div className='widget4' />
            <div className='widget5' />
          </div>
        </button>
        <button
          className={cx({
            fullscreen: this.props.windowMaximized,
            captionButton: true,
            close: true
          })}
          onClick={this.onCloseClick}
          title={locale.translation('windowCaptionButtonClose')}>
          <div className='widget'>
            <div className='widget1' />
            <div className='widget2' />
            <div className='widget3' />
          </div>
        </button>
      </div>
    </div>
  }
}

module.exports = WindowCaptionButtons
