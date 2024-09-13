/*eslint-disable */

import React from 'react';
import PropTypes from 'prop-types'; 


const PermissionWrapper = ({ permissions, permissionName, children }) => {
  const hasPermission = (permissions, permissionName) => {
    const parts = permissionName[0].split(".");
    let current = permissions;

    for (let part of parts) {
      if (current[part] === undefined) {
        return false;
      }
      current = current[part];
    }

    return current === true;
  };

  return hasPermission(permissions, permissionName) ? <>{children}</> : null;
};

export default PermissionWrapper;

PermissionWrapper.propTypes = {
  permissions: PropTypes.object.isRequired,
  permissionName: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};

