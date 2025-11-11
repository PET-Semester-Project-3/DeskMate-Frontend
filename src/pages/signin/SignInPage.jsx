import * as React from 'react';
import { useSessionContext } from '../../SessionContext';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, FormHelperText, Box, TextField, Button, IconButton, Card, CardContent, CardActions, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useWindowDimensions from '../../useWindowDimensions'
import DeskmateInverseSVG from '../../assets/DeskMateInverse.svg'
import DeskmateSVG from '../../assets/DeskMate.svg'
import { useTheme } from '@mui/material/styles';
import { USERS } from '../../../dummyData/dummyData';

/* Controller */
export default function SignInPageController() {
  
  const { height, width } = useWindowDimensions();
  const sessionContext = useSessionContext();

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
    if (!USERS.map(user => user.username).includes(username)) {
      setUsernameErrorText('Could not find user')
      return;
    }
    if (!USERS.map(user => user.password).includes(password)){
      setPasswordErrorText('Wrong password')
      return;
    }
    sessionContext.setSession({ username: username, password: password });
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
    <Box sx={{ 
        height: windowHeight, 
        boxShadow: 2, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
      <Card>
        <CardContent>
          <Box sx={{ m: 1 }}>
            <img height='200' src={imageSrc} />
          </Box>
          <Stack spacing={1} sx={{ alignItems: 'center', ml: 4, mr: 4 }} >
            <TextField
              error={usernameErrorText == '' ? false : true}
              label='Username'
              value={username} 
              onChange={changeUsername} 
              variant='outlined'
              helperText={usernameErrorText}
              sx={{ width: '100%' }} 
            />
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                error={passwordErrorText == '' ? false : true}
                label="Password"
                value={password} 
                type={showPassword ? 'text' : 'password'}
                onChange={changePassword} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{passwordErrorText}</FormHelperText>
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
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
