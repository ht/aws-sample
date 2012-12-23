

Ext.define('MyApp.model.MdGmoreglogger', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'commodityid'
        },
        {
            name: 'prefix'
        },
        {
            name: 'logtype'
        },
        {
            name: 'appkeyid'
        },
        {
            name: 'message'
        },
        {
            name: 'data'
        },
        {
            name: 'logtime'
        },
        {
            name: 'timestamp'
        },
        {
            name: 'id'
        },
        {
            name: 's3path'
        },
        {
            name: 'confirmflg'
        }
    ]
});