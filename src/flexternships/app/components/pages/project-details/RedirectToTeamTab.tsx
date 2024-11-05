'use client';
import { Navigate, useParams } from 'react-router-dom';

export default function RedirectToTeamTab() {
  //   navigate to teams route
  const params = useParams();
  return <Navigate to={`/project-details/${params.projectId}/team`} />;
}
