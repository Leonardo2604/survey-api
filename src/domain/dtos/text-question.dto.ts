import { QuestionType } from '../enums/question-type';

export interface TextQuestionDTO {
  title: string;
  description: string;
  type: QuestionType.TEXT;
  order: number;
  required?: boolean;
  isLongText?: boolean;
  minLength?: number;
  maxLength?: number;
}
