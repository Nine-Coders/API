
# Study IO API

A RESTful API for Study IO, a learning application.

## Installation

Install the Study IO API dependencies with npm

```bash
  cd api
  npm install
```

To start

```bash
  npm start
```

Study IO requires Postgres. To locally load mock data:

```bash
  Change the filepaths in schema.sql to where your locally stored .csv files are
  In your terminal, run psql -h localhost -f schema.sql
```

Due to security concerns, the Postgres connection string is stored in a config.js file that is not provided. Please make a config.js file using the config.example.js file provided.

## Documentation

[Quick Start Guide For PostgreSQL](https://chartio.com/resources/tutorials/how-to-start-postgresql-server-on-mac-os-x/)  
[Mock Data](https://docs.google.com/spreadsheets/d/1pP8pmFDK-arZ6Yv5m1dNQe5gDxmmd9VweVFYvMPET-I/edit?usp=sharing)

## API Reference

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

#### Get all rooms for a particular topic

```http
  GET /:topic_id/rooms
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
    }
]
```

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
      "username": "user1",
      "avatar": "https://via.placeholder.com/50x50",
      "created_at": "2021-01-13T12:05:06.000Z"
    },
    {
      "id": 3,
      "username": "user3",
      "avatar": "https://via.placeholder.com/50x50",
      "created_at": "2021-01-13T12:05:06.000Z"
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


#### Create a user
```http
  POST /users/create
```

Request body:
| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `username`| `string` | **Required**. username of user            |
| `avatar`  | `string` | **Required**. url of user's profile photo |


#### Create a room in a particlar topic

```http
  POST /rooms/:topic_id/create
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

#### Create a goal for a particular room

```http
  POST /rooms/:room_id/goal
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
| `creator_id`      | `integer` | **Required**. Id of user who created |
| `room_id`      | `integer` | **Required**. Id of room the goal b |

#### Toggle a room as archived

```http
  PUT /toggle-archive
```

Request body:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `room_id` | `integer` | **Required**. Id of the room to archive/reactivate |
