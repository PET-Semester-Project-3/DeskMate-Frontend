import * as React from 'react';
import useSession from '../../models/SessionContext';
import { getRoutesForUser } from '../../models/RoutePermissions'
import { FormControl, OutlinedInput, InputLabel, InputAdornment, FormHelperText, Box, TextField, Button, IconButton, Card, CardContent, CardActions, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useWindowDimensions from '../../models/WindowDimensions'
import DeskmateInverseSVG from '../../assets/DeskMateInverse.svg'
import DeskmateSVG from '../../assets/DeskMate.svg'
import { useTheme } from '@mui/material/styles';
import { USERS } from '../../../dummyData/dummyData';

/* Controller */
export default function SignInPageController() {
  
  const { height, width } = useWindowDimensions();
  const { session, setSession } = useSession();

  const theme = useTheme();
  const imageSrc = theme.palette.mode == 'dark' ? DeskmateInverseSVG : DeskmateSVG;

  const [username, setUsername] = React.useState('');
  const [usernameErrorText, setUsernameErrorText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordErrorText, setPasswordErrorText] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    if (usernameErrorText != '') setUsernameErrorText('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (passwordErrorText != '') setPasswordErrorText('');
  };

  const handleClickShowPassword = () => setShowPassword(() => !showPassword);

  const handleSignInClick = () => {
    const user = USERS.find(user => user.username == username);
    if (user == undefined) {
      setUsernameErrorText('Could not find user')
      return;
    }
    if (user.password != password){
      setPasswordErrorText('Wrong password')
      return;
    }
    console.log({ user: user, pages: getRoutesForUser(user.id) })
    setSession({ user: user, pages: getRoutesForUser(user.id) });
  };

  return (
    <SignInPage 
      windowHeight={height}
      imageSrc={imageSrc}
      username={username} 
      changeUsername={handleUsernameChange}
      usernameErrorText={usernameErrorText}
      password={password} 
      changePassword={handlePasswordChange}
      passwordErrorText={passwordErrorText}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      signinButtonClick={handleSignInClick}
    />
  );
}

/* View */
export function SignInPage({ windowHeight, imageSrc, username, changeUsername, usernameErrorText, password, changePassword, passwordErrorText, showPassword, handleClickShowPassword, signinButtonClick }) {
  return (
    <Box
      component='main'
      id='signin-page'
      sx={{
        height: windowHeight, 
        boxShadow: 2, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
      <Card
        component='section'
        id='signin-form-card'
      >
        <CardContent
          component='section'
          id='signin-form-content'
        >
          <Box component='div' id='deskmake-logo-image-container' sx={{ m: 1 }}>
            <img id='deskmate-logo-image' height='200' src={imageSrc} />
          </Box>
          <Stack component='ol' id='signin-textfield-stack' spacing={1} sx={{ alignItems: 'center', mr: 5 }} >
            <TextField
              component='form'
              id='signin-username-textfield'
              error={usernameErrorText == '' ? false : true}
              label='Username'
              value={username} 
              onChange={changeUsername} 
              variant='outlined'
              helperText={usernameErrorText}
              sx={{ width: '100%' }} 
            />
            <FormControl component='form' id='signin-password-textfield' sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel component='label' id='signin-password-textfield-inputlabel' >Password</InputLabel>
              <OutlinedInput
                id='signin-password-textfield-outlinedinput'
                error={passwordErrorText == '' ? false : true}
                label="Password"
                value={password} 
                type={showPassword ? 'text' : 'password'}
                onChange={changePassword} 
                endAdornment={
                  <InputAdornment id='signin-password-textfield-inputadronment' position="end">
                    <IconButton
                      id='signin-password-textfield-iconbutton'
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id='signin-password-textfield-formhelptertext'>{passwordErrorText}</FormHelperText>
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions component='section' id='signin-form-actions' sx={{ justifyContent: 'center' }}>
          <Button
            component='button'
            id='signin-button'
            variant='contained'
            size='large'
            onClick={signinButtonClick}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              },
              width: '75%',
              ml: 4, mr: 4, mb: 4,
            }}
          >Sign in</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
