import { QuestionType } from '../enums/question-type';

export interface ColorQuestionDTO {
  title: string;
  description: string;
  type: QuestionType.COLOR;
  order: number;
  required?: boolean;
}
