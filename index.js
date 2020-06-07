/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  // app.on('issues.opened', async context => {
  //   const issueComment = context.issue({
  //     body: 'Make sure to include the following:\n' +
  //       '- [ ] What is the purpose of this PR?\n' +
  //       '- [ ] Attach the PR with the issue'
  //   })
  //   return context.github.issues.createComment(issueComment)
  // })

  app.on('pull_request.opened', async context => {
    app.log('pull request was recieved')
    const issue = context.issue()
    issue.labels = ['automerge']
    issue.issue_number = issue.number
    const issueComment = context.issue({
      body: 'Make sure to include the following:\n' +
        '- [ ] What is the purpose of this PR?\n' +
        '- [ ] Attach the PR with the issue'
    })
    await context.github.issues.createComment(issueComment)
    return context.github.issues.addLabels(issue)
  })
}
