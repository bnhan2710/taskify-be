import passport from 'passport';
import passportGoogle  from 'passport-google-oauth20'
import usersService from '../../../modules/user/users.service';
import { env } from '../../../core/configs/env.config';
import { BadRequestError,NotFoundError } from '../../../core/handler/error.response';
const GoogleStrategy = passportGoogle.Strategy;

export function useGoogleStrategy(){ passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/v1/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, done) {
        try{
            if(!profile._json.email){
                throw new BadRequestError('User does not have email');
            }
            const user = await usersService.getUserByEmail(profile._json.email);
            if(!user){
                const newUser = {
                    email: profile._json.email,
                    fullName: profile._json.name,
                    username: profile._json.email,
                    password: '',
                    avatar: profile._json.picture
                }
                // console.log(newUser);
                await usersService.create(newUser);
                return done(null,newUser);
            }
            return done(null,user);
        }catch(err){
            console.log(err);
            return done(err);
        }
  }
))

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });

}  