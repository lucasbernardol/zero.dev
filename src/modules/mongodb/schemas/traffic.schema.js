import mongoose, { Schema } from 'mongoose';
import crypto from 'node:crypto';

import { SHORTEN_MODEL_NAME } from './shorten.schema';

export const TRAFFIC_MODEL_NAME = 'Traffic';

const schema = new Schema(
	{
		uuid: {
			type: String,
			trim: true,
			default: () => crypto.randomUUID(),
			select: false,
			required: true,
		},

		shortenId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: SHORTEN_MODEL_NAME,
		},

		userAgent: {
			type: String,
			trim: true,
			required: true,
		},

		browser: {
			type: String,
			trim: true,
			lowercase: true,
			default: null,
		},

		operationSystem: {
			type: String,
			trim: true,
			lowercase: true,
			default: null,
		},

		device: {
			type: String,
			trim: true,
			lowercase: true,
			default: null,
		},

		referrer: {
			type: String,
			trim: true,
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
		toJSON: {
			virtuals: true,
			versionKey: false,
		},
	},
);

export default mongoose.model(TRAFFIC_MODEL_NAME, schema);
