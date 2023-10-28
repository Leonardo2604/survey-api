import { QuestionType } from '../enums/question-type';

export interface NumberQuestionDTO {
  title: string;
  description: string;
  type: QuestionType.NUMBER;
  order: number;
  required?: boolean;
  min?: number;
  max?: number;
}
