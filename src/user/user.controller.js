
import User from './user.model';

export async function getUser(req, res) {

  res.send('Endpoint to get a user not implemented yet');

}

export async function createUser(req, res) {
  try {
    res.send('Endpoint to create a user not implemented yet');
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchUser(req, res) {

  res.send('Endpoint to patch a user not implemented yet');

}

export async function deleteUser(req, res) {

  res.send('Endpoint to delete a user not implemented yet');

}