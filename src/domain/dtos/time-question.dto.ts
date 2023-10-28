import { QuestionType } from '../enums/question-type';

export interface TimeQuestionDTO {
  title: string;
  description: string;
  type: QuestionType.TIME;
  order: number;
  required?: boolean;
  min?: string;
  max?: string;
}
