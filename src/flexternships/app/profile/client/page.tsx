// 'use client'; // For NextJS App

// External dependencies
import { Check, ChevronLeft, Database } from 'react-feather';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Assets
import defaultAvatar from '@flexternships/assets/icons/core/default-avatar.jpg';

// Types
import {
  FlexternClientProjectDetails,
  FlexternClientPublicProfileDetails,
} from '@/flexternships/constraints/types/user-profile-types';

// Services
import { getClientCompletedProjects, getClientPublicDetails } from '@/flexternships/services/dashboard-service';

// Static content
import { clientDelegateRoleText } from '@/flexternships/static/content/profile-content';
import routes from '@/flexternships/routes';

// Components
import PrimaryIconText from '../../components/core/buttons/PrimaryIconText';
import Spinner from '../../components/core/Spinner';
import CustomBreadCrumbs from '../../components/core/CustomBreadCrumbs';
import ClientRecentProjects from '../../components/pages/profile/client/public-profile/ClientRecentProjects';
import ClientProfileCard from '../../components/pages/profile/client/public-profile/ClientProfileCard';
import ClientCompanyTagline from '../../components/pages/profile/client/public-profile/ClientCompanyTagline';

export default function ClientPublicProfile() {
  const [clientDetails, setClientDetails] = useState<FlexternClientPublicProfileDetails>();

  const defaultMetadata = {
    currentPage: 0,
    pageSize: 0,
    totalRecords: 0,
    hasNextPage: true,
  };
  const [clientProjectDetails, setClientProjectDetails] = useState<FlexternClientProjectDetails>({
    metadata: defaultMetadata,
    projects: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [isDelegatesInView, setIsDelegatesInView] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveClientDetails = async () => {
      if (!userId) {
        throw new Error('Invalid page url or user id not found');
      }
      const data = await getClientPublicDetails(userId);
      setClientDetails(data);
      setIsLoading(false);
    };
    retrieveClientDetails();
  }, [userId, getClientPublicDetails]);

  useEffect(() => {
    fetchMoreProjects();
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        !isProjectsLoading &&
        clientProjectDetails.metadata.hasNextPage
      ) {
        fetchMoreProjects();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [clientProjectDetails.metadata.hasNextPage, isProjectsLoading]);

  const delegatesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDelegatesInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (delegatesRef.current) {
      observer.observe(delegatesRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading]);

  const fetchMoreProjects = async () => {
    if (!userId) {
      throw new Error('Invalid page url or user id not found');
    }
    setIsProjectsLoading(true);
    const data = await getClientCompletedProjects(userId, clientProjectDetails.metadata.currentPage + 1);
    setClientProjectDetails((cur: any) => ({
      metadata: data?.metadata || defaultMetadata,
      projects: [...cur.projects, ...(data?.projects || [])],
    }));
    setIsProjectsLoading(false);
  };

  const scrollToDelegates = () => {
    delegatesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Handles navigation when user clicks back
   * If there is browser history, goes back one page
   * Otherwise redirects to dashboard as fallback
   */
  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Go back one page in history
    } else {
      navigate(routes.dashboard.path); // Fallback to dashboard if no history
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-row justify-center items-center h-screen">
        <div className="size-10">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flexternships-page">
      <div className="mb-6">
        <CustomBreadCrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: `${clientDetails?.firstname || ''} ${clientDetails?.lastname || ''}` },
          ]}
        />
      </div>
      <div className="flex flex-row gap-x-5">
        <div className="flex flex-col gap-y-6 min-w-[350px]">
          {clientDetails && (
            <ClientProfileCard
              clientDetails={clientDetails}
              isDelegatesInView={isDelegatesInView}
              scrollToDelegates={scrollToDelegates}
            />
          )}
          {clientDetails?.delegates && clientDetails?.delegates.length > 0 && (
            <div ref={delegatesRef} className="flex flex-col gap-y-6 p-6 pt-4 bg-white rounded-md shadow-card">
              <div className="flex flex-row items-center gap-x-3">
                <span className="text-grey-heading text-lg font-medium leading-7">Delegate(s)</span>
                <span className="text-grey text-xs font-normal leading-5">
                  ({clientDetails.delegates.length} members)
                </span>
              </div>
              {clientDetails.delegates.map((delegate, index) => (
                <div className="flex flex-row gap-x-3" key={index}>
                  <div className="size-11">
                    <img
                      className="w-full h-full object-contain rounded-full"
                      src={delegate.imageUri || defaultAvatar}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="text-grey-heading text-sm font-medium leading-5">
                      {delegate.firstname} {delegate.lastname}
                    </div>
                    {delegate.delegateType && (
                      <div className="px-2 py-[1px] text-[#0D6EFD] text-xs font-semibold leading-4.5 rounded-2xl border-1 border-[#0D6EFD]">
                        {clientDelegateRoleText[delegate.delegateType]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col grow gap-y-5 max-w-5xl">
          <div className="self-start px-1">
            <PrimaryIconText
              icon={<ChevronLeft size={18} className="text-trublue-secondary-500" />}
              text="Back"
              onClick={goBack}
            />
          </div>
          <div className="flex flex-row gap-x-6">
            {clientDetails?.openListingsCount !== undefined && (
              <div className="flex flex-row justify-between items-center shadow-card min-w-60 rounded-md bg-white px-5 py-6">
                <div className="flex flex-col gap-y-2">
                  <div className="text-grey-heading text-xl font-semibold">{clientDetails.openListingsCount}</div>
                  <div className="text-sm text-grey font-light">Open Listings</div>
                </div>
                <div className="text-orange bg-orange-light rounded-full p-3">
                  <Database size={24} />
                </div>
              </div>
            )}
            {clientDetails?.completedProjectsCount !== undefined && (
              <div className="flex flex-row justify-between items-center shadow-card min-w-60 rounded-md bg-white px-5 py-6">
                <div className="flex flex-col gap-y-2">
                  <div className="text-grey-heading text-xl font-semibold">{clientDetails.completedProjectsCount}</div>
                  <div className="text-sm text-grey font-light">Completed Projects</div>
                </div>
                <div className="text-success bg-success bg-opacity-10 rounded-full p-3">
                  <Check size={24} />
                </div>
              </div>
            )}
          </div>
          <ClientCompanyTagline tagline={clientDetails?.companyDetails?.companyTagline || 'Unknown Tagline'} />
          <ClientRecentProjects
            clientProjectDetails={clientProjectDetails}
            isProjectsLoading={isProjectsLoading}
            clientDepartmentName={clientDetails?.department || 'Unknown Department'}
          />
        </div>
      </div>
    </div>
  );
}
