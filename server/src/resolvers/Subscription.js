const newLink = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.db.subscription.link(
      { where: { mutation_in: ['CREATED'] } },
      info,
    )
  },
}

const newVote = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.db.subscription.vote(
      { where: { mutation_in: ['CREATED'] } },
      info,
    )
  },
}

const subsToNewHome = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.db.subscription.home(
      { where: { mutation_in: ['CREATED'] } }
    )
  }
}

module.exports = {
  newLink,
  newVote,
  subsToNewHome
}
