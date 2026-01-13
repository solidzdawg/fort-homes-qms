param(
    [string]$filePath,
    [string]$commitMsg
)

# Add file to git
git add $filePath

# Commit with message
if ($commitMsg) {
    git commit -m $commitMsg
} else {
    git commit -m "Quick save: $filePath"
}

# Optional: push to remote
# git push
