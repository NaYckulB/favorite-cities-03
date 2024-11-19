import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './favorite_cities.db', 
});

const City = sequelize.define('City', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    lon: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
})();

export const addCity = async (cityData) => {
    try {
        const city = await City.create(cityData);
        return city;
    } catch (error) {
        console.error('Error adding city:', error);
        throw error;
    }
};

export const removeCity = async (name) => {
    try {
        const result = await City.destroy({
            where: { name },
        });
        return result;
    } catch (error) {
        console.error('Error removing city:', error);
        throw error;
    }
};

const db = {
    sequelize,
    City,
};

export default db;
