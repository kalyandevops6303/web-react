'use client';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function RedirectToTeamTab() {
  //   navigate to teams route
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    navigate(`/project-details/${params['projectId']}/team`);
  }, [navigate, params]);
  return null;
}
