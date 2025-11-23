import * as React from 'react';
import useSession from '../../models/SessionContext';
import { asyncGetUserPermissions } from '../../models/api-comm/APIUsers';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, 
  FormHelperText, Box, TextField, Button, IconButton, Card, 
  CardContent, CardActions, Stack, CircularProgress, Radio,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useWindowDimensions from '../../models/WindowDimensions'
import DeskmateInverseSVG from '../../assets/DeskMateInverse.svg'
import DeskmateSVG from '../../assets/DeskMate.svg'
import { useTheme } from '@mui/material/styles';
import { asyncPostLoginUser } from '../../models/api-comm/APIUsers';
import { asyncGetAPIReady } from '../../models/api-comm/APIReady';
import { useNavigate } from 'react-router';

/* Controller */
export default function SignInPageController() {
  
  const [waitingForResponse, setWaitingForResponse] = React.useState(false);

  const { height, width } = useWindowDimensions();
  const { setSession } = useSession();
  const navigate = useNavigate();

  const theme = useTheme();
  const imageSrc = theme.palette.mode == 'dark' ? DeskmateInverseSVG : DeskmateSVG;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginErrorText, setLoginErrorText] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const [errorText, setErrorText] = React.useState('');

  const [apiReady, setAPIReady] = React.useState(false);
  var retryCount = 0;

  const handleUsernameChange = (e) => {
    setEmail(e.target.value)
    if (loginErrorText != '') setLoginErrorText('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (loginErrorText != '') setLoginErrorText('');
  };

  const handleClickShowPassword = () => setShowPassword(() => !showPassword);

  const handleSignInClick = async () => {
    if (apiReady == false) {
      setErrorText('No connection to API')
      return;
    } else {
      setErrorText('');
    }
    setWaitingForResponse(true);
    const result = await asyncPostLoginUser(email, password);
    if (result.success == false) {
      setLoginErrorText('Could not find user or wrong password')
      setWaitingForResponse(false);
      return;
    }
    const session = { user: result, pages: await asyncGetUserPermissions(result.id) };
    setSession(session);
    setWaitingForResponse(false);
    navigate('/howtouse');
  };

  React.useEffect(() => {
    const checkAPIReady = async () =>  {
      try {
        const apiReady = await asyncGetAPIReady();
        if (apiReady.message.includes('Ready')) {
          setAPIReady(true);
          if (retryCount != 1) retryCount = 1;
          setErrorText('');
        }
        else
          setAPIReady(false);
      } catch {
        setErrorText(`Could not connect to API, retrying in 5 seconds. (${retryCount}/10)`);
        setAPIReady(false);
        retryCount++;
      }
    }
    checkAPIReady();
    const interval = setInterval(() => {
      if (retryCount == 10) {
        clearInterval(interval);
        setErrorText(`Retried ${retryCount} times, cancelling further retries. Please ensure connections and try again.`);
        setAPIFailed(true);
        return;
      }
      checkAPIReady();
    }, 5*1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SignInPage
      apiReady={apiReady}
      windowHeight={height}
      windowWidth={width}
      imageSrc={imageSrc}
      username={email} 
      changeUsername={handleUsernameChange}
      usernameErrorText={loginErrorText}
      password={password} 
      changePassword={handlePasswordChange}
      passwordErrorText={loginErrorText}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      signinButtonClick={handleSignInClick}
      errorText={errorText}
      waitingForResponse={waitingForResponse}
    />
  );
}

/* View */
export function SignInPage({ apiReady, windowHeight, imageSrc, username, changeUsername, usernameErrorText, password, changePassword, passwordErrorText, showPassword, handleClickShowPassword, signinButtonClick, errorText, waitingForResponse }) {
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
              <InputLabel component='label' id='signin-password-textfield-inputlabel' error={passwordErrorText == '' ? false : true} >Password</InputLabel>
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
            <Typography component='label' id='signin-form-actions' sx={{ pt: 2, color: 'red', maxWidth: 350 }}>
              {errorText}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions component='section' id='signin-form-actions' sx={{ justifyContent: 'center' }}>
          <Box component='div' id='signin-button-container' sx={{ mb: 1, position: 'relative' }}>
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
                pl: 4, pr: 4, mb: 4,
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
