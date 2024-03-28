import IService, { IAppContext } from '../types/app';

export default class UserService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  // registers user
  async registerUser(req,res){
    try {
      const {email,password} = req.body
      if(!email || !password){
        return res.status(422).send('no input was received')
      }
      const _user = await this.models.User.findOne({ email});
      if (_user) throw new Error('User already exists');
      
      const user = new this.models.User({email});
      await user.save();
      
      return user
      
    } catch (e) {
      return res.status(500).send(`Error creating new user: ${e}`)
    }
  }

  // login user
  async loginUser(req,res) {
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(500).send('missing required fields')
    }

    const user = await this.models.User.findOne({ email });
    if (!user) {
      return res.status(404).send('user not found');
    }

    try {
      const valid = await user.validatePassword(password);
      console.log(valid)
      if (!valid) {
        return res.status(500).send('password incorrect');
      }
    } catch (e) {
      return res.status(500).send(`error logging in ${e}`)
    }

    return user;
  }
 
  // deletes user account
  async deleteUser(req,res) {
    const user = await this.authenticate_user(req.user._id)
    if(!user){
      return res.status(404).send('Error deleting user')
    }

    try {
      await this.models.User.findByIdAndDelete(req.user._id);
      return res.status(200).send(`Deleted user successfully`);
    } catch (e) {
      return res.status(500).send(`Error deleting user`);
    }
  }

}
