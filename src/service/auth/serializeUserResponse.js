function serializeUserResponse(user) {
  return {
    email: user.email,
    subscription: user.subscription,
  };
}

function serializeUserSignIn(user) {
  return {
    user: serializeUserResponse(user),
    token: user.token,
  };
}

module.exports = {
  serializeUserResponse,
  serializeUserSignIn,
};
