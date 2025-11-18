import * as React from 'react';
import useSession from '../../models/SessionContext';
import { asyncGetUserPermissions, asyncPostUser } from '../../models/api-comm/APIUsers';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, 
  FormHelperText, Box, TextField, Button, IconButton, Card, 
  CardContent, CardActions, Stack, CircularProgress, Radio
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useWindowDimensions from '../../models/WindowDimensions'
import DeskmateInverseSVG from '../../assets/DeskMateInverse.svg'
import DeskmateSVG from '../../assets/DeskMate.svg'
import { useTheme } from '@mui/material/styles';
import { asyncPostLoginUser } from '../../models/api-comm/APIUsers';
import { asyncGetAPIReady } from '../../models/api-comm/APIReady';

/* Controller */
export default function SignInPageController() {
  
  const [waitingForResponse, setWaitingForResponse] = React.useState(false);

  const { height, width } = useWindowDimensions();
  const { session, setSession } = useSession();

  const theme = useTheme();
  const imageSrc = theme.palette.mode == 'dark' ? DeskmateInverseSVG : DeskmateSVG;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const [apiReady, setAPIReady] = React.useState(false);

  const handleUsernameChange = (e) => {
    setEmail(e.target.value)
    if (errorText != '') setErrorText('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (errorText != '') setErrorText('');
  };

  const handleClickShowPassword = () => setShowPassword(() => !showPassword);

  const handleSignInClick = async () => {
    setWaitingForResponse(true);
    const user = await asyncPostLoginUser(email, password);
    if (!user) {
      setErrorText('Could not find user or wrong password')
      setWaitingForResponse(false);
      return;
    }
    const session = { user: user, pages: await asyncGetUserPermissions(user.id) };
    setSession(session);
    setWaitingForResponse(false);
  };

  const signupButtonClick = async () => {
    setWaitingForResponse(true);
    const user = await asyncPostUser(email, password);
    if (!user) {
      setErrorText('Could not create user with those credentials')
      setWaitingForResponse(false);
      return;
    }
    const session = { user: user, pages: []};
    setSession(session);
    setWaitingForResponse(false);
  }

  React.useEffect(() => {
    async function checkAPIReady() {
      setWaitingForResponse(true);
      const apiReady = await asyncGetAPIReady();
      if (apiReady.message.includes('Ready'))
        setAPIReady(true);
      else
        setAPIReady(false);
      setWaitingForResponse(false);
    }
    checkAPIReady();
  }, []);

  return (
    <SignInPage
      apiReady={apiReady}
      windowHeight={height}
      imageSrc={imageSrc}
      username={email} 
      changeUsername={handleUsernameChange}
      usernameErrorText={errorText}
      password={password} 
      changePassword={handlePasswordChange}
      passwordErrorText={errorText}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      signinButtonClick={handleSignInClick}
      signupButtonClick={signupButtonClick}
      waitingForResponse={waitingForResponse}
    />
  );
}

/* View */
export function SignInPage({ apiReady, windowHeight, imageSrc, username, changeUsername, usernameErrorText, password, changePassword, passwordErrorText, showPassword, handleClickShowPassword, signinButtonClick, signupButtonClick,waitingForResponse }) {
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
              <FormHelperText id='signin-password-textfield-formhelptertext' error={passwordErrorText == '' ? false : true} >{passwordErrorText}</FormHelperText>
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions component='section' id='signin-form-actions' sx={{ justifyContent: 'center' }}>
          <Box component='div' id='signin-button-container' sx={{ m: 2, position: 'relative' }}>
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
                width: '100%',
                pl: 4, pr: 4, mb: 2,
              }}
            >
              {waitingForResponse ?
                <CircularProgress 
                  component='div' 
                  id='signin-button-circularprogress'
                  size={24}
                  sx={{
                    color: 'white',
                  }}
                />
                : 'Sign in'
              }
            </Button>
            <Button
              component='button'
              id='signup-button'
              variant='contained'
              size='small'
              onClick={signupButtonClick}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                },
                width: '75%',
                ml: 4, mr: 4, mb: 4,
              }}
            >
              {waitingForResponse ?
                <CircularProgress 
                  component='div' 
                  id='signup-button-circularprogress'
                  size={18}
                  sx={{
                    color: 'white',
                  }}
                />
                : 'Sign up'
              }
            </Button>
          </Box>
        </CardActions>
      </Card>
        <Box component='footer' id='signin-page-footer' sx={{ position: 'absolute', bottom: 10, textAlign: 'center', width: '100%' }}>
          {
            apiReady ?
              <Radio
                component='span'
                id='signin-api-ready-indicator'
                checked
                color='success'
                size='small'
              /> :
              <Radio
                component='span'
                id='signin-api-not-ready-indicator'
                checked
                color='error'
                size='small'
              />
          }
          <Box component='span' id='signin-api-status-text' sx={{ fontSize: 12, ml: 1 }}>
            { apiReady
              ? 'API is available'
              : 'API is not available'
            }
          </Box>
        </Box>
    </Box>
  );
}
