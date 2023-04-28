import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export const roles = Object.freeze({
  CLIENTE: 'cliente',
  DOMICILIARIO: 'domiciliario',
  ADMINISTRADOR: 'administrador de restaurante'
})

const AddressSchema = Schema(
  {
    // campos
    address: {
      type: String,
      required: [true, 'Ingresa tu dirección.'],
      // ? Should we add a minlength or match to validate the address?
    },
    // the coordinates of the address
    latitude: {
      type: Number,
      required: [true, 'Ingresa la latitud de tu dirección.'],
    },
    longitude: {
      type: Number,
      required: [true, 'Ingresa la longitud de tu dirección.'],
    }
  },
  { timestamps: true }
);

export const Address = model('Address', AddressSchema);

const UserSchema = Schema(
  {
    // campos
    name: { type: String, required: [true, 'El nombre es requerido'] },
    email: {
      type: String,
      required: [true, 'Ingresa tu email.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Ingresa tu contraseña.'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres.']
    },
    phone: {
      type: String,
      required: [true, 'Ingresa tu número de teléfono.'],
      minlength: [10, 'El número de teléfono debe tener al menos 10 caracteres.']
    },
    // * Roles: "cliente", "domiciliario", "administrador de restaurante"
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.CLIENTE
    },
  },
  { timestamps: true }
);

UserSchema.virtual('addresses', {
  ref: 'Address',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

/**
 * @description - Remove password from user object
 * @method toJSON
 * @memberof UserSchema
 * @param {Object} user - User object
 * @returns {Object} - User object without password
 */
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

/**
 * @description - Compare password with user password
 * 
 * @param {String} password - Password to compare
 * @returns {Boolean} - True if password matches
 */
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * @description - Hash password before saving user
 * 
 * @param {Function} next - Next function
 * @returns {Function} - Next function
 */
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

/**
 * @description - overwrite create method to accept address
 */
UserSchema.statics.create = async function (data) {
  const { address, ...rest } = data;
  const user = new this(rest);
  if (address) {
    const newAddress = new Address({ ...address, user: user._id });
    await newAddress.save();
  }
  await user.save();
  return user;
};

export const User = model('User', UserSchema);
export default User;