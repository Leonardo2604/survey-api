import { Survey } from '../entities/survey';

export interface SurveyRepository {
  createSurvey(survey: Survey): Promise<void>;
}
