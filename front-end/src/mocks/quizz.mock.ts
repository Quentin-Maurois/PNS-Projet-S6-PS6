import { Question } from './question.mock';
export const Quizz = [
  {
    id: '1',
    name: 'Les Acteurs',
    theme: 'Actor',
    questions: [],
  },
  {
    id: '2',
    name: 'Les technos WEB',
    questions: [],
  },
  {
    id: '3',
    name: 'La révolution française',
    theme: 'Histoire',
    questions: [Question[0]],
  }
];
