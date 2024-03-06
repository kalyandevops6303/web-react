import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { CometChat } from '@cometchat-pro/chat';

import { CometChatBackdrop } from '../../Shared';

import { CometChatContext } from '../../../util/CometChatContext';
import * as enums from '../../../util/enums.js';
import Translator from '../../../resources/localization/translator';
import groupIcon from './resources/groupIcon.png';
import uploadImage from './resources/uploadImage.png';
import { CometChatUserList } from '../../Users';
import {
  modalWrapperStyle,
  modalBodyStyle,
  modalTableStyle,
  tableCaptionStyle,
  tableBodyStyle,
  inputStyle,
  tableFootStyle,
  modalErrorStyle,
  createGroupButton,
  closeCreateGroupPopupButton,
  endLine,
  groupIconImg,
  uploadIconImg,
  groupNameHeader,
  selectMemeberHeader,
  btnDiv,
  closeBtn,
  closeImgDiv,
  lowerBodyStyle,
  groupIconContainer,
  groupIconStyle,
  avatarInputStyle,
  footerStyle,
} from './style';

import creatingIcon from './resources/creating.svg';
import closeIcon from './resources/close.svg';

class CometChatCreateGroup extends React.Component {
  static contextType = CometChatContext;

  constructor(props) {
    super(props);
    // CometChat.getLoggedinUser()
    //   .then((user) => (this.loggedInUser = user))
    //   .catch((error) => this.errorHandler('SOMETHING_WRONG'));

    this.state = {
      errorMessage: '',
      passwordInput: false,
      name: '',
      type: CometChat.GROUP_TYPE.PRIVATE,
      password: '',
      creatingGroup: false,
      // enablePublicGroup: false,
      // enablePasswordGroup: false,
      enablePrivateGroup: true,
      selectedUsers: [],
      groupAvatarSrc: undefined,
      isAvatarLoading: false,
    };

    this.fileInputRef = React.createRef();
  }

  componentDidMount() {
    // this.enablePublicGroup();
    // this.enablePasswordGroup();
    this.enablePrivateGroup();
  }

  componentDidUpdate() {
    // this.enablePublicGroup();
    // this.enablePasswordGroup();
    this.enablePrivateGroup();
  }

  // enablePublicGroup = () => {
  // 	this.context.FeatureRestriction.isPublicGroupEnabled()
  // 		.then((response) => {
  // 			/**
  // 			 * Don't update state if the response has the same value
  // 			 */
  // 			if (response !== this.state.enablePublicGroup) {
  // 				this.setState({ enablePublicGroup: response });
  // 			}
  // 		})
  // 		.catch((error) => {
  // 			if (this.state.enablePublicGroup !== false) {
  // 				this.setState({ enablePublicGroup: false });
  // 			}
  // 		});
  // };

  // enablePasswordGroup = () => {
  // 	this.context.FeatureRestriction.isPasswordGroupEnabled()
  // 		.then((response) => {
  // 			/**
  // 			 * Don't update state if the response has the same value
  // 			 */
  // 			if (response !== this.state.enablePasswordGroup) {
  // 				this.setState({ enablePasswordGroup: response });
  // 			}
  // 		})
  // 		.catch((error) => {
  // 			if (this.state.enablePasswordGroup !== false) {
  // 				this.setState({ enablePasswordGroup: false });
  // 			}
  // 		});
  // };

  enablePrivateGroup = () => {
    this.context.FeatureRestriction.isPrivateGroupEnabled()
      .then((response) => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enablePrivateGroup) {
          this.setState({ enablePrivateGroup: response });
        }
      })
      .catch((error) => {
        if (this.state.enablePrivateGroup !== false) {
          this.setState({ enablePrivateGroup: false });
        }
      });
  };

  // passwordChangeHandler = (event) => {
  // 	this.setState({ password: event.target.value });
  // };

  nameChangeHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  typeChangeHandler = (event) => {
    const type = event.target.value;
    this.setState({ type });

    // if (type === CometChat.GROUP_TYPE.PASSWORD) {
    // 	this.setState({ passwordInput: true });
    // } else {
    this.setState({ passwordInput: false });
    // }
  };

  handleUserItemClick = (user) => {
    const selectedUsers = [...this.state.selectedUsers];
    if (selectedUsers.includes(user.uid)) {
      this.setState((prevState) => {
        return selectedUsers.filter((uid) => uid !== user.uid);
      });
    } else {
      this.setState({
        selectedUsers: [...selectedUsers, user.uid],
      });
    }
    // console.log('selected users', this.state.selectedUsers);
  };

  // Function to handle file input changes and update the group icon

  handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    // const { guid } = this.props.data.avatar.props.group;
    this.setState({ isAvatarLoading: true });

    const baseHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      // Step 1: GET the upload URL using the filename from the uploaded file
      const response = await fetch(`https://test-api.trumio.ai:2443/api/v1/chat/group-icon?filename=${file.name}`, {
        method: 'GET',
        headers: {
          ...baseHeaders,
          'x-ms-blob-type': 'BlockBlob',
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      const { upload_url, file_url } = responseData.data;

      // Step 2: Upload the file to the received upload URL
      const uploadResponse = await fetch(upload_url, {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Error uploading the file: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }

      // Step 3: Update the group icon using the received file URL
      // let group = new CometChat.Group(guid);
      // group.setIcon(file_url);
      // CometChat.updateGroup(group).then(
      //   (group) => {
      //     console.log('Group avatar updated successfully');
      //     this.setState({
      //       isAvatarLoading: false,
      //       groupAvatarSrc: file_url,
      //     });
      //   },
      //   (error) => {
      //     console.log('Group avatar update failed', error);
      //   },
      // );
      this.setState({
        isAvatarLoading: false,
        groupAvatarSrc: file_url,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  validate = () => {
    const groupName = this.state.name.trim();
    const groupType = this.state.type.trim();

    if (!groupName) {
      this.setState({
        errorMessage: Translator.translate('INVALID_GROUP_NAME', this.context.language),
      });
      return false;
    }

    if (!groupType) {
      this.setState({
        errorMessage: Translator.translate('INVALID_GROUP_TYPE', this.context.language),
      });
      return false;
    }

    let password = '';
    if (groupType === CometChat.GROUP_TYPE.PASSWORD) {
      password = this.state.password;

      if (!password.length) {
        this.setState({
          errorMessage: Translator.translate('INVALID_PASSWORD', this.context.language),
        });
        return false;
      }
    }
    return true;
  };

  createGroup = () => {
    if (!this.validate()) {
      return false;
    }

    this.setState({ creatingGroup: true });

    const groupType = this.state.type.trim();

    const password = this.state.password;
    const guid = 'group_' + new Date().getTime();
    const name = this.state.name.trim();
    let type = CometChat.GROUP_TYPE.PUBLIC;

    switch (groupType) {
      case 'public':
        type = CometChat.GROUP_TYPE.PUBLIC;
        break;
      case 'private':
        type = CometChat.GROUP_TYPE.PRIVATE;
        break;
      case 'password':
        type = CometChat.GROUP_TYPE.PASSWORD;
        break;
      default:
        break;
    }

    const group = new CometChat.Group(guid, name, type, password, this.state.groupAvatarSrc);
    group.setMetadata({ category: 'custom_group' });
    const createGroupMembersObjArray = (users) => {
      const members = [];
      users.map((user) => {
        members.push(new CometChat.GroupMember(user, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT));
      });
      return members;
    };
    const members = createGroupMembersObjArray(this.state.selectedUsers);
    // console.log("Group members object array", GroupMembers());
    CometChat.createGroupWithMembers(group, members, [])
      .then((newGroupObj) => {
        console.log('Group created successfully:', newGroupObj);
        this.setState({ creatingGroup: false });

        if (typeof newGroupObj === 'object' && Object.keys(newGroupObj).length) {
          this.context.setToastMessage('success', 'GROUP_CREATION_SUCCESS');
          this.setState({
            name: '',
            type: '',
            password: '',
            passwordInput: '',
          });
          this.props.actionGenerated(enums.ACTIONS['GROUP_CREATED'], newGroupObj.group);
          this.props.close();
        } else {
          this.setState({
            errorMessage: Translator.translate('SOMETHING_WRONG', this.context.language),
          });
        }
      })
      .catch((error) => {
        console.log('Group creation failed with exception:', error);
        this.setState({
          creatingGroup: false,
          errorMessage: Translator.translate('SOMETHING_WRONG', this.context.language),
        });
      });
  };

  populateGroupType = () => {};

  render() {
    const groupTypes = {};
    let groupTypeSelect = null;

    // if (this.state.enablePublicGroup === true) {
    // 	groupTypes[CometChat.GROUP_TYPE.PUBLIC] = Translator.translate(
    // 		"PUBLIC",
    // 		this.context.language
    // 	);
    // }

    // if (this.state.enablePasswordGroup === true) {
    // 	groupTypes[CometChat.GROUP_TYPE.PASSWORD] = Translator.translate(
    // 		"PASSWORD_PROTECTED",
    // 		this.context.language
    // 	);
    // }

    if (this.state.enablePrivateGroup === true) {
      groupTypes[CometChat.GROUP_TYPE.PRIVATE] = Translator.translate('PRIVATE', this.context.language);
    }

    // const groupTypeKeys = Object.keys(groupTypes);
    // if (groupTypeKeys.length) {
    // 	const groupTypeListOptions = groupTypeKeys.map((groupTypeKey) => {
    // 		return (
    // 			<option value={groupTypeKey} key={groupTypeKey}>
    // 				{groupTypes[groupTypeKey]}
    // 			</option>
    // 		);
    // 	});

    // 	if (groupTypeKeys.length > 1) {
    // 		groupTypeSelect = (
    // 			<tr>
    // 				<td>
    // 					<select
    // 						css={inputStyle(this.props)}
    // 						className='grouptype'
    // 						onChange={this.typeChangeHandler}
    // 						value={this.state.type}
    // 						tabIndex='2'
    // 					>
    // 						<option  value=''>
    // 							{Translator.translate(
    // 								"SELECT_GROUP_TYPE",
    // 								this.context.language
    // 							)}
    // 						</option>
    // 						{groupTypeListOptions}
    // 					</select>
    // 				</td>
    // 			</tr>
    // 		);
    // 	} else {
    // 		groupTypeSelect = (
    // 			<tr>
    // 				<td>
    // 					<select
    // 						css={inputStyle(this.props)}
    // 						className='grouptype'
    // 						onChange={this.typeChangeHandler}
    // 						value={this.state.type}
    // 						tabIndex='2'
    // 					>
    // 						{groupTypeListOptions}
    // 					</select>
    // 				</td>
    // 			</tr>
    // 		);
    // 	}
    // }

    // let password = null;
    // if (this.state.passwordInput) {
    // 	password = (
    // 		<tr>
    // 			<td>
    // 				<input
    // 					autoComplete='off'
    // 					css={inputStyle(this.context)}
    // 					placeholder={Translator.translate(
    // 						"ENTER_GROUP_PASSWORD",
    // 						this.context.language
    // 					)}
    // 					type='password'
    // 					tabIndex='3'
    // 					onChange={this.passwordChangeHandler}
    // 					value={this.state.password}
    // 				/>
    // 			</td>
    // 		</tr>
    // 	);
    // }

    const createText = this.state.creatingGroup
      ? Translator.translate('CREATING', this.context.language)
      : Translator.translate('Create Group', this.context.language);

    return (
      <React.Fragment>
        <CometChatBackdrop show={true} clicked={this.props.close} />
        <div css={modalWrapperStyle(this.context)} className="modal__creategroup">
          <div css={closeImgDiv()}>
            <img
              className="modal__creategroup__closebtn"
              css={closeBtn()}
              onClick={() => this.props.close()}
              src={closeIcon}
            />
          </div>
          <div css={modalBodyStyle()} className="modal__body">
            <div css={modalTableStyle(this.props)}>
              <div css={tableCaptionStyle()} className="modal__title">
                {' '}
                {Translator.translate('Create New Group', this.context.language)}{' '}
              </div>
              <div css={tableBodyStyle()} className="modal__search">
                <div className="upload__avatar__container" css={groupIconContainer()}>
                  <div
                    className="upload__avatar"
                    css={groupIconStyle()}
                    onClick={() => this.fileInputRef.current.click()}
                  >
                    {/* add a loading effect */}
                    <img css={groupIconImg()} src={this.state.groupAvatarSrc || groupIcon} />
                    <img css={uploadIconImg()} src={uploadImage} />
                    <input
                      type="file"
                      css={avatarInputStyle()}
                      ref={this.fileInputRef}
                      onChange={this.handleFileInputChange}
                    />
                  </div>
                </div>
                <div>
                  <div css={modalErrorStyle(this.context)}>{this.state.errorMessage}</div>
                </div>
                <div>
                  <p css={groupNameHeader()}>GROUP NAME</p>
                </div>

                <input
                  autoComplete="off"
                  css={inputStyle(this.props)}
                  className="search__input"
                  placeholder={Translator.translate('Research & Development', this.context.language)}
                  type="text"
                  tabIndex="1"
                  onChange={this.nameChangeHandler}
                  value={this.state.name}
                />
              </div>
              <hr css={endLine()} />
              <div css={lowerBodyStyle()} className="lower__body">
                <CometChatUserList type={'group'} onItemClick={this.handleUserItemClick} />
              </div>
              <div className="create__group__footer" css={footerStyle()}>
                <hr css={endLine()} />
                <div css={btnDiv()}>
                  <button onClick={() => this.props.close()} css={closeCreateGroupPopupButton()}>
                    Close
                  </button>
                  {/* </td>
										<td> */}
                  <button
                    className="create__group__button"
                    type="button"
                    tabIndex="4"
                    css={createGroupButton()}
                    onClick={this.createGroup}
                  >
                    <span>{createText}</span>
                  </button>
                  {/* </td>
									</tr>
								</tfoot> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { CometChatCreateGroup };
