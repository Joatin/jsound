import * as Joi from 'joi';
import {Schema} from "joi";

export const ClientCredentialsSchema: Schema = Joi.object().keys({
    controllerId: Joi.string().required(),
    controllerSecret: Joi.string().required()
});