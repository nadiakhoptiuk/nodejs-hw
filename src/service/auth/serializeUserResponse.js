function serializeUserResponse(user) {
  return {
    id: user._id,
    email: user.email,
    subscription: user.subscription,
  };
}

function serializeUserSignIn(user, token) {
  return {
    user: serializeUserResponse(user),
    token,
  };
}

module.exports = { serializeUserResponse, serializeUserSignIn };
