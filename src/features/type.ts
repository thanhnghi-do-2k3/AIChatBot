type PayloadAction = {
  onBegin?: () => void;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
};
