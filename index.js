import mongoose from 'mongoose';

try {
	await mongoose.connect('mongodb://localhost:27017', { dbName: 'test' });
} catch (err) {
	console.log(err);
}

mongoose.set('runValidators', true);

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

let res;
try {
	res = await User.updateOne(
		{ _id: '63cb19035f29c5cf071095e3' },
		{ name: undefined, email: undefined }
	).then(
		(updatedUser) => ({ updatedUser, errUpdateUser: undefined }),
		(errUpdateUser) => ({ errUpdateUser, updatedUser: undefined })
	);
} catch (err) {
	console.log(err);
}

if (!res) {
	console.log('res is undefined');
} else {
	const { updatedUser, errUpdateUser } = res;

	if (!updatedUser) {
		console.log('empty update res');
		if (errUpdateUser) {
			console.log('errUpdateUser: ', errUpdateUser);
		}
	} else if (updatedUser.acknowledged) {
		console.log('acknowledged: ', updatedUser);
	}
}
