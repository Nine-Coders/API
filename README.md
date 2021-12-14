
# Study IO API

A RESTful API for Study IO, a learning application.

## Installation

Install the Study IO API dependencies with npm

```bash
  cd api
  npm install
```
Due to security concerns, the Postgres connection string is stored in a config.js file that is not provided. Please make a config.js file using the config.example.js file provided.

To start

```bash
  npm start
```

Study IO requires Postgres. To locally load mock data:

```bash
  Change the filepaths in schema.sql to where your locally stored .csv files are
  In your terminal, run psql -h localhost -f schema.sql
```

## Documentation

[Quick Start Guide For PostgreSQL](https://chartio.com/resources/tutorials/how-to-start-postgresql-server-on-mac-os-x/)<br />
[Mock Data](https://docs.google.com/spreadsheets/d/1pP8pmFDK-arZ6Yv5m1dNQe5gDxmmd9VweVFYvMPET-I/edit?usp=sharing)

## API Reference

### TOPICS
#### Get all topics

```http
  GET /topics
```

Response:

```bash
[
    {
        "id": 1,
        "name": "math",
        "url": "https://via.placeholder.com/200x200"
    },
    {
        "id": 2,
        "name": "science",
        "url": "https://via.placeholder.com/200x200"
    },
    ...
]
```

### ROOMS
#### Get all rooms

```http
  GET /rooms
```

Response:

```bash
[
    {
        "id": 1,
        "name": "the danger zone",
        "topic_id": 1,
        "created_at": "2021-01-13T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": false,
        "is_archived": true,
        "admin_id": 1
    },
    ...
]
```

#### Get all rooms for a particular topic

```http
  GET /topic/:topic_id/rooms
```

Query parameters:
| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `topic_id`| `integer` | **Required**. Id of topic to get rooms for |

Response:

```bash
[
    {
        "id": 1,
        "name": "the danger zone",
        "topic_id": 1,
        "created_at": "2021-01-13T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": false,
        "is_archived": true,
        "admin_id": 1
    },
    ...
]
```

#### Search for rooms

```http
  POST /rooms/search
```

Request body:
| Parameter | Type      | Description                                |
| :-------- | :-------- | :----------------------------------------- |
| `search_value`| `string` | **Required**. Text to search for rooms (case sensitive)|

Response:

```bash
[
    {
        "id": 10,
        "name": "the room",
        "topic_id": 7,
        "created_at": "2021-01-22T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": true,
        "is_archived": false,
        "admin_id": 10
    },
    {
        "id": 11,
        "name": "room1",
        "topic_id": 1,
        "created_at": "2021-01-23T12:05:06.000Z",
        "thumbnail": "https://via.placeholder.com/200x200",
        "max_users": 20,
        "is_private": false,
        "is_archived": false,
        "admin_id": 1
    },
    ...
]
```

#### Create a room in a particular topic

```http
  POST /:topic_id/rooms/create
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of room |
| `thumbnail`      | `string` | **Required**. URL of thumbnail image |
| `max_users`      | `integer` | **Required**. Max number of users wanted |
| `is_private`      | `boolean` | **Required**. Mark room as private |
| `admin_id`      | `integer` | **Required**. Id of user making the room |

#### Add a user to a particular room

```http
  POST /addUserToRoom
```

Request body:
| Parameter | Type      | Description                       |
| :-------- | :-------- | :-------------------------------- |
| `user_id` | `integer` | **Required**. Id of user to add |
| `room_id` | `integer` | **Required**. Id of room to add user into |

#### Toggle a room as archived

```http
  PUT /toggle-archive
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to archive/reactivate |

### MESSAGES
#### Get all messages for a particular room

```http
  GET /rooms/:room_id/messages
```

Query parameters:
| Parameter | Type      | Description                                  |
| :-------- | :-------- | :------------------------------------------- |
| `room_id` | `integer` | **Required**. Id of room to get messages for |

Response:

```bash
[
    {
        "id": 1,
        "room_id": 1,
        "user_id": 1,
        "body": "testing",
        "created_at": "2021-02-13T12:05:06.000Z"
    },
    {
        "id": 3,
        "room_id": 1,
        "user_id": 3,
        "body": "hello world",
        "created_at": "2021-02-15T12:05:06.000Z"
    },
    ...
]
```

#### Post a message to a particular room

```http
  POST /rooms/:room_id/messages
```

Query parameters:
| Parameter | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `room_id` | `integer` | **Required**. Id of room |

Request body:
| Parameter | Type      | Description                      |
| :-------- | :-------- | :------------------------------- |
| `user_id` | `integer` | **Required**. Id of user posting |
| `body`    | `string`  | **Required**. Content of message |

### USERS
#### Get all users for a particular room

```http
  GET /rooms/:room_id/users
```

Query parameters:
| Parameter | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `room_id` | `integer` | **Required**. Id of room to get users for |

Response:

```bash
[
    {
      "id": 1,
      "first_name": "user1",
      "last_name": "last name",
      "email": "email1@email.email",
      "avatar": "https://via.placeholder.com/50x50",
      "created_at": "2021-01-13T12:05:06.000Z"
    },
    {
      "id": 3,
      "first_name": "user3",
      "last_name": "last name",
      "email": "email3@email.email",
      "avatar": "https://via.placeholder.com/50x50",
      "created_at": "2021-01-13T12:05:06.000Z"
    },
    ...
]
```

#### Create a user
```http
  POST /users/create
```

Request body:
| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `first_name`| `string` | **Required**. first name of user            |
| `last_name`| `string` | **Required**. last name of user            |
| `email`| `string` | **Required**. email of user            |
| `avatar`  | `string` | url of user's profile photo |
| `password`  | `string` | user's password |
| `googleId`  | `string` | user's googleId |

Note: needs a password OR googleId to create a user

### GOALS
#### Get all goals for a given room

```http
  GET /rooms/:room_id/goals
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to retrive goals from |

```bash
[
    {
        "id": 1,
        "name": "goal1",
        "description": "description1",
        "created_at": "2021-04-13T11:05:06.000Z",
        "goal_date": "2021-04-15T11:05:06.000Z",
        "user_id": 1,
        "room_id": 1,
        "user_ids": [
            1
        ]
    },
    {
        "id": 2,
        "name": "goal2",
        "description": "description2",
        "created_at": "2021-04-14T11:05:06.000Z",
        "goal_date": "2021-04-16T11:05:06.000Z",
        "user_id": 1,
        "room_id": 1,
        "user_ids": [
            1
        ]
    },
    ...
]
```

#### Get all users for a particular goal

```http
  GET /goals/:goal_id
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `goal_id` | `integer` | **Required**. Id of the goal to retrieve users from |

```bash
[
    {
        "id": 1,
        "user_id": 1,
        "goal_id": 1,
        "created_at": "2021-12-11T18:53:40.272Z"
    },
    {
        "id": 199,
        "user_id": 199,
        "goal_id": 1,
        "created_at": "2021-12-11T18:53:40.272Z"
    },
    ...
]
```

#### Create a goal for a particular room

```http
  POST /rooms/:room_id/goals
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id`      | `integer` | **Required**. Id of room the goal belongs to |

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the goal |
| `description`      | `string` | **Required**. Description of the goal |
| `goal_date`      | `datetime` | Date of the goal |
| `user_id`      | `integer` | **Required**. Id of user who created the goal |

#### Add a user to a given goal

```http
  POST /goals/add-user
```
Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id` | `integer` | **Required**. Id of the user to add to a goal |
| `goal_id` | `integer` | **Required**. Id of goal receiving a user |

### EVENTS
#### Get all events for a given room

```http
  GET /rooms/:room_id/events
```
Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to retrieve events from |

```bash
[
    {
        "id": 1,
        "name": "study session",
        "description": "we're gonna study",
        "user_id": 1,
        "room_id": 1,
        "created_at": "2021-03-13T12:05:06.000Z",
        "event_date": "2021-03-14T11:05:06.000Z"
    },
    {
        "id": 2,
        "name": "study session",
        "description": "we're gonna study",
        "user_id": 1,
        "room_id": 1,
        "created_at": "2021-03-14T11:05:06.000Z",
        "event_date": "2021-03-15T11:05:06.000Z"
    },
    ...
]
```

#### Create an event for a particular room

```http
  POST /rooms/create_event
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the event |
| `description`      | `string` | **Required**. Description of the event |
| `user_id`      | `integer` | **Required**. Id of user who created the event |
| `room_id`      | `integer` | **Required**. Id of the room where the event was created |
| `event_date`      | `datetime` | **Required**. Date and time of the event |

### FILES
#### Get all files for a given room

```http
  GET /rooms/:room_id/files
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to retrieve file URLs from |

```bash
[
    {
        "id": 1,
        "url": "https://via.placeholder.com/50x50",
        "name": "placeholder10",
        "room_id": 1,
        "user_id": 1,
        "created_at": "2021-12-11T00:14:49.264Z"
    },
    {
        "id": 5,
        "url": "https://via.placeholder.com/50x50",
        "name": "placeholder5",
        "room_id": 1,
        "user_id": 2,
        "created_at": "2021-12-11T00:14:49.264Z"
    },
    ...
]
```

#### Add a file to a given room

```http
  POST /rooms/:room_id/files
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to add file into |

Request Body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `url` | `string` | **Required**. Url of the file from file hosting storage |
| `name` | `string` | **Required**. Name of the file |
| `user_id` | `string` | **Required**. Id of the user who is posting the file |

#### Remove a file from a given room

```http
  POST /files/:file_id/delete
```

Query parameters:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file_id` | `integer` | **Required**. Id of the file to delete |

### Authentication
#### Verify if user exists and user-provided authentication is correct

```http
  POST /users/auth
```

Request Body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Email of the user |
| `password` | `string` | Password for the user  |
| `google_id` | `string` | Google ID provided by google authentication |

Note:
Password OR Google ID can be provided

Response:
On successful authenthication:
```bash
{
    "id": 307,
    "first_name": "bobby",
    "last_name": "hill",
    "email": "anotherEmail@email.com",
    "avatar": "https://via.placeholder.com/50x50",
    "created_at": "2021-12-13T20:04:55.146Z"
}
```
On unsuccessful authentication:
```bash
false
```