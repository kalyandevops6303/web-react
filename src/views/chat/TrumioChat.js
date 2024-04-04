/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { CometChat } from '@cometchat-pro/chat';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-relative-packages
import { CometChatUI } from '../../CometChatWorkspace/src/components';
import ComponentSpinner from '../../@core/components/spinner/Loading-spinner';

function TrumioChat({ authToken, targetId, targetType = 'user', style, milestoneAttachment, ...rest }) {
  const [enableMilestoneInput, setEnableMilestoneInput] = useState(false);
  const [milestoneMessageId, setMilestoneMessageId] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!targetId && milestoneAttachment) {
    targetId = milestoneAttachment?.milestone?.projectGroupId || null;
    if (targetId) {
      targetType = 'group';
    }
  }

  const initializeApp = async () => {
    setLoader(true);
    try {
      await handleMilestoneAttachment();
      setLoader(false);
    } catch (error) {
      console.error('Virgil Error');
    }
  };

  const cancelMilestoneInput = () => {
    setEnableMilestoneInput(false);
  };

  const createMilestoneInput = () => {
    setEnableMilestoneInput(true);
  };

  const updateMilestoneMessageId = (val) => {
    setMilestoneMessageId(val);
  };

  const disableMilestoneMessageId = () => {
    updateMilestoneMessageId(null);
  };

  const handleMilestoneAttachment = async () => {
    // Ensures that the CometChat is initialised and the user is loggedIn before fetching the messages
    await CometChat.getLoggedinUser();
    if (milestoneAttachment) {
      if (milestoneAttachment?.artifact?.urlName === '' && milestoneAttachment?.artifact?.url !== '') {
        milestoneAttachment.artifact.urlName = milestoneAttachment?.artifact?.url;
      }

      let isMilestoneAttachmentAlreadyLogged = await isMilestoneSubmissionExists(
        milestoneAttachment.uid,
        milestoneAttachment.milestone.projectGroupId,
      );
      if (isMilestoneAttachmentAlreadyLogged) {
        cancelMilestoneInput();
        updateMilestoneMessageId(parseInt(isMilestoneAttachmentAlreadyLogged));
      } else {
        createMilestoneInput();
      }
    }
  };

  const isMilestoneSubmissionExists = async (submissionId, guid) => {
    let res = null;
    let messageRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(guid)
      .setTags([`submissionid-${submissionId}`])
      .setLimit(1)
      .build();

    let milestoneMessageList = await messageRequest.fetchPrevious();
    // console.log(milestoneMessageList);
    if (milestoneMessageList.length) {
      res = milestoneMessageList[0].id;
    } else {
      res = false;
    }

    return res;
  };

  const loadingComponent = <ComponentSpinner />;

  const chatView = loader ? (
    loadingComponent
  ) : (
    <div style={style}>
      <CometChatUI
        milestoneAttachment={milestoneAttachment}
        enableMilestoneInput={enableMilestoneInput}
        cancelMilestoneInput={cancelMilestoneInput}
        milestoneMessageId={milestoneMessageId}
        disableMilestoneMessageId={disableMilestoneMessageId}
        targetId={targetId}
        targetType={targetType}
        {...rest}
      />
    </div>
  );

  return chatView;
}

export default TrumioChat;

TrumioChat.propTypes = {
  authToken: PropTypes.string,
  targetId: PropTypes.string,
  targetType: PropTypes.string,
  style: PropTypes.object,
  milestoneAttachment: PropTypes.object,
};
TrumioChat.defaultProps = {
  authToken: '',
  targetId: '',
  targetType: '',
  style: {},
  milestoneAttachment: null,
};
