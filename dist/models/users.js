"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUID = void 0;
const sequelize_1 = require("sequelize");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
exports.UUID = {
    type: "UUID",
    defaultValue: uuid_1.v4,
    allowNull: false,
};
exports.default = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            // define association here
            User.hasMany(models.Tweet, {
                foreignKey: "userId",
                as: "user",
            });
        }
    }
    User.init({
        id: Object.assign(Object.assign({}, exports.UUID), { primaryKey: true }),
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "User",
        // tableName: "Users",
        defaultScope: {
            attributes: { exclude: ["password"] },
        },
        hooks: {
            beforeCreate: (user, options) => __awaiter(void 0, void 0, void 0, function* () {
                const hashedPassword = yield bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }),
            beforeUpdate: (user, options) => __awaiter(void 0, void 0, void 0, function* () {
                if (user.changed("password")) {
                    const hashedPassword = yield bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                }
            }),
        },
    });
    return User;
};
//# sourceMappingURL=users.js.map