var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * MarkedUser Model
 * ==========
 */
var MarkedUser = new keystone.List('MarkedUser');

MarkedUser.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
MarkedUser.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
MarkedUser.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
MarkedUser.defaultColumns = 'name, email, isAdmin';
MarkedUser.register();
