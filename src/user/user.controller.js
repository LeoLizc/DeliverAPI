
import User from './user.model';

export async function getUser(req, res) {
  // const { name } = req.query;

  const user = await User.find(req.query);

  res.status(200).json(user);
}

export async function createUser(req, res) {
  try {
    const { name } = req.body;
    const user = new User({ name });
    const resultado = await user.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchUser(req, res) {
  res.status(200).json({});
}

export async function deleteUser(req, res) {
  res.status(200).json({});
}