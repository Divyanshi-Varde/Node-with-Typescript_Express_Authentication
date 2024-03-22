import fs from "fs";
import path from "path";
import { promisify } from "util";
import { User } from "../types/user-data.types";
import { SUCCESS_MESSAGES,ERROR_MESSAGES } from "../constants/constants";

const users: User[] = require("../assets/users-data.json");
const filePath = path.join(__dirname, "../assets", "users-data.json");

// Promisify the fs.writeFile function
const writeFileAsync = promisify(fs.writeFile);

export const getServices = async (): Promise<any> => {
    return { users: users };
}

export const readServices = async (id: number): Promise<any> => {
    const user = users.find((user) => user.id === id);
    return { user: user };
}

export const updateServices = async (body: any, id: number): Promise<any> => {
    const user = users.find((user) => user.id === id);
    if (!user) {
        return { message: ERROR_MESSAGES.USER_NOT_FOUND, code: 404 };
    }
    const updatedUser = { ...user, ...body };
    const index = users.findIndex((user) => user.id === id);
    users[index] = updatedUser;

    try {
        await writeFileAsync(filePath, JSON.stringify(users));
        return {message:SUCCESS_MESSAGES.UPDATED, user: updatedUser, code: 200 };
    } catch (error) {
        console.error(error);
        return { message: ERROR_MESSAGES.NOT_UPDATED, code: 500 };
    }
}

export const deleteServices = async (id: number): Promise<any> => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return { message:ERROR_MESSAGES.USER_NOT_FOUND, code: 404 };
    }
    const deletedUser = users.splice(index, 1)[0];

    try {
        await writeFileAsync(filePath, JSON.stringify(users));
        return { message:SUCCESS_MESSAGES.DELETED,user: deletedUser, code: 200 };
    } catch (error) {
        console.error(error);
        return { message: ERROR_MESSAGES.NOT_DELETED, code: 500 };
    }
}
