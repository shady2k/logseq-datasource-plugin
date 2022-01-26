## Datasource plugin
This plugin provides access for external software to execute queries in your Logseq database via socket.io.

## Disclaimer
**Use at own risk! Be sure what you know what you do!**
**All queries from any servers will be executed. This may damage your Logseq database. Data leak possibility!**
**Don't expose this service to external servers outside your LAN!**

## Configuration
- Set your server name in `serverName` property.
```json
{
    "serverName": "http://localhost:3000"
}
```

### Contribute
- `yarn && yarn build` in terminal to install dependencies.
- `Load unpacked plugin` in Logseq Desktop client.

### License
MIT
