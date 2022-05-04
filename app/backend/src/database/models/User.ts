import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public id!: number;

  public username!: string;

  public role!: string;

  public email!: string;

  public password!: string;
}

User.init(
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

export default User;
