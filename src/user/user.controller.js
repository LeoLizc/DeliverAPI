
import User from './user.model';

export async function getUsers(req, res) {

  try {

    const users = await User.find();
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json(err);
  }

}

export async function signup(req, res) {
  try {
    // console.log(req.body);
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log('Error creating user, type: ', err.name);
    // console.error(err);
    if (err.name === 'ValidationError') {
      res.status(400).json(err);
    } else if (err.name === 'MongoError') {
      res.status(409).json(err);
    } else {
      res.status(500).json(err);
    }
  }
}

export async function login(req, res) {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });

    // verify user and Compare password
    if (!user || ! await user.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // return the User
    res.status(200).json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function patchUser(req, res) {

  res.send('Endpoint to patch a user not implemented yet');

}

export async function deleteUser(req, res) {

  // res.send('Endpoint to delete a user not implemented yet');
  try {

    const { id } = req.params;
    const element = await User.findOne({ _id: id });

    if (!element) {
      return res.status(404).json({ message: 'User not found' });
    }

    await element.delete();
    res.status(200).json({ message: 'User deleted' });

  } catch (err) {
    res.status(500).json(err);
  }

}