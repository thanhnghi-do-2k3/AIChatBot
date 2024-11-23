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
  PromptList: '/prompts',
  Usage: 'subscriptions/me',
};

export default APIEndpoint;