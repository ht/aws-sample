

Ext.define('MyApp.store.SGmoregloggerInfo', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.MdGmoreglogger'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MyJsonPStore',
            model: 'MyApp.model.MdStdreglogger',
            proxy: {
                type: 'ajax',
                extraParams: {
                    domain: 'sample01'
                },
                url: '../modules/sdbGetDomainItemsSample.php',
                reader: {
                    type: 'json',
                    root: 'items.rows'
                }
            }
        }, cfg)]);
    }
});