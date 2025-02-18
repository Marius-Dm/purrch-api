export class MessageDto {
  to: string;
  subject: string;
  templateId?: string;
  dynamicTemplateData?: {
    [key: string]: any;
  };
  url?: string;
  html?: string;
  from?: string;
  text?: string;
}
