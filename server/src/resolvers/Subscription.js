const newLink = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.db.subscription.link()
  },
}

const newVote = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.db.subscription.vote()
  },
}

const subsToNewHome = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.db.subscription.home({}, info)
  }
}

module.exports = {
  newLink,
  newVote,
  subsToNewHome
}
