import MatchModelInterface from './MatchModel.interface';

export default interface MatchRepoInterface {
  findAll(): Promise<MatchModelInterface[]>;
}
