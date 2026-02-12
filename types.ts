
export enum AppState {
  QUESTION = 'QUESTION',
  LOADING = 'LOADING',
  FINAL = 'FINAL'
}

export interface UserResponse {
  id: string;
  selected_percentage: string;
  timestamp: number;
}
