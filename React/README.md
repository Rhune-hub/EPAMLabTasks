# EPAMLabTasks --- React
Repository for EPAM Laboratory Tasks
# EPAMLabTask React-1

You need to implement simple page with information about user.
The user has next data and should be stored as constant variable and passed as props into application:
```javascript
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
```
You are free to implement different design (discuss it with mentors), but UX should be the following:
![App design](./design.jpg)

You need to create a separate repository. You can use npm or yarn as package manager. You can use boilerplate (like react-create-app) or write your own webpack config to build an app. You can use any way to style your app (CSS, SCSS, styled component, whatever you want). You can use Typescript if you want. Anyway, your package.json must include minimum 2 running scripts: start for running in dev mode and build for building your app (included in react-create-app from the box). You can discuss all ideas about folder structure and any additional requirements with your mentors

# EPAMLabTask React-2

You have to create request for albums data from https://jsonplaceholder.typicode.com/ and paste this information into you application inside <Content/> component from previous task.

No any strict rules for UI or UX, but you need paste this data like list items
Don’t use react hooks for this task (only classes available if you need side effects)