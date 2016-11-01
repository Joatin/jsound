import * as Joi from 'joi';
import {Schema} from "joi";

export const CredentialsSchema: Schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(3).max(30).required()
});