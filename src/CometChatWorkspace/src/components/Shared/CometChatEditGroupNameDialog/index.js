import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import { CometChatBackdrop } from '../';
import Translator from '../../../resources/localization/translator';

import {
  alertWrapperStyle,
  // alertMessageStyle,
  alertButtonStyle,
  confirmDialogBodyStyle,
  confirmDialogContentWrapperStyle,
  confirmDialogContentHeadingStyle,
  confirmDialogContentStyle,
  confirmDialogContentNoteStyle,
  confirmDialogImgWrapperStyle,
  confirmDialogImgStyle,
  crossIconStyle,
  crossIconContainerStyle,
  confirmDialogInputStyle,
} from './style';

import warningIcon from './resources/warning-icon.png';
import crossIcon from './resources/cross-icon.png';

class CometChatEditGroupNameDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.initialGroupName,
    });
  }

  render() {
    const confirmButtonText = this.props?.confirmButtonText
      ? this.props.confirmButtonText
      : Translator.translate('YES', this.context.language);
    const cancelButtonText = this.props?.cancelButtonText
      ? this.props.cancelButtonText
      : Translator.translate('NO', this.getContext().language);

    const { title, description, note } = this.props;

    return (
      <React.Fragment>
        <CometChatBackdrop
          show={true}
          // style={{ position: "absolute" }}
          clicked={this.props.onCancel}
        />
        <div className="confirm__dialog" css={alertWrapperStyle(this.props)}>
          <div
            className="confirm__dialog__cross__icon__container"
            css={crossIconContainerStyle()}
            onClick={this.props.onCancel}
          >
            <img className="confirm__dialog__close__img" src={crossIcon} css={crossIconStyle()} />
          </div>
          <div className="confirm__dialog__body" css={confirmDialogBodyStyle()}>
            {/* <div className="confirm__dialog__img__wrapper" css={confirmDialogImgWrapperStyle()}>
              <img className="confirm__dialog__img" src={warningIcon} css={confirmDialogImgStyle()} />
            </div> */}
            <div className="confirm__dialog__content__wrapper" css={confirmDialogContentWrapperStyle()}>
              <div className="confirm__dialog__content__heading" css={confirmDialogContentHeadingStyle()}>
                {title}
              </div>
              <div className="confirm__dialog__content" css={confirmDialogContentStyle()}>
                {description}
              </div>
              <div>
                <input
                  className="comfirm__dialog_input"
                  css={confirmDialogInputStyle()}
                  type="text"
                  value={this.state.name}
                  onChange={(event) =>
                    this.setState({
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="confirm__dialog__content__note" css={confirmDialogContentNoteStyle()}>
                {note && `Note: ${note}`}
              </div>
            </div>
          </div>

          <div className="confirm__buttons" css={alertButtonStyle(this.props)}>
            <button type="button" value="no" onClick={this.props.onCancel}>
              {cancelButtonText}
            </button>
            <button type="button" value="yes" onClick={() => this.props.onConfirm(this.state.name)}>
              {confirmButtonText}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { CometChatEditGroupNameDialog };
