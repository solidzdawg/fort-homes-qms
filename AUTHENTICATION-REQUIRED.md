# GitHub Authentication Required

The token has been exposed in the conversation. **You must regenerate it immediately.**

## Steps to regenerate your GitHub token:

1. **Go to GitHub Settings:**
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"

2. **Configure token:**
   - **Name:** fort-homes-qms-automation
   - **Expiration:** 90 days
   - **Scopes:** Check only `repo` (Full control of private repositories)

3. **Copy the new token** (shown only once)

4. **Update `.github-auth.ps1`:**
   - Open: `C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms\.github-auth.ps1`
   - Replace the `$GITHUB_TOKEN` value with your new token

5. **Test the commit script:**
   ```powershell
   cd 'C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms'
   .\commit.ps1 "test: Verify new token works"
   ```

## Quick commit workflow (once token is updated):

```powershell
.\commit.ps1 "Your commit message here"
```

That's it! The script will:
- ✅ Stage all changes
- ✅ Create a commit
- ✅ Push to GitHub automatically
- ✅ Show the result

## Your current auth config is at:
`C:\Users\Zacha\Desktop\fort-homes-qms\fort-homes-qms\.github-auth.ps1`

⚠️ **IMPORTANT:** Never share this file or the token with anyone. Never commit it to GitHub (it's in `.gitignore`).
