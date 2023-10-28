import { Survey } from '@/domain/entities/survey';
import { SurveyRepository } from '@/domain/repositories/survey.repository';

export class SurveyInMemoryRepository implements SurveyRepository {
  items: Survey[] = [];

  async createSurvey(survey: Survey): Promise<void> {
    this.items.push(survey);
  }
}
