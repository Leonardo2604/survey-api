import { QuestionType } from '../enums/question-type';

export interface EmailQuestionDTO {
  title: string;
  description: string;
  type: QuestionType.EMAIL;
  order: number;
  required?: boolean;
}
