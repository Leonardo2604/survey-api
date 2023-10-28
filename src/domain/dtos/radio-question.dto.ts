import { QuestionType } from '../enums/question-type';
import { QuestionOptionDTO } from './question-option.dto';

export interface RadioQuestionDTO {
  title: string;
  description: string;
  type: QuestionType.RADIO;
  order: number;
  required?: boolean;
  options: QuestionOptionDTO[];
}
