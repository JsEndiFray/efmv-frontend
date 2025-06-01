export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  messageId?: string;
  to?: string;
}
