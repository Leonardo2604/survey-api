import { QuestionType } from '../enums/question-type';

export interface DateQuestionDTO {
  title: string;
  description: string;
  type: QuestionType.DATE;
  order: number;
  required?: boolean;
  min?: Date;
  max?: Date;
}
