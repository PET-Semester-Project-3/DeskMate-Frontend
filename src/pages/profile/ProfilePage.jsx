import * as React from 'react';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, 
  FormHelperText, IconButton, Box, Avatar, Typography, 
  Chip, TextField, Button
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useSession from '../../models/SessionContext';
import GenericPopout from '../../components/GenericPopout'
import { asyncPutUser, asyncPostNewPassword } from '../../models/api-comm/APIUsers';
import { useSnackbar } from 'notistack';


/* Controller */
export default function ProfilePageController() {

    const { enqueueSnackbar } = useSnackbar();

    const [waitingForResponse, setWaitingForResponse] = React.useState(false);

    const {session, setSession} = useSession();

    const [userEmail, setUserEmail] = React.useState(session?.user?.email);
    const [isUserEmailEdit, setIsUserEmailEdit] = React.useState(false);
    const [userEmailErrorText, setUserEmailErrorText] = React.useState('');

    const [oldPassword, setOldPassword] = React.useState('');
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [oldPasswordErrorText, setOldPasswordErrorText] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('');
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [newPasswordErrorText, setNewPasswordErrorText] = React.useState('')
    const [isPasswordEdit, setIsPasswordEdit] = React.useState(false);

    const SaveNewEmailClick = () => {
        async function putUser(id) {
            setWaitingForResponse(true);
            const user = await asyncPutUser({id, email: userEmail, password: null, mainDeskId: null});
            if (user.id) {
                setSession({...session, user: user})
                setIsUserEmailEdit(false);
                enqueueSnackbar(`Changed email successfully to ${user.email}`, { variant: 'success' });
            }
            else {
                setUserEmailErrorText('Issue occured when trying to change email');
            }
            setWaitingForResponse(false);
        }
        putUser(session?.user?.id);
    }
    const SaveNewPasswordClick = () => {
        async function changePassword(id) {
            setWaitingForResponse(true);
            const result = await asyncPostNewPassword(id, oldPassword, newPassword);
            if (result.success == false && result.message.includes('incorrect')) {
                setOldPasswordErrorText('Old password was incorrect')
            }
            else if (result.success == false && result.message.includes('Failed')) {
                setNewPasswordErrorText('Issue occured when trying to change password')
            }
            else if (result.success) {
                enqueueSnackbar(`Changed password successfully`, { variant: 'success' });
                setOldPassword('');
                setNewPassword('');
                setIsPasswordEdit(false);
            }
            setWaitingForResponse(false);
        }
        changePassword(session?.user?.id);
    }

    return (
        <ProfilePage
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userEmailErrorText={userEmailErrorText}
            isUserEmailEdit={isUserEmailEdit}
            setIsUserEmailEdit={setIsUserEmailEdit}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            showNewPassword={showNewPassword}
            setShowNewPassword={setShowNewPassword}
            newPasswordErrorText={newPasswordErrorText}
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            showOldPassword={showOldPassword}
            setShowOldPassword={setShowOldPassword}
            oldPasswordErrorText={oldPasswordErrorText}
            isPasswordEdit={isPasswordEdit}
            setIsPasswordEdit={setIsPasswordEdit}
            userPages={session?.pages}
            currentUserEmail={session?.user?.email}
            SaveNewEmailClick={SaveNewEmailClick}
            SaveNewPasswordClick={SaveNewPasswordClick}
            waitingForResponse={waitingForResponse}
        />
    )
}

/* View */
export function ProfilePage({ userEmail, setUserEmail, userEmailErrorText, isUserEmailEdit, setIsUserEmailEdit, newPassword, setNewPassword, showNewPassword, setShowNewPassword, newPasswordErrorText, oldPassword, setOldPassword, showOldPassword, setShowOldPassword, oldPasswordErrorText, isPasswordEdit, setIsPasswordEdit, userPages, currentUserEmail, SaveNewEmailClick, SaveNewPasswordClick }) {
    return (
        <Box component='main' id='user-page' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Box 
                component='section' 
                id='user-info-container' 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 550,
                    minHeight: 550,
                    height: 750,
                    minWidth: 450,
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
                        transform: 'scale(1.01, 1.01)',
                        boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                    },
                }} >
                <Box component='section' id='user-avatar-container' sx={{ display: 'flex', justifyContent: 'center', m: 8, mb: 3 }}>
                    <Avatar 
                        variant="square" 
                        sx={{ 
                            width: 150, 
                            height: 150, 
                            fontSize: 48, 
                            bgcolor: '#667eea',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease','&:hover': {
                                transform: 'scale(1.02, 1.02)',
                                boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                            },
                        }}>
                            {currentUserEmail ? currentUserEmail.split('@')[0].slice(0, 2).toUpperCase() : '??'}
                    </Avatar>
                </Box>
                <Typography component='h5' id='user-info-header' variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {currentUserEmail}
                </Typography>
                <Box component='section' id='user-info-pages-container' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 4, width: '80%', height: '20%' }}>
                    <Typography component='h6' id='user-info-pages-header' variant="h6" sx={{ mb: 1, fontWeight: '600' }}>
                        Assigned Permissions:
                    </Typography>
                    <Box component='div' id='user-info-pages-chips' sx={{ display: 'flex' }} >
                        {userPages && userPages.length > 0 ? (
                            userPages.map((page) => (
                                <Chip
                                    label={page.label}
                                    size="small"
                                    sx={{ m: 0.25, width: '100%' }}
                                />
                            ))
                        ) : (
                            <Typography component='p' id='user-info-no-pages-text' variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                ... No pages assigned ...
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box component='div' id='user-info-edit-buttons' sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {
                        userPages?.map(up => up.route).includes('/database') ? (
                            <Button component='form' id='user-info-edit-buttons-useremail' variant='outlined' onClick={() => setIsUserEmailEdit(true)} sx={{ minWidth: 350, width: '80%', fontSize: 18, alignSelf: 'center', mb: 1 }} >Change Email</Button>
                        ) : null
                    }
                    <Button component='form' id='user-info-edit-buttons-password' variant='outlined' onClick={() => setIsPasswordEdit(true)}  sx={{ minWidth: 350, width: '80%', fontSize: 18, alignSelf: 'center' }} >Change Password</Button>
                </Box>
            </Box>
            <GenericPopout header='Change Email' onSaveClick={SaveNewEmailClick} isOpen={isUserEmailEdit} setIsOpen={setIsUserEmailEdit}>
                <TextField
                    component='form'
                    id='user-info-edit-username-textfield'
                    error={userEmailErrorText == '' ? false : true}
                    label='Username'
                    value={userEmail} 
                    onChange={e => setUserEmail(e.target.value)} 
                    helperText={userEmailErrorText}
                    variant='outlined'
                    sx={{ width: '100%', m: 1 }} 
                />
            </GenericPopout>
            <GenericPopout header='Change Password' onSaveClick={SaveNewPasswordClick} isOpen={isPasswordEdit} setIsOpen={setIsPasswordEdit}>
                <FormControl component='form' id='user-info-edit-oldpassword-textfield' sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel component='label' id='user-info-edit-oldpassword-textfield-inputlabel' >Old Password</InputLabel>
                    <OutlinedInput
                        id='user-info-edit-oldpassword-textfield-outlinedinput'
                        error={oldPasswordErrorText == '' ? false : true}
                        label="Old Password"
                        value={oldPassword} 
                        type={showOldPassword ? 'text' : 'password'}
                        onChange={e => setOldPassword(e.target.value)} 
                        endAdornment={
                        <InputAdornment id='user-info-edit-oldpassword-textfield-inputadronment' position="end">
                            <IconButton
                                id='user-info-edit-oldpassword-textfield-iconbutton'
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                edge="end"
                            >
                                {showOldPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    <FormHelperText id='user-info-edit-newpassword-textfield-formhelptertext' error={oldPasswordErrorText == '' ? false : true} >{oldPasswordErrorText}</FormHelperText>
                </FormControl>
                <FormControl component='form' id='user-info-edit-newpassword-textfield' sx={{ m: 1, width: '100%' }} variant="outlined">
                    <InputLabel component='label' id='user-info-edit-newpassword-textfield-inputlabel' >New Password</InputLabel>
                    <OutlinedInput
                        id='user-info-edit-newpassword-textfield-outlinedinput'
                        error={newPasswordErrorText == '' ? false : true}
                        label="New Password"
                        value={newPassword} 
                        type={showNewPassword ? 'text' : 'password'}
                        onChange={e => setNewPassword(e.target.value)} 
                        endAdornment={
                        <InputAdornment id='user-info-edit-newpassword-textfield-inputadronment' position="end">
                            <IconButton
                                id='user-info-edit-newpassword-textfield-iconbutton'
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                edge="end"
                            >
                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    <FormHelperText id='user-info-edit-newpassword-textfield-formhelptertext' error={newPasswordErrorText == '' ? false : true} >{newPasswordErrorText}</FormHelperText>
                </FormControl>
            </GenericPopout>
        </Box>
    )
}