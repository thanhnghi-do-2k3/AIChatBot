type PayloadActions = {
  action?: {
    onBegin?: () => void;
    onSuccess?: (data?: any) => void;
    onFailure?: (error?: any) => void;
  };
};
