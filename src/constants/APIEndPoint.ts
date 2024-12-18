export const APIEndpoint = {
  // Authentication
  SignIn: '/auth/sign-in',
  GoogleSignIn: '/auth/google-sign-in',
  CurrentUser: '/auth/me',
  SignUp: '/auth/sign-up',
  SignOut: '/auth/sign-out',
  GetRefreshToken: '/auth/refresh',
  DoAIChat: '/ai-chat',
  GetConversations: '/ai-chat/conversations',
};

export const KB_APIEndpoint = {
  // Authentication
  SignIn: '/auth/external-sign-in',
  GetRefreshToken: '/auth/refresh',

  CreateAssistant: 'ai-assistant',
  GetAssistant: 'ai-assistant',
};
