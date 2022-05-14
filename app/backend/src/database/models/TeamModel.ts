import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import MatchModel from './MatchModel';

class TeamModel extends Model {
  public id!: number;

  public teamName!: string;
}

TeamModel.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    teamName: {
      allowNull: false,
      type: STRING,
      field: 'team_name',
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    tableName: 'teams',
  },
);

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'homeTeamInfo' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'awayTeamInfo' });

TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeam', as: 'homeMatches' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeam', as: 'awayMatches' });

export default TeamModel;
