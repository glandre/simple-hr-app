# Project Architecture

## Overview

The project will be divided into two main applications: The Back-end RESTful API and the Front-end Single Page Application.

## Back-end

### Overall Back-end Architecture

The back-end of this project is a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer).
Its architecture is based on the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html),
and influenced by the Laravel's [MVC architecture](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).
It also respects the directory structure imposed by the Laravel Framework: https://laravel.com/docs/8.x/structure

<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" alt="Clean Architecture" width="500"/>

- **app/Domain**: (Entities) domain objects. This namespace and folder represent the "Entities" layer of the Clean Architecture.
- **app/Features**: (Use Cases) actions/features that the app provides.
  This namespace and folder represent the "Use Cases" layer of the Clean Architecture.
- **app/Persistence**: (Frameworks and Drivers) This is the Data Layer of our application.
  Currently implemented over MySQL. If a Database change needs to happen, this is the place to replace.
  This namespace and folder belongs to the "Interface Adapters" layer in the Clean Architecture.
- **app/Http**: (Interface Adapters) The "Controller" of the Laravel's MVC: Middlewares and Controllers.
  A Controller can be associated directl with a Repository (Persistence layer) object,
  e.g., DepartmentController, when they simple retrieval and updates with no Domain-related logic,
  or it can be associated with Domain object or a Feature. This namespace and folder belongs to
  the "Interface Adapters" layer in the Clean Architecture.
- **app/Providers**: (Interface Adapters) External providers.
  This is the place where integration with thrid-party services should be implemented.
  This namespace and folder belongs to the "Interface Adapters" layer in the Clean Architecture.
- **app/Exceptions**: (Interface Adapters) Non-business related error handling (MVC Layer).
  This namespace and folder belongs to the "Interface Adapters" layer in the Clean Architecture.
- **app/Console**: (Interface Adapters) Commands to run in the command line.
  This namespace and folder belongs to the "Interface Adapters" layer in the Clean Architecture.
- **database/**: (Frameworks and Drivers) Migrations and Seeders are placed in this folder.
  In addition to the **Persistence** layer, this is the only place allowed to use SQL directly.
- **routes/**: (Frameworks and Drivers) These folders are part of the Laravel Framework, and provide different features,
  configuration, that can be customized as needed.
- **bootstrap/, config/, database/, public/, routes/**: (Frameworks and Drivers) These folders are part of the Laravel Framework,
  and provide different features, configuration, that can be customized as needed.

### Data Layer: Persistence

The **Persistence** namespace and folder represents the Data Layer of the application.
This namespace provides a **Repository** abstract class that provides all interactions with the database, such as creation, update, retrieval and deletion.
All repository objects, such as DepartmentsRepository and EmployeesRepository should inherit from this class, and provide specific implementations for each database interactions.

Notice: the `database/` folder should not manipulate SQL directly. Instead, it should use the repository objects from this folder (the **Persistence** layer).

## Front-end

The fornt-end of this application is based on React and follows a component-based approach that is inspired by the Atomic Design.
Additionally, the following libraries are considered part of the core architecture for the front-end:

- Material UI: https://material-ui.com/
- Styled Components: https://styled-components.com/
- React Router: https://reactrouter.com/web/

### Atomic Design

<img src="https://bradfrost.com/wp-content/uploads/2013/06/atomic-design.png" alt="Atomic Design" width="500"/>

- **src/components/atoms**: The basic building blocks, such as Label and TextInput.

- **src/components/molecules**: Components that are combination of multiple atoms, such as the LogInForm.

- **src/components/organisms**: Complex components that are combination of multiple atoms and molecules. For instance, the NavigationBar is an organism.

- **src/components/templates**: Components that are a combination of multiple organisms, molecules and atoms to form the structure of pages. One template can be reused by one single page or multiple pages.

- **src/components/pages**: Pages are instances of templates.

#### Data Fetching

The `axios` library is used to make it simpler to control API calls, and the calls are organized inside the folder `contexts/api`

- **src/contexts/api**: All functions that fetches data from the back-end are placed in this folder, and they are implemented
  as Providers and Hooks.

#### Components Documentation: Storybook
