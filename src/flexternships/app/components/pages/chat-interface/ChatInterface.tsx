'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import SimpleElevatedCard from '@flexternships/app/components/core/cards/SimpleElevatedCard';
import Spinner from '@flexternships/app/components/core/Spinner';
import Styles from '@flexternships/styles/pages/chat-interface/chat-interface.module.css';
import ProjectCard from '@flexternships/app/components/core/cards/ProjectCard';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  projects?: Array<{
    title: string;
    description: string;
    domain?: string;
    milestones?: Array<{
      title: string;
      description: string;
      time: string;
      roles: string[];
      deliverables: string[];
    }>;
    skills?: string[];
    tools?: string[];
    duration?: string;
    teamSize?: number;
  }>;
  domain?: string;
};

type Project = {
  title: string;
  description: string;
  domain?: string;
  milestones?: Array<{
    title: string;
    description: string;
    time: string;
    roles: string[];
    deliverables: string[];
  }>;
  skills?: string[];
  tools?: string[];
  duration?: string;
  teamSize?: number;
};

type WebSocketMessage = {
  message_type: 'initial' | 'clarification' | 'number_request' | 'projects' | 'error';
  content: any;
  projects?: Array<Project>;
  num_projects?: number;
  domain?: string;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Array<any>>([]);
  const ws = useRef<WebSocket | null>(null);
  const chatRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found in localStorage');
      navigate('/login');
      return;
    }
//ws://localhost:8000/ws-bulk-generation
// wss://tru-dev-api.trumio.ai/ai-assist/api/v1/ws-bulk-generation?token=${token}
    ws.current = new WebSocket(`wss://tru-dev-api.trumio.ai/ai-assist/api/v1/ws-bulk-generation?token=${token}`);
    
    if (ws.current) {
      ws.current.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Handle potential token expiration or other auth errors
      };
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [navigate]);

  const handleWebSocketMessage = (data: WebSocketMessage) => {
    switch (data.message_type) {
      case 'initial':
      case 'clarification':
      case 'number_request':
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        setIsLoading(false);
        break;
      case 'projects':
        setProjects(data.content.projects);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Generated ${data.content.num_projects} ${data.content.domain} projects successfully!`,
          projects: data.content.projects.map((project: Project) => ({
            ...project,
            domain: data.content.domain,
            milestones: project.milestones || [],
            skills: project.skills || [],
            tools: project.tools || [],
            duration: project.duration,
            teamSize: project.teamSize
          })),
          domain: data.content.domain
        }]);
        setIsLoading(false);
        break;
      case 'error':
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        setIsLoading(false);
        break;
    }
  };

  const handleButtonClick = () => {
    if (!input.trim() || isLoading || !ws.current) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    ws.current.send(JSON.stringify({ message: input }));
    setInput('');
    setIsLoading(true);
  };

  const onBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flexternships-page p-6">
      <PrimaryIconText
        onClick={onBack}
        className={'mb-2.5'}
        text="AI Chat Assistant"
        icon={<ArrowLeft className={'text-white'} size={18} />}
        bgDark
      />
      <SimpleElevatedCard className={Styles.chatContainer}>
        <div className={Styles.messagesArea} ref={chatRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`${Styles.messageWrapper} ${msg.role === 'user' ? Styles.userMessage : Styles.assistantMessage}`}>
              <div className={`${Styles.messageContent} ${msg.role === 'user' ? 'bg-blue-500 rounded-lg p-3' : ''}`}>
                {msg.content}
                {msg.projects && (
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    {msg.projects.map((project, projectIdx) => (
                      <ProjectCard
                        key={projectIdx}
                        title={project.title}
                        description={project.description}
                        domain={msg.domain}
                        milestones={project.milestones}
                        tech_stack={project.skills}
                        total_duration_weeks={project.duration ? parseInt(project.duration) : undefined}
                        roles={project.roles}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
        </div>
        
        <form onSubmit={handleButtonClick} className={Styles.inputArea}>
          <div className={Styles.inputWrapper}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className={Styles.input}
              placeholder="Type your request (e.g., 'Generate 5 BFSI projects')"
            />
            <PrimaryButton
              onClick={handleButtonClick}
              disabled={isLoading}
              className={Styles.sendButton}
            >
              Send
            </PrimaryButton>
          </div>
        </form>
      </SimpleElevatedCard>
    </div>
  );
} 