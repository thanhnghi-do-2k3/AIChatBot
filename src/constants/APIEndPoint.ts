export const APIEndpoint = {
  // Authentication
  SignIn: '/auth/sign-in',
  GoogleSignIn: '/auth/google-sign-in',
  CurrentUser: '/auth/me',
  SignUp: '/auth/sign-up',
  SignOut: '/auth/sign-out',
  GetRefreshToken: '/auth/refresh',
  DoAIChat: '/ai-chat/messages',
  GetConversations: '/ai-chat/conversations',
  EmailSuggestions: '/ai-email/reply-ideas',
  EmailResponse: '/ai-email',
};

export const KB_APIEndpoint = {
  // Authentication
  SignIn: '/auth/external-sign-in',
  GetRefreshToken: '/auth/refresh',
  // Chatbot
  CreateAssistant: 'ai-assistant',
  GetAssistant: 'ai-assistant',
  //Knowledge Base
  CreateKnowledgeBase: 'knowledge',
  GetKnowledgeBase: 'knowledge',
};
