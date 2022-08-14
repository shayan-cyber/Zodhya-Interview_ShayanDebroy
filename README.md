
## Flow chart

![App Screenshot](https://i.imgur.com/8OCzdVZ.png)


## API Reference

#### Get weather forecast/status

```http
  POST http://127.0.0.1:8000/api/check-weather
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `dict` | **Required**. lat,long data |

#### Get all past checks

```http
  GET http://127.0.0.1:8000/api/past-updates
```




