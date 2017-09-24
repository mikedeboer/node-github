const chai = require('chai')
const fixtures = require('@octokit/fixtures')

const GitHub = require('../../')

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
chai.should()

describe('api.github.com', () => {
  it.skip('(#587) add-labels-to-issue-test', () => {
    const GitHubMock = fixtures.mock('api.github.com/add-labels-to-issue')
    const githubUserA = new GitHub()

    githubUserA.authenticate({
      type: 'token',
      token: '0000000000000000000000000000000000000000'
    })

    return githubUserA.issues.create({
      owner: 'octokit-fixture-org',
      repo: 'add-labels-to-issue',
      title: 'Issue without a label'
    })

    .then(() => {
      return githubUserA.issues.addLabels({
        owner: 'octokit-fixture-org',
        repo: 'add-labels-to-issue',
        number: 1,
        labels: [
          'Foo',
          'bAr',
          'baZ'
        ]
      })
    })

    .then((response) => {
      GitHubMock.pending().should.deep.equal([])
    })

    .catch(GitHubMock.explain)
  })
})
