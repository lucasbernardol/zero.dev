import mongoose, { Schema } from 'mongoose';
import crypto from 'node:crypto';

export const SHORTEN_MODEL_NAME = 'Shorten';

const schema = new Schema(
	{
		uuid: {
			type: String,
			required: true,
			default: () => crypto.randomUUID(),
			select: false,
		},

		href: {
			type: String,
			trim: true,
			maxLength: 2048,
			required: true,
		},

		hash: {
			type: String,
			trim: true,
			unique: true,
			index: true,
			required: true,
		},

		redirectings: {
			type: Number,
			default: 0,
			required: false,
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

schema.virtual('trattics', {
	localField: '_id',
	foreignField: 'shortenId',
	ref: 'Traffic',
	justOne: false,
});

export default mongoose.model(SHORTEN_MODEL_NAME, schema);
