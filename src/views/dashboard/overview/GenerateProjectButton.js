import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { userData } from '../../../redux/selectors/dashboardSelectors';
import { userTypes } from '../../../utility/constants/Constant';

const GenerateProjectButton = () => {
  const navigate = useNavigate();
  const userDetailsData = useSelector(userData);
  const [hasAyeshaBotAccess, setHasAyeshaBotAccess] = useState(false);

  useEffect(() => {
    const checkPermittedFeatures = async () => {
      try {
        const response = await axios.get('https://tru-dev-api.trumio.ai/user/api/v1/features/permitted-features', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        const features = response.data?.data || [];
        setHasAyeshaBotAccess(features.some(feature => feature.feature_name === "Ayesha Bot"));
      } catch (error) {
        console.error('Error fetching permitted features:', error);
        setHasAyeshaBotAccess(false);
      }
    };

    checkPermittedFeatures();
  }, []);

  if (!hasAyeshaBotAccess || userDetailsData?.user_type !== userTypes.client) {
    return null;
  }

  return (
    <Button
      color="primary"
      className="me-1"
      onClick={() => navigate('/chat-interface')}
    >
      Generate Project
    </Button>
  );
};

export default GenerateProjectButton;