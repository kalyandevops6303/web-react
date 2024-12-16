import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import SimpleElevatedCard from '@flexternships/app/components/core/cards/SimpleElevatedCard';
import Spinner from '@flexternships/app/components/core/Spinner';
import Styles from '@flexternships/styles/pages/chat-interface/chat-interface.module.css';
import ProjectCard from '@flexternships/app/components/core/cards/ProjectCard';
import { MessageRole, MessageType } from '@flexternships/enums/core-enums';
import { wsEndpoints } from '@flexternships/utils/api';
import { ChatMessage, WebSocketMessage } from '@flexternships/types/core-types';
import { getCookiesItem } from '@/utility/cookiesControl';

const formatWebSocketMessage = (data: WebSocketMessage): ChatMessage => {
  switch (data.message_type) {
    case MessageType.INITIAL:
    case MessageType.CLARIFICATION:
    case MessageType.NUMBER_REQUEST:
    case MessageType.ERROR:
      return { role: MessageRole.ASSISTANT, content: data.content };
    case MessageType.PROJECTS:
      return {
        role: MessageRole.ASSISTANT,
        content: data.content,
        projects: data.content.projects,
        domain: data.content.domain,
      } as ChatMessage;
    default:
      return { role: MessageRole.ASSISTANT, content: 'Unsupported message type' };
  }
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_projects, setProjects] = useState<Array<any>>([]);
  const ws = useRef<WebSocket | null>(null);
  const chatRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookiesItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    ws.current = new WebSocket(`${wsEndpoints.bulkGeneration}?token=${token}`);

    if (ws.current) {
      ws.current.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      };
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [navigate]);

  const handleWebSocketMessage = (data: WebSocketMessage) => {
    if (data.message_type === MessageType.PROJECTS) {
      setProjects(data.content.projects);
    }

    const formattedMessage = formatWebSocketMessage(data);
    setMessages((prev) => [...prev, formattedMessage]);
    setIsLoading(false);
  };

  const handleButtonClick = () => {
    if (!input.trim() || isLoading || !ws.current) return;

    setMessages((prev) => [...prev, { role: MessageRole.USER, content: input }]);
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
            <div
              key={idx}
              className={`${Styles.messageWrapper} ${
                msg.role === MessageRole.USER ? Styles.userMessage : Styles.assistantMessage
              }`}
            >
              <div
                className={`${Styles.messageContent} ${
                  msg.role === MessageRole.USER ? 'bg-blue-500 rounded-lg p-3' : ''
                }`}
              >
                {(typeof msg.content === 'string' || !msg.projects) &&
                  (typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content))}

                {msg.projects && (
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    {msg.projects.map((project, projectIdx) => (
                      <ProjectCard
                        key={projectIdx}
                        title={project.title}
                        description={project.description}
                        domain={msg.domain}
                        milestones={project.milestones?.map((milestone, i) => ({ ...milestone, index: i }))}
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
            <PrimaryButton onClick={handleButtonClick} disabled={isLoading} className={Styles.sendButton}>
              Send
            </PrimaryButton>
          </div>
        </form>
      </SimpleElevatedCard>
    </div>
  );
}
