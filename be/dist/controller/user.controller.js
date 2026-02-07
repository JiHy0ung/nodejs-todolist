"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../model/User"));
const saltRounds = 10;
const userController = {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await User_1.default.findOne({ email });
            if (user)
                throw new Error("이미 가입된 유저입니다.");
            const salt = bcryptjs_1.default.genSaltSync(saltRounds);
            const hash = bcryptjs_1.default.hashSync(password, salt);
            const newUser = new User_1.default({ name, email, password: hash });
            await newUser.save();
            res.status(200).json({ status: "success" });
        }
        catch (err) {
            res.status(400).json({ status: "fail", error: err });
        }
    },
    async loginWithEmail(req, res) {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (user) {
            const isMatch = bcryptjs_1.default.compareSync(password, user.password);
            if (isMatch) {
            }
        }
    },
};
exports.default = userController;
