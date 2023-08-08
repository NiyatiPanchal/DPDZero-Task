"use strict";
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
exports.deleteData = exports.updateData = exports.getData = exports.addData = void 0;
const customErrors_1 = require("../utils/customErrors");
const Data_1 = require("../models/Data");
function addData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { key, value } = req.body;
            if (!key) {
                throw new customErrors_1.InvalidInput({
                    message: "The provided key is not valid or missing.",
                    code: "INVALID_KEY",
                });
            }
            if (!value) {
                throw new customErrors_1.InvalidInput({
                    message: "The provided value is not valid or missing.",
                    code: "INVALID_VALUE",
                });
            }
            // Check if the key already exists
            const existingData = yield Data_1.Data.findOne({
                where: {
                    key,
                },
            });
            if (existingData) {
                throw new customErrors_1.InvalidInput({
                    message: "The provided key already exists in the database. To update an existing key, use the update API.",
                    code: "KEY_EXISTS",
                });
            }
            // Create the data entry in the database
            yield Data_1.Data.create(Object.assign({}, req.body));
            // Respond with success message
            return res.status(201).json({
                status: "success",
                message: "Data stored successfully.",
            });
        }
        catch (error) {
            if (error instanceof customErrors_1.InvalidInput) {
                next(error);
            }
            else {
                throw new customErrors_1.InvalidInput({
                    message: "Internal server error occurred. Please try again later.",
                    code: "INTERNAL_ERROR",
                }, 500);
            }
        }
    });
}
exports.addData = addData;
function getData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { key } = req.params;
            // Find data by the provided key
            const data = yield Data_1.Data.findOne({
                where: {
                    key,
                },
            });
            if (!data) {
                throw new customErrors_1.InvalidInput({
                    message: "The provided key does not exist in the database.",
                    code: "KEY_NOT_FOUND",
                });
            }
            return res.status(200).json({
                status: "success",
                data: {
                    key: data.key,
                    value: data.value,
                },
            });
        }
        catch (error) {
            if (error instanceof customErrors_1.InvalidInput) {
                next(error);
            }
            else {
                throw new customErrors_1.InvalidInput({
                    message: "Internal server error occurred. Please try again later.",
                    code: "INTERNAL_ERROR",
                }, 500);
            }
        }
    });
}
exports.getData = getData;
function updateData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { key } = req.params;
            const { value } = req.body;
            // Find data by the provided key
            const data = yield Data_1.Data.findOne({
                where: {
                    key,
                },
            });
            if (!data) {
                throw new customErrors_1.InvalidInput({
                    message: "The provided key does not exist in the database.",
                    code: "KEY_NOT_FOUND",
                });
            }
            // Update the value and save the data
            data.value = value;
            yield data.save();
            return res.status(200).json({
                status: "success",
                message: "Data updated successfully.",
            });
        }
        catch (error) {
            if (error instanceof customErrors_1.InvalidInput) {
                next(error);
            }
            else {
                throw new customErrors_1.InvalidInput({
                    message: "Internal server error occurred. Please try again later.",
                    code: "INTERNAL_ERROR",
                }, 500);
            }
        }
    });
}
exports.updateData = updateData;
function deleteData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { key } = req.params;
            // Find data by the provided key
            const data = yield Data_1.Data.findOne({
                where: {
                    key,
                },
            });
            if (!data) {
                throw new customErrors_1.InvalidInput({
                    message: "The provided key does not exist in the database.",
                    code: "KEY_NOT_FOUND",
                });
            }
            // Delete the data
            yield data.destroy();
            return res.status(200).json({
                status: "success",
                message: "Data deleted successfully.",
            });
        }
        catch (error) {
            if (error instanceof customErrors_1.InvalidInput) {
                next(error);
            }
            else {
                throw new customErrors_1.InvalidInput({
                    message: "Internal server error occurred. Please try again later.",
                    code: "INTERNAL_ERROR",
                }, 500);
            }
        }
    });
}
exports.deleteData = deleteData;
