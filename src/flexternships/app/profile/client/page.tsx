'use client';

import { Check, ChevronLeft, Database, Heart, Link2, Twitter, Linkedin, Users } from 'react-feather';
import PrimaryIconText from '../../components/core/buttons/PrimaryIconText';
import ExpandableText from '../../components/core/ExpandableText';
import { useEffect, useRef, useState } from 'react';

import defaultAvatar from '@flexternships/assets/icons/core/default-avatar.jpg';
import linkedinIcon from '@flexternships/assets/icons/brands/linkedin.svg';
import SecondaryButton from '../../components/core/buttons/SecondaryButton';
import {
  FlexternClientProjectDetails,
  FlexternClientPublicProfileDetails,
} from '@/flexternships/constraints/types/user-profile-types';
import { getClientCompletedProjects, getClientPublicDetails } from '@/flexternships/services/dashboard-service';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/core/Spinner';
import { clientDelegateRoleText } from '@/flexternships/static/profile-content';
import { isEmpty } from 'lodash';
import SimpleElevatedCard from '../../components/core/cards/SimpleElevatedCard';
import emptyProjectsGif from '@flexternships/assets/gifs/search-placeholder.gif';
import CustomBreadCrumbs from '../../components/core/CustomBreadCrumbs';

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

  const getLinkIcon = (link: string) => {
    switch (link) {
      case 'linkedin':
        return <img src={linkedinIcon} className="size-[18px]" />;
      case 'twitter':
        return <Twitter size={18} />;
      default:
        return <Link2 size={18} />;
    }
  };

  const scrollToDelegates = () => {
    delegatesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const viewProject = (projectId: string) => {
    navigate(`/project-details/${projectId}`);
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
      navigate('/dashboard'); // Fallback to dashboard if no history
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
      {/* TODO: Add Breadcrumbs */}
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
          <div className="flex flex-col gap-y-6 bg-white rounded-md shadow-card p-5">
            <div className="flex flex-col items-center gap-y-3">
              {/* Commented out for now - may need it add later */}
              {/* <div className="flex flex-row self-stretch justify-end">
                <span className="cursor-pointer">
                  <Heart size={24} className="text-error" />
                </span>
              </div> */}
              <div className="size-[120px]">
                <img
                  className="w-full h-full object-contain"
                  src={clientDetails?.companyDetails?.companyLogo || defaultAvatar}
                />
              </div>
              <div className="text-lg text-grey-heading font-medium">
                {clientDetails?.companyDetails?.companyName || 'Unknown Company'}
              </div>
              <div className="flex flex-row gap-x-2.5">
                <div className="size-11">
                  <img
                    className="w-full h-full object-contain rounded-full"
                    src={clientDetails?.imageUri || defaultAvatar}
                  />
                </div>
                <div>
                  <div className="text-grey-500 text-lg font-semibold leading-7">
                    {clientDetails?.firstname || ''} {clientDetails?.lastname || ''}
                  </div>
                  <div className="text-sm text-grey-heading font-normal leading-5">
                    {clientDetails?.title || 'Unknown Title'}
                  </div>
                </div>
              </div>
            </div>
            {!isDelegatesInView && clientDetails?.delegates && clientDetails.delegates.length > 0 && (
              <div>
                <PrimaryIconText
                  icon={<Users size={18} className="text-trublue-secondary-500" />}
                  text="View All Delegates"
                  onClick={scrollToDelegates}
                />
              </div>
            )}
            <div>
              <div className="pb-2 text-lg font-medium text-grey-heading border-b-1 border-grey-border">Details</div>
              <div className="flex flex-col gap-y-5 pt-4">
                <div className="flex flex-row gap-x-2">
                  <span className="text-sm text-grey font-semibold">Department:</span>
                  <span className="text-sm text-grey font-normal">
                    {clientDetails?.companyDetails?.companyName || 'Unknown Company'}
                  </span>
                </div>
                <div className="flex flex-row w-[350px] gap-x-2">
                  <span className="text-sm text-grey font-semibold">Location:</span>
                  <span className="text-sm text-grey font-normal">
                    {[
                      `B. No. ${clientDetails?.officeAddress?.buildingNumber}`,
                      clientDetails?.officeAddress?.streetAddress,
                      clientDetails?.officeAddress?.city,
                      clientDetails?.officeAddress?.state,
                      clientDetails?.officeAddress?.country,
                      clientDetails?.officeAddress?.zipCode,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div className="text-sm text-grey font-semibold">Social Links</div>
                  <div className="flex flex-row flex-wrap gap-x-2">
                    {clientDetails?.socialLinks?.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        className="cursor-pointer p-2.5 rounded-full text-trublue bg-trublue-light"
                      >
                        {getLinkIcon(link.platform)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-row justify-center">
              <SecondaryButton className="m-0" onClick={() => { }}>
                Message
              </SecondaryButton>
            </div> */}
          </div>
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
          <div className="bg-white rounded-md shadow-card p-6">
            <div className="text-base font-semibold text-grey-heading mb-4">Company Tagline</div>
            <div className="text-grey text-sm font-light">
              <ExpandableText charLimit={200}>
                {clientDetails?.companyDetails?.companyTagline || 'Unknown Tagline'}
              </ExpandableText>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 bg-white rounded-md shadow-card p-6">
            <div className="text-lg font-semibold text-grey-heading">Recent Projects</div>
            <div className="flex flex-row flex-wrap gap-6">
              {!isEmpty(clientProjectDetails) &&
                clientProjectDetails.projects.length > 0 &&
                clientProjectDetails.projects.map(
                  (project: { id: string; name: string; description: string; roles: string[] }, index: number) => (
                    <div
                      key={index}
                      className="w-[471px] flex flex-col gap-y-2 bg-white shadow-card rounded-md p-5 overflow-hidden"
                    >
                      <div className="flex flex-col gap-y-4 grow">
                        <div className="flex flex-col gap-y-3">
                          <div className="self-start text-grey-heading text-lg font-semibold leading-[26px] line-clamp-4">
                            {project.name}
                          </div>
                          <div className="flex flex-row items-center gap-x-2">
                            <div className="text-grey text-sm font-normal leading-[21px]">Roles</div>
                            <div className="flex flex-row flex-wrap gap-1">
                              {project.roles.map((role: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-4 py-1 text-[#005EFF] text-sm font-normal leading-4.5 border-1 border-[#005EFF] rounded-[4px]"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-grey font-normal leading-5.5 break-words grow">
                          <ExpandableText charLimit={300}>{project.description}</ExpandableText>
                        </div>
                      </div>
                      <div className="flex flex-row justify-center">
                        <span
                          onClick={() => viewProject(project.id)}
                          className="underline text-trublue-secondary-500 text-sm font-normal tracking-wide cursor-pointer"
                        >
                          View Project
                        </span>
                      </div>
                    </div>
                  ),
                )}
              {isProjectsLoading ? (
                <div className="flex flex-row justify-center items-center w-full">
                  <div className="size-10">
                    <Spinner />
                  </div>
                </div>
              ) : (
                isEmpty(clientProjectDetails.projects) && (
                  <SimpleElevatedCard className="pt-4 pb-5 w-full">
                    <div className="flex flex-col justify-center items-center">
                      <img className="h-[150px] w-[171px] object-cover" src={emptyProjectsGif} alt="No Projects" />
                      <span className="text-grey-300 text-sm font-medium tracking-wide -mt-2.5">
                        No Recent Projects Found
                      </span>
                    </div>
                  </SimpleElevatedCard>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
