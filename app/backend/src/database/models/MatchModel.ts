import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class MatchModel extends Model {
  public id!: number;

  public homeTeam!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awayTeamGoals!: number;

  public inProgress: boolean;
}

MatchModel.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeam: {
      type: INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      field: 'home_team',
    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
      field: 'home_team_goals',
    },
    awayTeam: {
      type: INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      field: 'away_team',
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
      field: 'away_team_goals',
    },
    inProgress: {
      allowNull: false,
      type: BOOLEAN,
      field: 'in_progress',
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    tableName: 'matches',
  },
);

export default MatchModel;
