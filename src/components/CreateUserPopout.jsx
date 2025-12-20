import * as React from "react"
import {
  Backdrop,
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import { asyncGetPermissions } from "../models/api-comm/APIPermission"
import { asyncPostUserWithPermissions } from "../models/api-comm/APIUsers"
import { useSnackbar } from 'notistack';

export default function CreateUserPopoutController({ isOpen, onClose, onCreated }) {
  const { enqueueSnackbar } = useSnackbar();

  const [permissions, setPermissions] = React.useState([])
  const [selectedPermissions, setSelectedPermissions] = React.useState(new Set())
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [saving, setSaving] = React.useState(false)
  const [emailErrorText, setEmailErrorText] = React.useState('')
  const [passwordErrorText, setPasswordErrorText] = React.useState('')

  React.useEffect(() => {
    async function load() {
      const perms = await asyncGetPermissions()
      setPermissions(perms || [])
    }
    if (isOpen) load()
  }, [isOpen])

  const onTogglePermission = (id) => {
    const s = new Set(selectedPermissions)
    if (s.has(id)) s.delete(id)
    else s.add(id)
    setSelectedPermissions(s)
  }

  const onCreate = async () => {
    if (!email) return // required
    setSaving(true)
    const permissionIds = Array.from(selectedPermissions)
    const resp = await asyncPostUserWithPermissions({ email, password, permissionIds})
    setSaving(false)
    if (resp && resp.success !== false) {
      onCreated && onCreated(resp.data)
      onClose && onClose()
      if (emailErrorText != '') setEmailErrorText('');
      if (password != '') setPasswordErrorText('');
      enqueueSnackbar(`Successfully created: ${email}`, { variant: 'success' });
    } else {
      console.error("Failed to create user", resp)
      setEmailErrorText(resp.message);
      setPasswordErrorText(resp.message);
      // keep the popup open and allow user to retry
    }
  }

  return (
    <Backdrop open={isOpen} sx={{ zIndex: 200 }}>
      <Box sx={{ width: "75%", maxWidth: 800 }}>
        <Paper sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ color: "#667eea", fontWeight: 700 }}>
              Create User
            </Typography>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Box>
          <Box sx={{ m: 1, mr: 3 }}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              helperText={emailErrorText}
              error={emailErrorText}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ m: 1 }}
            />
            <TextField
              fullWidth
              label="Password"
              value={password}
              helperText={passwordErrorText}
              error={passwordErrorText}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ m: 1 }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Permissions</Typography>
            <FormGroup>
              {permissions.map((p) => (
                <FormControlLabel
                  key={p.id}
                  control={
                    <Checkbox
                      checked={selectedPermissions.has(p.id)}
                      onChange={() => onTogglePermission(p.id)}
                    />
                  }
                  label={`${p.label} (${p.route})`}
                />
              ))}
            </FormGroup>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={onCreate} disabled={saving}>
              Create
            </Button>
          </Box>
        </Paper>
      </Box>
    </Backdrop>
  )
}
