# Self-Assessment

## Login Component

### Initial Implementation

Initially, the Login component was designed to handle traditional email and password authentication. Users would enter their credentials, and the component would validate them against the server. While this approach worked, it required users to remember yet another set of login details, which could be cumbersome.

### Adding Google Login

To enhance the user experience, we integrated Google login into the Login component. This allowed users to authenticate using their Google accounts, streamlining the login process and reducing the need to remember additional credentials. The integration was achieved using the @react-oauth/google library, which provided a seamless way to handle Google OAuth authentication.

### Implementation Details

The Google login was implemented using the useGoogleLogin hook from the @react-oauth/google library. Upon successful authentication, the user's profile information was fetched from the Google API and stored in the application's state and local storage. This allowed the application to recognize the user across sessions.

```
const gLogin = useGoogleLogin({
  onSuccess: (codeResponse) => setUser(codeResponse),
  onError: (error) => console.log("Login Failed:", error),
});
```

### Challenges with Persisting User Data

One of the significant challenges we faced was persisting user data across page refreshes. Initially, the profile information would be lost upon refreshing the page, causing the user to be logged out. To address this, we implemented local storage to save the user's profile data.

Another challenge was the lack of knowledge of using useEffect at the time. UseEffect was introduced during the next lecture, which would've made implementation significantly easier.

```
useEffect(() => {
  if (user && user.access_token) {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data));
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log("Error fetching user info:", err));
  }
}, [user]);
```

By storing the profile data in local storage, we ensured that the user's information persisted across sessions. This improvement significantly enhanced the user experience, allowing users to remain logged in even after refreshing the page. However, this approach is not very data secure, and needs to be changed in future versions. Some future approaches would be to instead store user data in a database, or use a state management library like Redux.

### Conclusion

The addition of Google login to the Login component has greatly improved the user experience by providing a quick and easy authentication method. Despite the initial challenges with persisting user data, the implementation of local storage has ensured a seamless and consistent user experience across sessions.

## ProfilePic Component

### Initial Implementation

The ProfilePic component was initially designed to display a user's profile picture and name. The component fetched the user's profile data from local storage and displayed it. While the basic functionality was straightforward, ensuring that the profile picture was centered and the component remained responsive across different screen sizes proved to be challenging.

### Centering the Profile Picture

One of the primary challenges was centering the profile picture within the component. Despite using various CSS properties and techniques, achieving perfect centering was unnecessarily difficult. The profile picture often appeared off-center, especially when the component was resized. This issue was eventually resolved by using a combination of Flexbox properties and specific width adjustments for different screen sizes. Although this solution isn't perfect, it works as a temporary solution for now.

```
<div className="flex flex-col items-center text-white font-Orbitron tracking-wider text-xl mb-3">
  <img
    src={pic}
    alt="profile-picture"
    className="w-32 h-32 rounded-full my-3"
  />
  <h2>{name}</h2>
</div>
```

### Responsiveness Challenges

Constructing the ProfilePic component while keeping it responsive was another significant challenge. The component needed to look good on various devices, from small mobile screens to large desktop monitors. Ensuring that the layout adapted gracefully to different screen sizes required careful planning and testing.

To achieve responsiveness, media queries and responsive utility classes from Tailwind CSS were used. These classes allowed the component to adjust its layout and styling based on the screen size.

```
<div className="flex bg-gradient-to-b mx-4 my-page:mr-0 from-darkerBlue to-darkBlue my-page:max-w-md justify-between rounded-sm mt-10">
  <div className="w-16 mini:w-32 sm:w-60 my-page:w-28 lg:w-28"></div>
  <div className="flex flex-col items-center text-white font-Orbitron tracking-wider text-xl mb-3">
    <img
      src={pic}
      alt="profile-picture"
      className="w-32 h-32 rounded-full my-3"
    />
    <h2>{name}</h2>
  </div>
  <div className="w-0 mini:w-20"></div>
  <img
    src={edit}
    alt="Edit profile"
    className="w-8 h-8 my-5 mr-3 cursor-pointer"
    onClick={() => setIsWindowOpen(true)}
  />
</div>
```

### Conclusion

The ProfilePic component has evolved significantly from its initial implementation. Centering the profile picture and ensuring the component's responsiveness were challenging tasks that required careful consideration and testing. By leveraging Flexbox and responsive utility classes, these challenges were overcome, resulting in a component that looks great on all devices.
