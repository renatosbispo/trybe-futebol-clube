import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  declare id: number;

  declare username: string;

  declare role: string;

  declare email: string;

  declare password: string;
}

UserModel.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    username: {
      allowNull: false,
      unique: true,
      type: STRING,
    },
    role: {
      allowNull: false,
      type: STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: STRING,
    },
    password: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    tableName: 'users',
  },
);

export default UserModel;
