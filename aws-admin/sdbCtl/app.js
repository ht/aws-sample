

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'MdGmoreglogger',
        'MdDomainInfo',
        'MdSongs',
        'MdRegionInfo',
        'MdItemDetail'
    ],
    stores: [
        'SRegion',
        'SItemDetail'
    ],
    views: [
        'MyViewport',
        'CpItemDetail',
        'CpDomainItemPanel'
    ],
    autoCreateViewport: true,
    name: 'MyApp',
    controllers: [
        'CInstanceCtl'
    ]
});
