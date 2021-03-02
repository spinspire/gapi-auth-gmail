# Google API, Authentication, and GMail

This is a demo of Google API (gapi), Google Auth, and reading and
sending emails via GMail.

For more learning and education visit https://youtube.com/spinspire.
For help with your projects and business inquiries visit https://spinspire.com/

# Project Template Info

This project was derived from the application template at
https://github.com/spinspire/template-svelte-snowpack. So please read
the README there for development process details.

# How to use this

- copy `gapi-client-config.ts.example` to `gapi-client-config.ts` and
  enter your client-id into it.
```
yarn
yarn bulid
yarn dev
```
- Follow the Google Developer Console steps as outlined below.

# Evolution of the program

These are the steps I followed to develop this project. I'm documenting them
here for my own records.

- Do the Firebase steps only if you want to host on Firebase.
- Install firebase-tools `sudo npm install -g firebase-tools`
- `firebase init` and then add Firebase Hosting. Create project if needed.
- Add `gapi` and types -- `yarn add gapi-client && yarn add -D @types/gapi`
- Go to https://console.developers.google.com/ and find this project. Find
  the `Web client (auto created by Google Service)` OAuth 2.0 client-id. That's
  the client-id for your app.
- Enable GMail API in that project.
- Load gapi auth client with `gapi.load()`
- Initialize with `gapi.client.init({clientId, scope, discoveryDocs})`.
  And then ... 
```
const googleAuth = gapi.auth2.getAuthInstance();
googleAuth.currentUser.listen(u => $user = u);
if (googleAuth.isSignedIn.get()) {
  $user = googleAuth.currentUser.get();
} else {
  googleAuth.signIn();
}
```
- 
