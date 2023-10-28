import { QuestionType } from '../enums/question-type';
import { QuestionOptionDTO } from './question-option.dto';

export interface SelectQuestionDTO {
  title: string;
  description: string;
  type: QuestionType.SELECT;
  order: number;
  required?: boolean;
  options: QuestionOptionDTO[];
}
