

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'MdInstanceInfo'
    ],
    views: [
        'MyViewport',
        'MyPanel'
    ],
    autoCreateViewport: true,
    name: 'MyApp',
    controllers: [
        'CInstanceCtl'
    ]
});
