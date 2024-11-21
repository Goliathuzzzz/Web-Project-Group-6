# Self-Assessment

## **1. Login Component**

### **Initial Implementation**

Initially, the Login component was designed to handle traditional email and password authentication. Users would enter their credentials, and the component would validate them against the server. While this approach worked, it required users to remember yet another set of login details, which could be cumbersome.

### **Adding Google Login**

To enhance the user experience, we integrated Google login into the Login component. This allowed users to authenticate using their Google accounts, streamlining the login process and reducing the need to remember additional credentials. The integration was achieved using the @react-oauth/google library, which provided a seamless way to handle Google OAuth authentication.

### **Implementation Details**

The Google login was implemented using the useGoogleLogin hook from the @react-oauth/google library. Upon successful authentication, the user's profile information was fetched from the Google API and stored in the application's state and local storage. This allowed the application to recognize the user across sessions.

```jsx
const gLogin = useGoogleLogin({
  onSuccess: (codeResponse) => setUser(codeResponse),
  onError: (error) => console.log("Login Failed:", error),
});
```

### **Challenges with Persisting User Data**

One of the significant challenges we faced was persisting user data across page refreshes. Initially, the profile information would be lost upon refreshing the page, causing the user to be logged out. To address this, we implemented local storage to save the user's profile data.

Another challenge was the lack of knowledge of using useEffect at the time. UseEffect was introduced during the next lecture, which would've made implementation significantly easier.

```jsx
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

### **Conclusion**

The addition of Google login to the Login component has greatly improved the user experience by providing a quick and easy authentication method. Despite the initial challenges with persisting user data, the implementation of local storage has ensured a seamless and consistent user experience across sessions.

---

## **2. ProfilePic Component**

### **Initial Implementation**

The ProfilePic component was initially designed to display a user's profile picture and name. The component fetched the user's profile data from local storage and displayed it. While the basic functionality was straightforward, ensuring that the profile picture was centered and the component remained responsive across different screen sizes proved to be challenging.

### **Centering the Profile Picture**

One of the primary challenges was centering the profile picture within the component. Despite using various CSS properties and techniques, achieving perfect centering was unnecessarily difficult. The profile picture often appeared off-center, especially when the component was resized. This issue was eventually resolved by using a combination of Flexbox properties and specific width adjustments for different screen sizes. Although this solution isn't perfect, it works as a temporary solution for now.

```jsx
<div className="flex flex-col items-center text-white font-Orbitron tracking-wider text-xl mb-3">
  <img
    src={pic}
    alt="profile-picture"
    className="w-32 h-32 rounded-full my-3"
  />
  <h2>{name}</h2>
</div>
```

### **Responsiveness Challenges**

Constructing the ProfilePic component while keeping it responsive was another significant challenge. The component needed to look good on various devices, from small mobile screens to large desktop monitors. Ensuring that the layout adapted gracefully to different screen sizes required careful planning and testing.

To achieve responsiveness, media queries and responsive utility classes from Tailwind CSS were used. These classes allowed the component to adjust its layout and styling based on the screen size.

```jsx
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

### **Conclusion**

The ProfilePic component has evolved significantly from its initial implementation. Centering the profile picture and ensuring the component's responsiveness were challenging tasks that required careful consideration and testing. By leveraging Flexbox and responsive utility classes, these challenges were overcome, resulting in a component that looks great on all devices.

---

## **3. Footer Component**

### **Enhancing Modularity**

The initial implementation of the footer contained hardcoded sections for "About Links," "Contact Links," "Legal Links," and "Social Links." While it worked it didn't have much modularity making it difficult to maintain and update. All of these sections in one file made the component cluttered and multiple lines long.

### **Original Structure**

```jsx
<div>
  <h4>About Us</h4>
  <ul>
    <li>Link 1</li>
    <li>Link 2</li>
  </ul>
</div>
<div>
  <h4>Contact</h4>
  <ul>
    <li>Link A</li>
    <li>Link B</li>
  </ul>
</div>
<div>
  <h4>Legal</h4>
  <ul>
    <li>Link X</li>
    <li>Link Y</li>
  </ul>
</div>
```

### **Refactor**

Each section About, Contact, and Legal was extracted into its own reusable component `AboutLinks`, `ContactsLinks`, `LegalLinks`. This improved the readability, reusability, and maintainability of the code:

```javascript
import AboutLinks from "./AboutLinks";
import ContactsLinks from "./ContactsLinks";
import LegalLinks from "./LegalLinks";

<AboutLinks itemClass="text-sm hover:text-gray-300 transition duration-300" />;
<ContactsLinks itemClass="text-sm hover:text-gray-300 transition duration-300" />;
<LegalLinks itemClass="text-sm hover:text-gray-300 transition duration-300" />;
```

### **Key Improvements**

1. **Reusability:** Reusable components allow consistent styling and behavior across different parts of the footer.
2. **Easier Maintenance:** Modifications in individual sections like adding a new link can now be isolated to the relevant file.
3. **Code Readability:** The refactored code is more organized making it easier to understand and manage in the future.

---

### **Layout Issues on Smaller Screens**

During testing it was noted that the footer layout broke on smaller screens. The horizontal arrangement of links caused overlapping and misaligned elements making the content unreadable. The issue originated from the design being made for larger screen sizes. Fortunately Tailwind CSS is mobile first which made making the needed changes a breeze.

### **Original Issue**

1. The "About Us," "Contact," and "Legal" sections were arranged side-by-side which didn’t fit smaller screens.
2. Text and icons overlapped or went off-screen creating a poor user experience.

### **Implementing a Dropdown Menu**

To address these issues a responsive dropdown menu was implemented for smaller screens. This way it was made sure that the content was accessible and readable no matter the device and its screen size. UseState hook was used to implement conditional rendering for the dropdown menu. This way a lot of screen space was saved and elements won't overlap each other:

```javascript
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

<div className="md:hidden mt-4">
  <button
    className="text-white text-sm font-Orbitron hover:underline"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    Menu
  </button>
  {isDropdownOpen && (
    <div className="bg-customBlue text-white mt-2 rounded shadow-lg p-4 space-y-4">
      <div>
        <h4 className="text-base mb-2 font-Orbitron">About Us</h4>
        <AboutLinks itemClass="text-sm hover:text-gray-300 transition duration-300" />
      </div>
      <div>
        <h4 className="text-base mb-2 font-Orbitron">Contact</h4>
        <ContactsLinks itemClass="text-sm hover:text-gray-300 transition duration-300" />
      </div>
      <div>
        <h4 className="text-base mb-2 font-Orbitron">Legal</h4>
        <LegalLinks itemClass="text-sm hover:text-gray-300 transition duration-300" />
      </div>
    </div>
  )}
</div>;
```

### **Key Improvements**

1. **Responsive Design:** The dropdown ensures content is organized and accessible on smaller screens.
2. **Improved Readability:** By stacking links vertically in the dropdown the content no longer overlaps or misaligns.
3. **User-Friendly:** The dropdown design allows users to easily access all sections even on mobile devices.

---

## **Lessons Learned**

1. **Modularity:** Refactoring into smaller self-contained components makes the code more scalable and reduces code duplication.
2. **Responsive Design:** Designing for smaller screens requires careful consideration of layout, spacing, and order to ensure usability.
3. **Testing On Different Screen Sizes:** Identifying layout issues when testing on different screen sizes reinforced the importance of responsive design.

### Conclusion

In the end the modular and responsive approach improved both the code and the user experience on different devices. Now the code is cleaner and easier to manage due to allocating parts in separate files. There will still be more isolation done in the future to have less lines of code in each component. `Footer.jsx` and `NavBar.jsx` still contain multiple complete elements and long line of code, these elements will still under work for more modular approach. Extracting elements from these components will enchance the code maintainability and improve readability, although code is thoroughly commented the components are too vast.

---

## **4. HeroMain Component**

### **Background**

The `HeroMain` component was designed to provide images in an engaging way to showcase features of the application with dynamic backgrounds and titles. The initial implementation lacked interactivity and adaptability which made it less appealing. To fix this a carousel mechanism with dynamic backgrounds and responsive design was implemented.

---

### **Features Implemented**

### **1. Dynamic Backgrounds and Titles**
The `HeroMain` component dynamically updates its background image and associated titles based on which directional button the user presses. 

**Key Implementation:**
```javascript
const bgClasses = [
  "bg-herocar",
  "bg-herofind",
  "bg-herocharge",
  "bg-herogreen",
];

const titles = [
  { main: "Find.", secondary: "Charge. Go Green." },
  { main: "Discover.", secondary: "New Adventures." },
  { main: "Charge.", secondary: "Anywhere, Anytime." },
  { main: "Go Green.", secondary: "For a Better Future." },
];

<div
  className={`flex flex-col ${bgClasses[currentIndex]} bg-cover h-80 md:w-[60%]`}
  style={{ backgroundPosition: bgPositionByClass[bgClasses[currentIndex]] }}
>
  <h2 className="text-4xl md:ml-24 font-medium font-Orbitron tracking-wider w-full">
    <span className="text-white">{titles[currentIndex].main}</span>{" "}
    <span className="text-eGreen">{titles[currentIndex].secondary}</span>
  </h2>
</div>
```

**Impact:**
- **Engagement:** The dynamic titles and background create a more interactable and engaging hero element.
- **Customizability:** It is easy to add more slides by updating the two arrays.

---

### **2. Interactive Carousel Controls**
Navigation between slides is done by using left and right arrow buttons.

**Key Implementation:**
```javascript
const handleLeftClick = () => {
  setCurrentIndex((prevIndex) => (prevIndex - 1 + bgClasses.length) % bgClasses.length);
};

const handleRightClick = () => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % bgClasses.length);
};

<button onClick={handleLeftClick} className="ml-10 hover:bg-eGreen transition duration-300 p-2 rounded-full">
  <img src={ArrowLeft} alt="Left Arrow" className="h-10 w-10" />
</button>
<button onClick={handleRightClick} className="mr-10 hover:bg-eGreen transition duration-300 p-2 rounded-full">
  <img src={ArrowRight} alt="Right Arrow" className="h-10 w-10" />
</button>
```

**Impact:**
- **User Control:** Allows users to navigate through slides easily.
- **Transitions:** Provides a smooth experience with buttons that respond to user action.

---

## **Lessons Learned**
1. **Dynamic State Management:** Managing the carousel's current index using `useState` made the process easy to realize in way that is scalable and the carousel elements are then easily customized and dynamic.
2. **Extensibility:** Designing the component with arrays for backgrounds and titles allows for easy updates and scalability in future iterations.

### Conclusion

The `HeroMain` component is now more appealing and interactable, it makes the suer more likely to engage in the message that our hero is trying to accomplish. Carousel is a great mechanic for displaying content dynamically and using useState hook is a great way of achieving this functionality. Similar elements could be used in other parts of the web application. It is also easy to extend the arrays and customize the content.

---

## **5. Map Component**

## **Summary**

The map component was developed using React and the MapTiler SDK to display EV charging stations with custom markers and an info box for station details. This was an introduction to working with mapping libraries and creating custom UI elements for them, which presented several challenges but also served as a valuable learning experience.

---

## **Challenges Encountered**

1. **Custom Popups**: MapLibre's default popup functionality was initially used to display information about charging stations. However, due to limited customizability, a separate `InfoBox` component was created as a custom popup. This provided greater control over the design but required extra effort to integrate properly. The connection between the markers and the info box is shown below:

    ```javascript
    const handleMarkerClick = (e, station) => {
      e.stopPropagation();
      setActiveStation(station);
    };

    {activeStation && <InfoBox station={activeStation} />}
    ```

2. **Switching Map Libraries**: The component was initially built using Leaflet and TileServer GL. However, this approach proved to be overly complex and not as customizable as needed, leading to the use of MapTiler SDK, which provided a more straightforward solution. The map was initialized with the following code:

    ```javascript
    const initializeMap = (mapContainerElement) => {
      return new maptilersdk.Map({
        container: mapContainerElement,
        style: `https://api.maptiler.com/maps/e44b03e8-e159-489f-9e95-78adfed9c239/style.json?key=${maptilersdk.config.apiKey}`,
        center: [INITIAL_POSITION.lng, INITIAL_POSITION.lat],
        zoom: INITIAL_ZOOM,
        pitch: 0,
        bearing: 0,
        geolocateControl: false,
        navigationControl: false,
        attributionControl: false, 
      });
    };
    ```

3. **Updating Marker Icons**: Efforts were made to dynamically update marker icons to reflect the clicked state. However, attempts to re-render markers using `useEffect` caused the map to crash. Although the root cause remains unclear, the issue is suspected to relate to the GPU heaviness of the map.

---

## **Key Learnings**

This project provided opportunities to learn several new concepts and techniques:

1. **Using `useEffect`**: `useEffect` was used extensively to manage side effects, such as initializing the map and adding event listeners. Through this project, a better understanding of `useEffect` and the importance of cleanup in preventing memory leaks was gained. For example:

    ```javascript
    useEffect(() => {
      if (map.current) return;

      map.current = initializeMap(mapContainer.current);

      const newMarkers = addMarkers(map.current);
      setMarkers(newMarkers);

      const handleMapClick = () => setActiveStation(null);
      map.current.on("click", handleMapClick);

      return () => {
        newMarkers.forEach((marker) => {
          marker.getElement().removeEventListener("click", handleMarkerClick);
          marker.remove();
        });
        map.current.off("click", handleMapClick);
        map.current.remove();
        map.current = null;
      };
    }, []);
    ```

2. **Custom UI Components**: The creation of the `InfoBox` component highlighted the benefits of building custom solutions when library-provided features do not meet specific requirements.

---

## Current Issues and Future Improvements

1. **Marker Updates**: The issue of dynamically updating marker icons without crashing the map remains unresolved. Further investigation is planned to optimize how markers are rendered and updated.

2. **Additional Features**: Future enhancements include adding marker clustering, implementing station filtering, and integrating geolocation features to improve the overall user experience.

---

## Conclusion

The development of the map component provided valuable experience with React and mapping libraries. While some challenges were encountered and a few issues remain, significant progress was made, particularly in understanding `useEffect` and creating custom UI components. The work so far has laid a solid foundation for improving the map further.