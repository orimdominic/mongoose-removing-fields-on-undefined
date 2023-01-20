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
		{ name: undefined, password: undefined },
		{ new: true, fields: { _id: 0 } }
	).then(
		(updatedUser) => ({ updatedUser, errUpdateUser: undefined }),
		(errUpdateUser) => ({ errUpdateUser, updatedUser: undefined })
	);
} catch (err) {
	console.log(err);
}

const { updatedUser, errUpdateUser } = res;

if (updatedUser && updatedUser.ok) {
	console.log('res.ok');
	console.log(updatedUser);
} else {
	console.log('update not ok: ', errUpdateUser);
	console.log(errUpdateUser);
}
