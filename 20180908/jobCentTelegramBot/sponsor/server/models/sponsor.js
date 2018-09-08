'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sponsor = sequelize.define('Sponsor', {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descrition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rewards: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    
  }, {});
  Sponsor.associate = function(models) {
    // associations can be defined here
  };
  return Sponsor;
};