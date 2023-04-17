import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    // campos
    name: { type: String, required: [true, 'Nombra tu empanada.'] },
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
    address: {
      type: String,
      required: [true, 'Ingresa tu dirección.'],
      // ? Should we add a minlength or match to validate the address?
    },
    // * Roles: "cliente", "domiciliario", "administrador de restaurante"
    role: {
      type: String,
      enum: ['cliente', 'domiciliario', 'administrador de restaurante'],
      default: 'cliente'
    },
  },
  { timestamps: true }
);

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


export default mongoose.model('User', UserSchema);