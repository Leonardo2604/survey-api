import { CheckboxQuestionDTO } from '../dtos/checkbox-question.dto';
import { ColorQuestionDTO } from '../dtos/color-question.dto';
import { DateQuestionDTO } from '../dtos/date-question.dto';
import { EmailQuestionDTO } from '../dtos/email-question.dto';
import { NumberQuestionDTO } from '../dtos/number-question.dto';
import { RadioQuestionDTO } from '../dtos/radio-question.dto';
import { SelectQuestionDTO } from '../dtos/select-question.dto';
import { TextQuestionDTO } from '../dtos/text-question.dto';
import { TimeQuestionDTO } from '../dtos/time-question.dto';
import { CheckboxQuestion } from '../entities/checkbox-question';
import { ColorQuestion } from '../entities/color-question';
import { DateQuestion } from '../entities/date-question';
import { EmailQuestion } from '../entities/email-question';
import { NumberQuestion } from '../entities/number-question';
import { QuestionOption } from '../entities/question-option';
import { RadioQuestion } from '../entities/radio-question';
import { SelectQuestion } from '../entities/select-question';
import { Survey } from '../entities/survey';
import { TextQuestion } from '../entities/text-question';
import { TimeQuestion } from '../entities/time-question';
import { QuestionType } from '../enums/question-type';
import { SurveyRepository } from '../repositories/survey.repository';

interface Params {
  title: string;
  description: string;
  questions: (
    | TextQuestionDTO
    | TimeQuestionDTO
    | EmailQuestionDTO
    | DateQuestionDTO
    | NumberQuestionDTO
    | ColorQuestionDTO
    | CheckboxQuestionDTO
    | RadioQuestionDTO
    | SelectQuestionDTO
  )[];
}

interface Result {
  survey: Survey;
}

export class CreateSurveyUseCase {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  async handle({ title, description, questions }: Params): Promise<Result> {
    const survey = Survey.create({
      title,
      description,
      questions: [],
    });

    questions.forEach((question) => {
      switch (question.type) {
        case QuestionType.TEXT: {
          const q = TextQuestion.create({
            ...question,
            surveyId: survey.id,
          });

          survey.addQuestion(q);
          break;
        }
        case QuestionType.TIME: {
          const q = TimeQuestion.create({
            ...question,
            surveyId: survey.id,
          });

          survey.addQuestion(q);
          break;
        }
        case QuestionType.EMAIL: {
          const q = EmailQuestion.create({
            ...question,
            surveyId: survey.id,
          });

          survey.addQuestion(q);
          break;
        }
        case QuestionType.DATE: {
          const q = DateQuestion.create({
            ...question,
            surveyId: survey.id,
          });

          survey.addQuestion(q);
          break;
        }
        case QuestionType.NUMBER: {
          const q = NumberQuestion.create({
            ...question,
            surveyId: survey.id,
          });

          survey.addQuestion(q);
          break;
        }
        case QuestionType.COLOR: {
          const q = ColorQuestion.create({
            ...question,
            surveyId: survey.id,
          });

          survey.addQuestion(q);
          break;
        }
        case QuestionType.CHECKBOX: {
          const q = CheckboxQuestion.create({
            ...question,
            surveyId: survey.id,
            options: [],
          });

          question.options.forEach((option) => {
            q.addOption(
              QuestionOption.create({
                ...option,
                questionId: q.id,
              }),
            );
          });

          survey.addQuestion(q);
          break;
        }
        case QuestionType.RADIO: {
          const q = RadioQuestion.create({
            ...question,
            surveyId: survey.id,
            options: [],
          });

          question.options.forEach((option) => {
            q.addOption(
              QuestionOption.create({
                ...option,
                questionId: q.id,
              }),
            );
          });

          survey.addQuestion(q);
          break;
        }
        case QuestionType.SELECT: {
          const q = SelectQuestion.create({
            ...question,
            surveyId: survey.id,
            options: [],
          });

          question.options.forEach((option) => {
            q.addOption(
              QuestionOption.create({
                ...option,
                questionId: q.id,
              }),
            );
          });

          survey.addQuestion(q);
          break;
        }
      }
    });

    await this.surveyRepository.createSurvey(survey);

    return {
      survey,
    };
  }
}
