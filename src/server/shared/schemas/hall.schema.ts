import * as Joi from 'joi';
import {Schema} from "joi";

export const HallSchema: Schema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(3).max(50).required(),
    address2: Joi.string().min(3).max(50),
    city: Joi.string().min(3).max(50).required(),
    zipCode: Joi.string().regex(/^\d+$/).min(5).max(5).required()
});