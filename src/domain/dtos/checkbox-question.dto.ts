import { QuestionType } from '../enums/question-type';
import { QuestionOptionDTO } from './question-option.dto';

export interface CheckboxQuestionDTO {
  title: string;
  description: string;
  type: QuestionType.CHECKBOX;
  order: number;
  required?: boolean;
  options: QuestionOptionDTO[];
}
