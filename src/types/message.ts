/** Message data contract used by the dashboard conversation mock. */
export interface Message {
  id: string;
  sender: string;
  text: string;
  sentAt: string;
  isOwner: boolean;
}
