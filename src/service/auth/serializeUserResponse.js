function serializeUserResponse(user) {
  return {
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
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
