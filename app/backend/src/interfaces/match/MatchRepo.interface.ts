import MatchModelInterface from './MatchModel.interface';

export default interface MatchRepoInterface {
  create(data: Omit<MatchModelInterface, 'id'>): Promise<MatchModelInterface>;
  findAll(): Promise<MatchModelInterface[]>;
  update(id: number, newData: Partial<MatchModelInterface>): Promise<void>;
}
