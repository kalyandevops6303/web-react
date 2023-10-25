import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import { CometChatBackdrop } from '../';
import Translator from '../../../resources/localization/translator';

import {
  alertWrapperStyle,
  alertButtonStyle,
  confirmDialogBodyStyle,
  confirmDialogContentWrapperStyle,
  confirmDialogContentHeadingStyle,
  confirmDialogContentStyle,
  confirmDialogContentNoteStyle,
  confirmDialogImgWrapperStyle,
  confirmDialogImgStyle,
} from './style';

import warningIcon from './resources/warning-icon.png';

class CometChatConfirmDialog extends React.Component {
  render() {
    const confirmButtonText = this.props?.confirmButtonText
      ? this.props.confirmButtonText
      : Translator.translate('YES', this.context.language);
    const cancelButtonText = this.props?.cancelButtonText
      ? this.props.cancelButtonText
      : Translator.translate('NO', this.getContext().language);

    return (
      <React.Fragment>
        <CometChatBackdrop
          show={true}
          // style={{ position: "absolute" }}
          clicked={this.props.close}
        />
        <div className="confirm__dialog" css={alertWrapperStyle(this.props)}>
          <div className="confirm__dialog__body" css={confirmDialogBodyStyle()}>
            <div className="confirm__dialog__img__wrapper" css={confirmDialogImgWrapperStyle()}>
              <img className="confirm__dialog__img" src={warningIcon} css={confirmDialogImgStyle()} />
            </div>
            <div className="confirm__dialog__content__wrapper" css={confirmDialogContentWrapperStyle()}>
              <div className="confirm__dialog__content__heading" css={confirmDialogContentHeadingStyle()}>
                Delete {this.props.type === 'member' ? 'Member' : 'Group'}
              </div>
              <div className="confirm__dialog__content" css={confirmDialogContentStyle()}>
                Are you sure you want to delete the {/*Research & Development*/}{' '}
                {this.props.type === 'member' ? 'member' : 'group'} permanently?
              </div>
              <div className="confirm__dialog__content__note" css={confirmDialogContentNoteStyle()}>
                {this.props.type !== 'member'
                  ? 'Note: The complete chat data including the attachments will be lost'
                  : null}
              </div>
            </div>
          </div>
          <div className="confirm__buttons" css={alertButtonStyle(this.props)}>
            <button type="button" value="no" onClick={this.props.onClick}>
              {cancelButtonText}
            </button>
            <button type="button" value="yes" onClick={this.props.onClick}>
              {confirmButtonText}
            </button>
          </div>
        </div>
        {/* <div className='confirm__dialog' css={alertWrapperStyle(this.props)}>
					<div className='confirm__message' css={alertMessageStyle(this.props)}>
						{this.props?.message}
					</div>
					<div className='confirm__buttons' css={alertButtonStyle(this.props)}>
						<button type='button' value='no' onClick={this.props.onClick}>
							{cancelButtonText}
						</button>
						<button type='button' value='yes' onClick={this.props.onClick}>
							{confirmButtonText}
						</button>
					</div>
				</div> */}
      </React.Fragment>
    );
  }
}

export { CometChatConfirmDialog };
